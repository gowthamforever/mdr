import Ember from 'ember';

const {
  Object: EmberObject,
  computed
} = Ember;

const {
  filterBy
} = computed;

export default EmberObject.extend({
  doctors: null,
  clients: null,
  assessors: null,
  appointments: null,
  active_doctors: filterBy('isActive', true),
  active_assessors: filterBy('isActive', true)
});
