import Ember from 'ember';
import Doctors from 'mdr/models/doctors';

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
        const model = Doctors.create({
          doctors: enrollments.get('doctors')
        });
        resolve(model);
      });
    });
  }
});
