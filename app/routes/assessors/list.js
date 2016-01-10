import Ember from 'ember';

const {
  Route,
  get,
  set,
  isEmpty
} = Ember;

export default Route.extend({
  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-assessor');
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
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
