import Ember from 'ember';
import Client from 'mdr/models/client';

const {
  Service,
  isEmpty
} = Ember;

export default Service.extend({
  clients(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.client(item)));
    }

    return result;
  },

  client(response) {
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
