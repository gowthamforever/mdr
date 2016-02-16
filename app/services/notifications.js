import Ember from 'ember';
import Appointments from 'mdr/models/appointments';

const {
  Service,
  inject,
  isEmpty,
  RSVP,
  run,
  computed
} = Ember;

const {
  Promise,
  hash
} = RSVP;

const {
  alias
} = computed;

const {
  later,
  cancel
} = run;

const {
  service
} = inject;

export default Service.extend({
  session: service(),
  appointments: service(),
  enrollments: service(),

  content: null,
  notificationTimer: null,
  count: alias('content.length'),

  cancelNotificationTimer() {
    const timer = this.get('notificationTimer');
    if (timer) {
      cancel(timer);
      this.set('timer', null);
    }
  },

  backgroundNotification() {
    const promises = {};
    const self     = this;

    promises.appointments = this.getAppointments();
    if (this.get('session.role_admin') ||
      this.get('session.role_super_admin') ||
      this.get('session.role_regional_admin') ||
      this.get('session.role_global_admin')) {
      promises.enrollments = this.getEnrollments();
    }

    if (_.keys(promises).length > 0) {
      hash(promises).then((result) => {
        const { appointments, enrollments }   = result;
        const notifications   = Ember.A();
        let staffs;
        let doctors;
        let assessors;

        if (appointments && !isEmpty(appointments.get('pending'))) {
          appointments.get('pending').forEach((appointment) => {
            notifications.push({
              appointment: true,
              model: appointment
            });
          });
        }

        if (enrollments) {
          staffs = enrollments.get('staffs');
          doctors = enrollments.get('doctors');
          assessors = enrollments.get('assessors');

          if (!isEmpty(staffs)) {
            staffs.forEach((staff) => {
              notifications.push({ staff: true, model: staff });
            });
          }

          if (!isEmpty(doctors)) {
            doctors.forEach((doctor) => {
              notifications.push({ doctor: true, model: doctor });
            });
          }

          if (!isEmpty(assessors)) {
            staffs.forEach((assessor) => {
              notifications.push({ assessor: true, model: assessor });
            });
          }
        }

        self.set('content', notifications);
      });
    }
    this.cancelNotificationTimer();
    this.set('notificationTimer', later(this, function() {
      this.backgroundNotification();
    }, 300000));
  },

  getAppointments() {
    const self    = this;
    const service = self.get('appointments');

    service.set('cache', false);
    return new Promise((resolve) => {
      service.getAppointments(true).then((appointments) => {
        resolve(Appointments.create({
          appointments
        }));
      });
    });
  },

  getEnrollments() {
    const self = this;
    const service = self.get('enrollments');

    service.set('cache', false);
    return new Promise((resolve) => {
      service.getPendingProspects(true).then((enrollments) => {
        resolve(enrollments);
      });
    });
  }
});
