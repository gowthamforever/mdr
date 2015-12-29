import Ember from 'ember';
import Doctors from 'mdr/models/doctors';
import Api from 'mdr/mixins/api';

const {
  Route,
  RSVP,
  get,
  set,
  inject,
  isEmpty
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
  },

  actions: {
    filter() {
      const model     = this.get('controller.model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const doctors   = model.get('doctors');

      if (!isEmpty(doctors)) {
        set(model, 'doctors', doctors.filter((doctor) =>
          get(doctor, 'first_name').indexOf(firstName) !== -1 ||
          get(doctor, 'last_name').indexOf(lastName) !== -1));
      }
    },

    toggleStatus() {
      // TODO: Implement Toggle status API
    }
  }
});
