import Ember from 'ember';
import AppointmentFlags from 'mdr/mixins/appointment-flags';
import Constants from 'mdr/utility/constants';

const { computed } = Ember;
const { equal } = computed;

export default Ember.Object.extend(AppointmentFlags, {
  current_year: moment().year(),
  graduation_years: computed('current_year', function() {
    const current_year = this.get('current_year');
    return _.range(1921, current_year + 1).reverse();
  }),
  active: null,
  customer_rating: null,
  dob: null,
  age: computed('dob', function() {
    return moment(this.get('dob'), 'YYYY-MM-DD').month(0).from(moment().month(0)).split(' ')[0];
  }),
  doctor_id: null,
  email_id: null,
  first_name: null,
  gender: 'MALE',
  graduation_institution: null,
  graduation_year: null,
  medicaid_number: null,
  medicare_number: null,
  last_name: null,
  npi: null,
  photo: null,
  practice_type: null,
  practice_years: null,
  primary_speciality: null,
  primary_speciality_obj: computed('primary_speciality', function() {
    const primary_speciality = this.get('primary_speciality');
    return Constants.DOCTOR_SPECAILITIES.findBy('id', primary_speciality);
  }),
  service_charge: null,
  surgeon: 0,
  speciality: null,
  isActive: equal('active', Constants.STATUS.ACTIVE),
  male: equal('gender', Constants.GENDER.MALE),
  female: equal('gender', Constants.GENDER.FEMALE),
  states: Constants.STATES,
  timezones: Constants.TIME_ZONES,
  professions: Constants.DOCTOR_PROFESSIONS,
  specialities: Constants.DOCTOR_SPECAILITIES,
  practice_types: Constants.DOCTOR_PRACTICE_TYPES,

  password: null,
  verify_password: null,
  phone1: null,
  phone2: null,
  address1: null,
  selected_state_1: null,
  cities1: null,
  cities2: null,
  selected_city_1: null,
  zip1: null,
  country1: 'United States',
  selected_profession: null,
  selected_speciality: null,
  selected_practice_type: null
});
