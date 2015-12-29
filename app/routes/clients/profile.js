import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model(param) {
    if (param && param.customer_id) {
      return Ember.Object.create({
        customer_id: param.customer_id
      });
    }

    this.transitionTo('clients.list');
  }
});
