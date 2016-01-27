import Ember from 'ember';
import Appointments from 'mdr/models/appointments';

const {
  Route,
  RSVP,
  inject
} = Ember;

const {
  Promise
} = RSVP;

const {
  service
} = inject;

export default Route.extend({
  appointments: service(),

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('appointments').getAppointments().then((appointments) => {
        resolve(Appointments.create({
          appointments
        }));
      });
    });
  }
});
