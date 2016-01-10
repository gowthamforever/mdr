import Ember from 'ember';
import Doctor from 'mdr/models/doctor';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'span',
  model: null,
  doctor: computed('model', function() {
    let model = this.get('model');
    if (!model) {
      model = Doctor.create({
        doctor_id: 'all'
      })
    }

    return model;
  })
});
