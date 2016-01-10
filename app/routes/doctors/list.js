import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  activate() {
    this.modelFor('authenticated').set('right_content', 'right-content-doctor');
  },

  deactivate() {
    this.modelFor('authenticated').set('right_content', undefined);
  }
});
