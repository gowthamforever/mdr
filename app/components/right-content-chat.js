import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend({
  opentok: service(),

  actions: {
    toggleChat() {
      this.get('opentok').toggle();
    }
  }
});
