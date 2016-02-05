import Ember from 'ember';
import Api from 'mdr/mixins/api';

const {
  Controller,
  inject
} = Ember;

const {
  service
} = inject;

export default Controller.extend(Api, {
  session: service(),
  notifications: service(),
  appointments: service(),

  actions: {
    accept() {
      const self = this;
      const data = { status: 'accepted' };
      self.ajax({
        id: 'patchappointment',
        path: {
          id: self.get('model.id')
        },
        data
      }).then(() => {
        self.set('appointments.cache', false);
        self.set('model.status', 'accepted');
        self.get('notifications').backgroundNotification();
      });
    },

    reject() {
      const self = this;
      const data = { status: 'rejected' };
      self.ajax({
        id: 'patchappointment',
        path: {
          id: self.get('model.id')
        },
        data
      }).then(() => {
        self.set('appointments.cache', false);
        self.set('model.status', 'rejected');
        self.get('notifications').backgroundNotification();
      });
    }
  }
});
