import Ember from 'ember';
import Staffs from 'mdr/models/staffs';

const {
  Route,
  RSVP,
  inject,
  isEmpty
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
        const model = Staffs.create({
          staffs: enrollments.get('staffs')
        });
        resolve(model);
      });
    });
  }
});
