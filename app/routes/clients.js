import Ember from 'ember';
import Clients from 'mdr/models/clients';
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
  }
});
