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

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('clients').callClients().then((clients) => {
        resolve(Clients.create({
          clients
        }));
      });
    });
  }
});
