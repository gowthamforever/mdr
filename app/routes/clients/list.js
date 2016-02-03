import Ember from 'ember';
import Clients from 'mdr/models/clients';

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
  clients: service(),

  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-client');
  },

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('clients').getClients().then((clients) => {
        resolve(Clients.create({
          clients
        }));
      });
    });
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
  }
});
