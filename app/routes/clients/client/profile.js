import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'create-appointment-btn');
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').setProperties({
      right_content: undefined,
      right_content_model: undefined
    });
  },

  afterModel(model) {
    this.get('titlebar').set('right_content_model', model);
  }
});
