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
    this.transitionTo('home');
  },

  afterModel(model) {
    const self        = this;
    const customer_id = model.get('customer_id');
    let client;
    let _clients;

    return new Promise((resolve) => {
      self.get('clients').getClients().then((clients) => {
        if (customer_id === 'all') {
          model.set('clients', Clients.create({ clients }));
        } else {
          client = clients.findBy('customer_id', customer_id);
          _clients = Ember.A([ client ]);

          model.setProperties({
            selected_client: client,
            clients: Clients.create({ clients:  _clients })
          });
        }
        resolve();
      });
    });
  }
});
