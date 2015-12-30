import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model(param) {
    const model   = this.modelFor('doctors');
    const doctors = model.get('doctors');
    let doctor;

    if (param && param.doctor_id) {
      doctor = doctors.findBy('doctor_id', param.doctor_id);

      if (doctor) {
        return doctor;
      }
    }

    this.transitionTo('doctors.list');
  }
});
