import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  actions: {
    accept() {
      this.set('model.status', 'accepted');
    },

    reject() {
      this.set('model.status', 'rejected');
    }
  }
});
