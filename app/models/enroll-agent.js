import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const {
  computed
} = Ember;

export default Ember.Object.extend({
  timezones: Constants.TIME_ZONES,
  states: Constants.STATES,

  first_name: null,
  last_name: null,
  dob: null,
  gender: 'Male',
  email_id: null,
  selected_timezone: null,
  phone1: null,
  phone2: null,
  address1: null,
  state1: null,
  selected_state_1: computed('state1', function() {
    const state1 = this.get('state1');
    return this.get('states').findBy('id', state1);
  }),
  city1: null,
  zip1: null,
  country1: 'United States',
  agency_id: null,
  emp_id: null,
  user_name: null,
  password: null
});
