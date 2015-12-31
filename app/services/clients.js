import Ember from 'ember';
import Client from 'mdr/models/client';
import Api from 'mdr/mixins/api';

const {
  Service,
  isEmpty,
  RSVP
} = Ember;

const {
  Promise
} = RSVP;

export default Service.extend(Api, {
  clients: null,
  cache: false,

  callClients() {
    const self = this;
    return new Promise((resolve) => {
      if (self.get('cache')) {
        resolve(self.get('clients'));
      } else {
        self.ajax({
          id: 'clients'
        }).then((response) => {
          self.setProperties({
            clients: self.createClients(response.clients),
            cache: true
          });
          resolve(self.get('clients'));
        }).catch(() => {
          resolve();
        });
      }
    });
  },

  createClients(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.createClient(item)));
    }

    return result;
  },

  createClient(response) {
    const data = [
      'agency_id',
      'customer_id',
      'dob',
      'email_id',
      'first_name',
      'gender',
      'insurance_plan',
      'language',
      'last_name',
      'pcd_name',
      'photo',
      'race'
    ];

    return Client.create(_.pick(response, data));
  }
});
