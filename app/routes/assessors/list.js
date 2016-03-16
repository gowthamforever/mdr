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
  assessors: service(),

  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-assessor');
  },

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('assessors').getAssessors().then((assessors) => {
        resolve(Assessors.create({
          assessors: assessors.filter((assessor) => assessor.get('available') || assessor.get('inactive'))
        }));
      });
    });
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
  }
});
