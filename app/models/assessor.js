import Ember from 'ember';
import AppointmentFlags from 'mdr/mixins/appointment-flags';
import Constants from 'mdr/utility/constants';

const { computed } = Ember;
const { equal } = computed;

export default Ember.Object.extend(AppointmentFlags, {
  active: null,
  assessor_id: null,
  dob: null,
  email_id: null,
  employee_number: null,
  first_name: null,
  gender: null,
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
