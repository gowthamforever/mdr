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
  assessments: service(),

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('assessments').getAssessments().then((assessments) => {
        resolve(assessments);
      });
    });
  }
});
