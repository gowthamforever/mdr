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

  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'create-appointment-btn');
  },

  deactivate() {
    const model = this.get('controller.model');
    this._super(...arguments);
    this.get('titlebar').setProperties({
      right_content: undefined,
      right_content_model: undefined
    });
    model.set('details', null);
  },

  afterModel(model) {
    this._super(...arguments);
    this.get('titlebar').set('right_content_model', model);

    const self = this;
    this._super(...arguments);
    return new Promise((resolve) => {
      self.ajax({
        id: 'clientdetails',
        path: {
          id: model.get('customer_id')
        }
      }).then((response) => {
        model.set('details', self.get('contact').createClient(response));
        resolve();
      }).catch(() => {
        resolve();
      });
    });
  }
});
