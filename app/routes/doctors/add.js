import Ember from 'ember';
import Client from 'mdr/models/client';

const {
  Route
} = Ember;

export default Route.extend({
  model() {
    return Client.create();
  }
});
