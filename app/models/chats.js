import Ember from 'ember';

const {
  Object: EmberObject,
  computed
} = Ember;

const {
  equal,
  alias
} = computed;

export default EmberObject.extend({
  appointments: null,
  single_appointment: equal('appointments.length', 1),
  first_appointment: alias('appointments.firstObject')
});
