import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

const {
  service
} = inject;

export default Controller.extend({
  session: service(),
  
  actions: {
    accept() {
      this.set('model.status', 'accepted');
    },

    reject() {
      this.set('model.status', 'rejected');
    }
  }
});
