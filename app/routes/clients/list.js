import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-client');
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
  }
});
