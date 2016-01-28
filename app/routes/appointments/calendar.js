import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-appointment');
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
  },

  model() {
    const model         = this.modelFor('appointments');
    const events        = Ember.A();
    const appointments  = model.get('appointments');

    if (appointments) {
      appointments.forEach((appointment) => {
        events.pushObject({
          start: moment(appointment.get('ts_added'), 'MM-DD-YYYY HH:mm').toDate(),
          end: moment(appointment.get('ts_request'), 'MM-DD-YYYY HH:mm').toDate(),
          title: `<strong>Patient:</strong> ${appointment.get('customer.first_name')} ${appointment.get('customer.last_name')} <br> <strong>Reason:</strong> ${appointment.get('reason')}`,
          color: appointment.get('pending') ? '#f0ad4e' : (appointment.get('accepted') ? '#5cb85c' : '#d9534f'),
          textColor: '#fff',
          className: 'clickable',
          appointment
        });
      });
    }

    return events;
  }
});
