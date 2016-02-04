import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const { computed } = Ember;
const { equal } = computed;

export default Ember.Object.extend({
  active: null,
  agency_admin_id: null,
  dob: null,
  email_id: null,
  employee_number: null,
  first_name: null,
  gender: "MALE",
  graduation_year: null,
  last_name: null,
  photo: null,
  rater_id: null,
  isActive: equal('active', Constants.STATUS.ACTIVE),
  male: equal('gender', Constants.GENDER.MALE),
  female: equal('gender', Constants.GENDER.FEMALE),
  states: Constants.STATES,
  timezones: Constants.TIME_ZONES
});
