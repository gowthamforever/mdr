import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  activate() {
    this.get('titlebar').set('right_content', 'view-requests-btn');
  },

  deactivate() {
    this.get('titlebar').set('right_content', undefined);
  }
});
