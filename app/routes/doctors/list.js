import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  activate() {
    this.get('titlebar').set('right_content', 'right-content-doctor');
  },

  deactivate() {
    this.get('titlebar').set('right_content', undefined);
  }
});
