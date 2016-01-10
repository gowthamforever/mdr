import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  activate() {
    this.modelFor('authenticated').set('right_content', 'add-doctor-appointment-btn');
  },

  deactivate() {
    this.modelFor('authenticated').setProperties({
      right_content: undefined,
      right_content_model: undefined
    });
  },

  afterModel(model) {
    this.modelFor('authenticated').set('right_content_model', model);
  }
});
