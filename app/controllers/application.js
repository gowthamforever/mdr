import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

const { service } = inject;

export default Controller.extend({
  application: service(),
  dialog: service(),
  session: service(),

  actions: {
    hideDialog() {
      this.get('dialog').hideDialog();
    }
  }
});
