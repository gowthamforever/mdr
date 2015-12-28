import Ember from 'ember';
import Constants from 'mdr/utility/constants';

export default Ember.Object.extend({
  specialities: Constants.DOCTOR_SPECAILITIES,
  professions: Constants.DOCTOR_PROFESSIONS,
  timezones: Constants.TIME_ZONES,
  speciality: null,

  // Added for add doctor
  selected_profession: null,
  medicare_number: null,
  medicaid_number: null,
  last_name: null,
  first_name: null,
  selected_timezone: null,
  dob: null,
  npi: null,
  email_id: null,
  gender: 'Male',
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
  is_secondary_address: false,
  address2: null,
  selected_state_2: null,
  selected_city_2: null,
  zip2: null,
  country2: 'United States'
});
