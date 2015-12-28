import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  actions: {
    addAssessor() {
      this.transitionTo('assessors.add');
    }
  }
});
