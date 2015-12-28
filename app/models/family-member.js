import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const { computed } = Ember;
const { equal } = computed;

export default Ember.Object.extend({
  first_name: null,
  last_name: null,
  dob: null,
  gender: 'Male',
  relation: null
});
