import Ember from 'ember';

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
  enrollments: service(),

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('enrollments').getPendingProspects().then((enrollments) => {
        resolve(enrollments);
      });
    });
  }
});
