import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const {
  computed
} = Ember;

export default Ember.Object.extend({
  states: Constants.STATES,
  are_you: 'Agent',
  first_name: null,
  last_name: null,
  email_id: null,
  phone1: null
});
