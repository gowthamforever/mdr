import Ember from 'ember';
import EmberValidator from 'ember-validator';

const {
  Component,
  computed
} = Ember;

export default Component.extend(EmberValidator, {
  noneditable: computed('model.form_status', function() {
    const form_status = this.get('model.form_status');
    return form_status === 'pending' || form_status === 'completed';
  }),
  
  actions: {
    next() {
      const page = this.get('page');

      if (page) {
        page(3);
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(1);
      }
    }
  }
});
