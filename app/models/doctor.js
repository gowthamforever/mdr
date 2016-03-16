import Ember from 'ember';
import AppointmentFlags from 'mdr/mixins/appointment-flags';
import Constants from 'mdr/utility/constants';

const { computed } = Ember;
const {
  equal,
  or
} = computed;

export default Ember.Object.extend(AppointmentFlags, {
  current_year: moment().year(),
  active: null,
  customer_rating: null,
  dob: null,
  dob_formatted: computed('dob', function() {
    const dob = this.get('dob');
    if (dob) {
      return moment(dob, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  age: computed('dob', function() {
    return moment(this.get('dob'), 'YYYY-MM-DD').month(0).from(moment().month(0)).split(' ')[0];
  }),
  doctor_id: null,
  email_id: null,
  first_name: null,
  gender: 'Male',
  graduation_institution: null,
  graduation_year: null,
  medicaid_number: null,
  medicare_number: null,
  last_name: null,
  npi: null,
  photo: null,
  practice_type: null,
  practice_type_obj: computed('practice_type', function() {
    const practice_type = this.get('practice_type');
    return Constants.DOCTOR_PRACTICE_TYPES.findBy('id', practice_type);
  }),
  practice_years: null,
  primary_speciality: null,
  primary_speciality_obj: computed('primary_speciality', function() {
    const primary_speciality = this.get('primary_speciality');
    return Constants.DOCTOR_SPECAILITIES.findBy('id', primary_speciality);
  }),
  languages: null,

  service_charge: null,
  surgeon: 0,
  speciality: null,
  requested: equal('active', Constants.STATUS.REQUESTED),
  rejected: equal('active', Constants.STATUS.REJECTED),
  inactive: equal('active', Constants.STATUS.INACTIVE),
  available: equal('active', Constants.STATUS.ACTIVE),
  isActive: equal('active', Constants.STATUS.ACTIVE),
  male: equal('gender', Constants.GENDER.Male),
  female: equal('gender', Constants.GENDER.Female),
  states: Constants.STATES,
  timezones: Constants.TIME_ZONES,
  professions: Constants.DOCTOR_PROFESSIONS,
  specialities: Constants.DOCTOR_SPECAILITIES,
  practice_types: Constants.DOCTOR_PRACTICE_TYPES,
  graduation_years: computed('current_year', function() {
    const current_year = this.get('current_year');
    return _.range(1921, current_year + 1).reverse();
  }),

  password: null,
  verify_password: null,
  phone1: null,
  phone2: null,
  address1: null,
  selected_state_1: computed('state1', function() {
    const state1 = this.get('state1');
    return Constants.STATES.findBy('id', state1);
  }),
  city1: null,
  zip1: null,
  country1: 'United States',
  selected_profession: null,
  selected_speciality: null,
  selected_practice_type: null,

  one_available_day: or('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'),

  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,

  sunday_start: null,
  monday_start: null,
  tuesday_start: null,
  wednesday_start: null,
  thursday_start: null,
  friday_start: null,
  saturday_start: null,

  sunday_end: null,
  monday_end: null,
  tuesday_end: null,
  wednesday_end: null,
  thursday_end: null,
  friday_end: null,
  saturday_end: null,

  one_treatment: or('treat_male', 'treat_female', 'treat_infants', 'treat_children', 'treat_adolescents', 'treat_adults', 'treat_senior', 'treat_pregnent'),
  treat_male: false,
  treat_female: false,
  treat_infants: false,
  treat_children: false,
  treat_adolescents: false,
  treat_adults: false,
  treat_senior: false,
  treat_pregnent: false,

  one_insurance: or('ins_1', 'ins_2', 'ins_3', 'ins_4', 'ins_5', 'ins_6', 'ins_7', 'ins_8', 'ins_9', 'ins_10', 'ins_11', 'ins_12', 'ins_13', 'ins_14', 'ins_15'),
  ins_1: false,
  ins_2: false,
  ins_3: false,
  ins_4: false,
  ins_5: false,
  ins_6: false,
  ins_7: false,
  ins_8: false,
  ins_9: false,
  ins_10: false,
  ins_11: false,
  ins_12: false,
  ins_13: false,
  ins_14: false,
  ins_15: false
});
