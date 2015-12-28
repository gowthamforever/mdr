import Ember from 'ember';
import Assessors from 'mdr/models/assessors';
import Api from 'mdr/mixins/api';

const {
  Route,
  RSVP,
  get,
  set,
  inject
} = Ember;

const {
  Promise
} = RSVP;

const {
  service
} = inject;

export default Route.extend(Api, {
  assessors: service(),

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.ajax({
        id: 'assessors'
      }).then((response) => {
        resolve(Assessors.create({
          assessors: self.get('assessors').assessors(response.assessors)
        }));
      }).catch(() => {
        resolve(Assessors.create());
      });
    });
  },

  actions: {
    filter() {
      const model     = this.get('controller.model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const assessors = model.get('clients');

      if (!isEmpty(assessors)) {
        set(model, 'clients', clients.filter((assessors) =>
          get(client, 'firstName').indexOf(firstName) !== -1 ||
          get(client, 'lastName').indexOf(lastName) !== -1));
      }
    },

    toggleStatus(assessor, currentStatus) {
      // TODO: Implement Toggle status API
    }
  }
});
