import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model(param) {
    if (param && param.assessor_id) {
      return Ember.Object.create({
        assessor_id: param.assessor_id
      });
    }

    this.transitionTo('assessors.list');
  }
});
