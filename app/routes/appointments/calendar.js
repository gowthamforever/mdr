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

  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-appointment');
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

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
  },

  afterModel(model) {
    const events        = Ember.A();
    const appointments  = model.get('appointments');

    if (appointments) {
      appointments.forEach((appointment) => {
        events.pushObject({
          start: moment(appointment.get('ts_request'), 'MM-DD-YYYY HH:mm').toDate(),
          end: moment(appointment.get('ts_request_endtime'), 'MM-DD-YYYY HH:mm').toDate(),
          title: `<strong>Patient:</strong> ${appointment.get('customer.first_name')} ${appointment.get('customer.last_name')} <br> <strong>Reason:</strong> ${appointment.get('reason')}`,
          color: appointment.get('pending') ? '#f0ad4e' : (appointment.get('accepted') ? '#5cb85c' : '#d9534f'),
          textColor: '#fff',
          className: 'clickable',
          appointment
        });
      });
    }

    model.set('events', events);
  }
});
