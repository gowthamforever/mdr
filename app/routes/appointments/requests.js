import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

const { service } = inject;

export default Route.extend({
  dialog: service(),

  actions: {
    doctor(appointment) {
      this.get('dialog').showDialog({
        name: 'modal-doctor',
        model: appointment.get('doctor')
      });
    },

    client(appointment) {
      this.get('dialog').showDialog({
        name: 'modal-client',
        model: appointment.get('customer')
      });
    }
  }
});
