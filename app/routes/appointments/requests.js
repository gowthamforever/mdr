import Ember from 'ember';
import Appointments from 'mdr/models/appointments';

const {
  Route,
  RSVP,
  inject,
  isEmpty
} = Ember;

const {
  Promise
} = RSVP;

const {
  service
} = inject;

export default Route.extend({
  dialog: service(),
  appointments: service(),

  activate() {
    this._super(...arguments);
    this.get('titlebar').setProperties({
      right_content: 'right-content-appointment',
      right_content_model: Ember.Object.create({ calendar: true })
    });
  },

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('appointments').getAppointments().then((appointments) => {
        resolve(Appointments.create({
          appointments
        }));
      });
    });
  },

  redirect(model) {
    if (!isEmpty(model.get('pending'))) {
      return this.transitionTo('appointments.requests.pending');
    }

    if (!isEmpty(model.get('accepted'))) {
      return this.transitionTo('appointments.requests.accepted');
    }

    if (!isEmpty(model.get('rejected'))) {
      return this.transitionTo('appointments.requests.rejected');
    }

    if (!isEmpty(model.get('started'))) {
      return this.transitionTo('appointments.requests.started');
    }

    if (!isEmpty(model.get('completed'))) {
      return this.transitionTo('appointments.requests.completed');
    }
  },

  deactivate() {
    this._super(...arguments);
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
