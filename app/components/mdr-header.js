import Ember from 'ember';

const {
  Component,
  inject,
  observer,
  on
} = Ember;

const {
  service
} = inject;

export default Component.extend({
  header: service(),
  sidebar: service(),
  session: service(),
  dialog: service(),
  notifications: service(),

  tagName: 'header',
  classNames: ['mdr-header'],
  ariaRole: 'header',
  showTopBar: false,

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

  notificationObserver: observer('header.session.isAuthenticated', function() {
    if (this.get('session.isAuthenticated')) {
      this.set('notifications.content', Ember.A());
      this.get('notifications').backgroundNotification();
    } else {
      this.get('notifications').cancelNotificationTimer();
    }
  }),

  resetTimers: on('willDestroyElement', function() {
    this.get('notifications').cancelNotificationTimer();
  })
});
