import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  activate() {
    this.modelFor('authenticated').set('right_content', 'right-content-client');
  },

  deactivate() {
    this.modelFor('authenticated').set('right_content', undefined);
  }
});
