import Ember from 'ember';
import AppointmentFlags from 'mdr/mixins/appointment-flags';
import Constants from 'mdr/utility/constants';

const { computed } = Ember;
const { equal } = computed;

export default Ember.Object.extend(AppointmentFlags, {
  active: null,
  agency_staff_id: null,
  dob: null,
  email_id: null,
  employee_number: null,
  first_name: null,
  gender: "Male",
  graduation_year: null,
  last_name: null,
  photo: null,
  rater_id: null,
  isActive: equal('active', Constants.STATUS.ACTIVE),
  male: equal('gender', Constants.GENDER.Male),
  female: equal('gender', Constants.GENDER.Female),
  states: Constants.STATES,
  timezones: Constants.TIME_ZONES,
  phone1: null,
  phone2: null,
  address1: null,
  selected_state_1: computed('state1', function() {
    const state1 = this.get('state1');
    return Constants.STATES.findBy('id', state1);
  }),
  city1: null,
  zip1: null,
  country1: 'United States'
});
