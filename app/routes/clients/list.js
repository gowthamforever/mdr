import Ember from 'ember';
import Clients from 'mdr/models/clients';
import Api from 'mdr/mixins/api';

const {
  Route,
  RSVP,
  isEmpty,
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
  clients: service(),

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.ajax({
        id: 'clients'
      }).then((response) => {
        resolve(Clients.create({
          clients: self.get('clients').clients(response.clients)
        }));
      }).catch(() => {
        resolve(Clients.create());
      });
    });
  },

  actions: {
    filter() {
      const model     = this.get('controller.model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const clients   = model.get('clients');

      if (!isEmpty(clients)) {
        set(model, 'clients', clients.filter((client) =>
          get(client, 'first_name').indexOf(firstName) !== -1 ||
          get(client, 'last_name').indexOf(lastName) !== -1));
      }
    }
  }
});
