import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  dialog: service(),

  actions: {
    terms() {
      this.get('dialog').showDialog({
        name: 'modal-terms'
      });
    },

    privacy() {
      this.get('dialog').showDialog({
        name: 'modal-privacy'
      });
    }
  }
});
