import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  actions: {
    addDoctors() {
      this.transitionTo('doctors.add');
    }
  }
});
