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

  activate() {
    this.set('header.showLoginBtn', true);
  },

  deactivate() {
    this.set('header.showLoginBtn', false);
  }
});
