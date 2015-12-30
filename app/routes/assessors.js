import Ember from 'ember';
import Assessors from 'mdr/models/assessors';
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
  }
});
