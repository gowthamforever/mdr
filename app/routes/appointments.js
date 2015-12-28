import Ember from 'ember';
import Appointments from 'mdr/models/appointments';
import Api from 'mdr/mixins/api';

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

export default Route.extend(Api, {
  appointments: service(),

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.ajax({
        id: 'appointments'
      }).then((response) => {
        resolve(Appointments.create({
          appointments: self.get('appointments').appointments(response)
        }));
      }).catch(() => {
        resolve(Appointments.create());
      });
    });
  },

  actions: {
    viewRequests() {
      this.transitionTo('appointments.requests');
    }
  }
});
