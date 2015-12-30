import Ember from 'ember';
import Doctors from 'mdr/models/doctors';
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
  doctors: service(),

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.ajax({
        id: 'doctors'
      }).then((response) => {
        resolve(Doctors.create({
          doctors: self.get('doctors').doctors(response.doctors)
        }));
      }).catch(() => {
        resolve(Doctors.create());
      });
    });
  }
});
