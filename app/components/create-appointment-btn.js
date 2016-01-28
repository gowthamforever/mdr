import Ember from 'ember';
import CreateAppointment from 'mdr/models/create-appointment';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'span',
  model: null,
  appointment: computed('model', function() {
    let model = this.get('model');
    return CreateAppointment.create({
      customer_id: model ? model.get('customer_id') || 'all' : 'all'
    });
  })
});
