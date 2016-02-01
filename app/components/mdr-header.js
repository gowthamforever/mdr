import Ember from 'ember';
import Appointments from 'mdr/models/appointments';

const {
  Component,
  inject,
  isEmpty,
  RSVP,
  observer,
  computed,
  run,
  on
} = Ember;

const {
  Promise,
  hash
} = RSVP;

const {
  later,
  cancel
} = run;

const {
  alias
} = computed;

const {
  service
} = inject;

export default Component.extend({
  header: service(),
  sidebar: service(),
  session: service(),
  dialog: service(),
  appointments: service(),
  enrollments: service(),

  tagName: 'header',
  classNames: ['mdr-header'],
  ariaRole: 'header',
  showTopBar: false,
  notifications: null,
  notifications_count: alias('notifications.length'),

  actions: {
    toggleSideBar() {
      this.get('sidebar').toggle();
    },

    login() {
      this.get('dialog').showDialog({
        name: 'modal-login',
        extraclass: ['small-dialog']
      });
    }
  },

  cancelNotificationTimer() {
    const timer = this.get('notificationTimer');
    if (timer) {
      cancel(timer);
      this.set('timer', null);
    }
  },

  notificationObserver: observer('header.session.isAuthenticated', function() {
    if (this.get('session.isAuthenticated')) {
      this.set('notifications', Ember.A());
      this.backgroundNotification();
    } else {
      this.cancelNotificationTimer();
    }
  }),

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
              model: staff
            });
          }

          if (!isEmpty(doctors)) {
            doctors.forEach((doctor) => {
              model: doctor
            });
          }

          if (!isEmpty(assessors)) {
            staffs.forEach((assessor) => {
              model: assessor
            });
          }
        }

        self.set('notifications', notifications);
      });
    }
    this.cancelNotificationTimer();
    this.set('notificationTimer', later(this, function() {
      this.backgroundNotification();
    }, 300000));
  },

  resetTimers: on('willDestroyElement', function() {
    this.cancelNotificationTimer();
  }),

  getAppointments() {
    const self = this;
    return new Promise((resolve) => {
      self.get('appointments').getAppointments().then((appointments) => {
        resolve(Appointments.create({
          appointments
        }));
      });
    });
  },

  getEnrollments() {
    const self = this;
    return new Promise((resolve) => {
      self.get('enrollments').getPendingProspects().then((enrollments) => {
        resolve(enrollments);
      });
    });
  }
});
