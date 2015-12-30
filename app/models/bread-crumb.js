import Ember from 'ember';

export default Ember.Object.extend({
  id: null,
  name: null,
  selected: false,
  disabled: true,
  current: false
});
