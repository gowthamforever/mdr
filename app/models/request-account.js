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
  phone1: null,
  address1: null,
  state1: null,
  selected_state_1: computed('state1', function() {
    const state1 = this.get('state1');
    return this.get('states').findBy('id', state1);
  }),
  city1: null,
  zip1: null,
  country1: 'United States',
  comments: null
});
