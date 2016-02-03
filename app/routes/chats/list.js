import Ember from 'ember';
import Chats from 'mdr/models/chats';

const {
  Route,
  RSVP,
  isEmpty,
  inject
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

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('appointments').getAppointments().then((appointments) => {
        resolve(Chats.create({
          appointments
        }));
      });
    });
  },

  afterModel(model) {
    const appointments = model.get('appointments');
    const currentTime  = moment();
    const endTime      = moment().add(24, 'hours');
    let todaysAppointments;
    let activeAppointments;
    let ts_request_moment;
    let ts_request_endtime_moment;

    todaysAppointments = Ember.A();

    if (!isEmpty(appointments)) {
      activeAppointments = appointments.filterBy('accepted', true);
      activeAppointments.setEach('started', false);

      activeAppointments.forEach((appointment) => {
        ts_request_moment = appointment.get('ts_request_moment');
        ts_request_endtime_moment = appointment.get('ts_request_endtime_moment');

        if ((ts_request_moment.isSameOrAfter(currentTime) || currentTime.isSameOrBefore(ts_request_endtime_moment)) && ts_request_moment.isSameOrBefore(endTime)) {
          if(currentTime.isSameOrAfter(ts_request_moment) && currentTime.isSameOrBefore(ts_request_endtime_moment)) {
            appointment.set('started', true);
          }

          todaysAppointments.pushObject(appointment);
        }
      });
    }

    model.set('video_sessions', todaysAppointments);
  },

  redirect(model) {
    if (model.get('single_appointment')) {
      this.transitionTo('chats.chat', model.get('first_appointment'));
    }
  }
});
