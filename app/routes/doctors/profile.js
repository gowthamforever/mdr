import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model(param) {
    if (param && param.doctor_id) {
      return Ember.Object.create({
        doctor_id: param.doctor_id
      });
    }

    this.transitionTo('doctors.list');
  }
});
