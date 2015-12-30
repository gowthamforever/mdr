import Ember from 'ember';
import Appointment from 'mdr/models/appointment';

const {
  Route,
  isEmpty,
  get,
  set
} = Ember;


export default Route.extend({
  actions: {
    filter() {
      const model     = this.get('controller.model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const clients   = model.get('clients');

      if (!isEmpty(clients)) {
        set(model, 'clients', clients.filter((client) =>
          get(client, 'first_name').indexOf(firstName) !== -1 ||
          get(client, 'last_name').indexOf(lastName) !== -1));
      }
    },

    appointment(client) {
      this.transitionTo('clients.appointment', Appointment.create({
        customer_id: client.get('customer_id'),
        client
      }));
    }
  }
});
