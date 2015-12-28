import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  actions: {
    addClient() {
      this.transitionTo('clients.add');
    }
  }
});
