import Ember from 'ember';
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
  contact: service(),

  afterModel(model) {
    const self = this;
    this._super(...arguments);
    return new Promise((resolve) => {
      self.ajax({
        id: 'staffdetails',
        path: {
          id: model.get('agency_staff_id')
        }
      }).then((response) => {
        model.set('details', self.get('contact').createStaff(response));
        resolve();
      }).catch(() => {
        resolve();
      });
    });
  },

  deactivate() {
    const model = this.get('controller.model');
    this._super(...arguments);
    model.set('details', null);
  }
});
