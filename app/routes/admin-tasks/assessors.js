import Ember from 'ember';
import Assessors from 'mdr/models/assessors';

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
        const model = Assessors.create({
          assessors: enrollments.get('assessors')
        });
        resolve(model);
      });
    });
  }
});
