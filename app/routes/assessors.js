import Ember from 'ember';
import Assessors from 'mdr/models/clients';

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
  assessors: service(),

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('assessors').getAssessors().then((assessors) => {
        resolve(Assessors.create({
          assessors
        }));
      });
    });
  }
});
