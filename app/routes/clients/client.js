import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model(param) {
    const model   = this.modelFor('clients');
    const clients = model.get('clients');
    let client;

    if (param && param.customer_id) {
      client = clients.findBy('customer_id', param.customer_id);

      if (client) {
        return client;
      }
    }

    this.transitionTo('clients.list');
  }
});
