import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

const { service } = inject;

export default Route.extend({
  dialog: service(),

  activate() {
    this.get('titlebar').setProperties({
      right_content: 'view-requests-btn',
      right_content_model: Ember.Object.create({ calendar: true })
    });
  },

  deactivate() {
    this.get('titlebar').setProperties({
      right_content: undefined,
      right_content_model: undefined
    });
  },

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
