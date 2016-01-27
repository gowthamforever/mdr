import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  opentok: service(),

  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-chat');
    this.set('opentok.fullscreen', true);
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
    this.set('opentok.fullscreen', true);
  }
});
