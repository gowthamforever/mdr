import Ember from 'ember';

const {
  Route,
  get,
  set,
  isEmpty
} = Ember;

export default Route.extend({
  activate() {
    this.modelFor('authenticated').set('right_content', 'add-assessor-btn');
  },

  deactivate() {
    this.modelFor('authenticated').set('right_content', undefined);
  },

  actions: {
    filter() {
      const model     = this.get('controller.model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const assessors = model.get('clients');

      if (!isEmpty(assessors)) {
        set(model, 'assessors', assessors.filter((assessor) =>
          get(assessor, 'firstName').indexOf(firstName) !== -1 ||
          get(assessor, 'lastName').indexOf(lastName) !== -1));
      }
    },

    toggleStatus() {
      // TODO: Implement Toggle status API
    }
  }
});
