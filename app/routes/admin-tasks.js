import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  beforeModel() {
    const session = this.get('session');
    
    if (!(session.get('role_admin') || session.get('role_super_admin') ||
      session.get('role_regional_admin') || session.get('role_global_admin'))) {
      this.transitionTo('home');
    }
  }
});
