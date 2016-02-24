import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  actions: {
    next() {
      const page = this.get('page');
      if (page) {
        page(9);
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(7);
      }
    }
  }
});
