import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const { computed } = Ember;
const { equal } = computed;

export default Ember.Object.extend({
  active: null,
  customer_rating: null,
  dob: null,
  age: computed('dob', function() {
    return moment(this.get('dob'), 'YYYY-MM-DD').month(0).from(moment().month(0)).split(' ')[0]
  }),
  doctor_id: null,
  email_id: null,
  first_name: null,
  gender: null,
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
  service_charge: null,
  surgeon: null,
  speciality: null,
  isActive: equal('active', Constants.STATUS.ACTIVE),
  male: equal('gender', Constants.GENDER.MALE),
  female: equal('gender', Constants.GENDER.FEMALE),
  states: Constants.STATES,
  timezones: Constants.TIME_ZONES,
  professions: Constants.DOCTOR_PROFESSIONS
});
