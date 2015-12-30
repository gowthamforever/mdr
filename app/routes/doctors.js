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
  doctors: service(),

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('doctors').callDoctors().then((doctors) => {
        resolve(Doctors.create({
          doctors
        }));
      });
    });
  }
});
