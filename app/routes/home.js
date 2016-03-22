import Ember from 'ember';
import Api from 'mdr/mixins/api';
import HomeModel from 'mdr/models/home';

const {
  Route,
  RSVP,
  inject,
  isEmpty
} = Ember;

const {
  hash,
  Promise
} = RSVP;

const { service } = inject;

export default Route.extend(Api, {
  header: service(),
  clients: service(),
  doctors: service(),
  assessors: service(),
  appointments: service(),
  assessments: service(),

  model() {
    const self     = this;
    const session  = self.get('session');
    const promises = {
      clients: self.get('clients').getClients(),
      appointments: self.get('appointments').getAppointments(),
      assessments: self.get('assessments').getAssessments()
    };

    if (session.get('role_admin') || session.get('role_super_admin') ||
      session.get('role_regional_admin') || session.get('role_global_admin')) {
        promises.doctors = self.get('doctors').getDoctors();
        promises.assessors = self.get('assessors').getAssessors();
    }

    return new Promise((resolve) => {
      hash(promises).then((promises) => {
        const model = HomeModel.create(_.pick(promises, [
          'clients',
          'appointments',
          'doctors',
          'assessors',
          'assessments'
        ]));

        resolve(model);
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
          todaysAppointments.pushObject(appointment);
        }
      });
    }
    model.set('video_sessions', todaysAppointments);
  }
});
