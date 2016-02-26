import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model(param) {
    const model        = this.modelFor('appointments');
    const appointments = model.get('appointments');
    let appointment;

    if (param && param.id) {
      appointment = appointments.findBy('id', Number(param.id));

      if (appointment) {
        return appointment;
      }
    }

    this.transitionTo('appointments.requests.pending');
  }
});
