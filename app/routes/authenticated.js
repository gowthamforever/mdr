import Ember from 'ember';

const {
  Route,
  inject
} = Ember;

const { service } = inject;

export default Route.extend({
  session: service(),
  header: service(),

  activate() {
    this.set('header.showAuthenticatedBlock', true);
  },

  deactivate() {
    this.set('header.showAuthenticatedBlock', false);
  },

  beforeModel() {
    const isAuthenticated = this.get('session.isAuthenticated');

    if (!isAuthenticated) {
      this.transitionTo('welcome');
    }
  }
});
