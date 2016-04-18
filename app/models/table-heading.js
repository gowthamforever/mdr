import Ember from 'ember';

const {
  Object: EmberObject
} = Ember;

export default EmberObject.extend({
  name: undefined,
  property: undefined,
  ascending: true,
  sortable: true
});
