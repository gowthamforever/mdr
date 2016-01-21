import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  header: service(),
  dialog: service(),

  activate() {
    this._super(...arguments);
    this.set('header.showLoginBtn', true);
  },

  deactivate() {
    this._super(...arguments);
    this.set('header.showLoginBtn', false);
  },

  actions: {
    login() {
      this.get('dialog').showDialog({
        name: 'modal-login'
      });
    },

    home() {
      this.transitionTo('home');
    }
  }
});
