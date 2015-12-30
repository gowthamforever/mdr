import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model(param) {
    const model     = this.modelFor('assessors');
    const assessors = model.get('assessors');
    let assessor;

    if (param && param.assessor_id) {
      assessor = assessors.findBy('assessor_id', param.assessor_id);

      if (assessor) {
        return assessor;
      }
    }

    this.transitionTo('assessors.list');
  }
});
