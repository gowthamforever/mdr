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
    this.get('titlebar').setProperties({
      right_content: 'right-content-appointment',
      right_content_model: Ember.Object.create({ calendar: true })
    });
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').setProperties({
      right_content: undefined,
      right_content_model: undefined
    });
  },

  model(param) {
    let date = param && param.date ? param.date : moment().format('MMDDYYYY');

    date = moment(param.date, 'MMDDYYYY', true);
    if (!date.isValid()) {
      this.transitionTo('appointments.requests.pending');
    }

    return Appointments.create({
      date: param.date
    });
  },

  afterModel(model) {
    const self = this;
    return new Promise((resolve) => {
      self.get('appointments').getAppointments().then((appointments) => {
        const startTime    = moment(model.get('date'), 'MMDDYYYY');
        const endTime      = moment(model.get('date'), 'MMDDYYYY').add(24, 'hours');
        const formatted    = startTime.format('MMM DD YYYY');
        let date_appointments;
        let ts_request_moment;
        let ts_request_endtime_moment;

        date_appointments = appointments.filter((appointment) => {
          ts_request_moment = appointment.get('ts_request_moment');
          ts_request_endtime_moment = appointment.get('ts_request_endtime_moment');

          return ((ts_request_moment.isSameOrAfter(startTime) ||
            startTime.isSameOrBefore(ts_request_endtime_moment)) &&
            ts_request_moment.isSameOrBefore(endTime));
        });

        model.setProperties({
          appointments: date_appointments,
          formatted: formatted
        });

        resolve();
      });
    });
  }
});
