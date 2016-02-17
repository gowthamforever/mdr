import Ember from 'ember';
import { scrollTop } from 'mdr/utility/utils';
import Api from 'mdr/mixins/api';

const {
  Route
} = Ember;

export default Route.extend(Api, {

  actions: {
    loading() {
      const self    = this;
      const session = this.get('session');
      try {
        session.showLoadingBar();
        self.router.one('didTransition', () => {
          session.hideLoadingBar();
        });
      } catch(e) {}
    },

    didTransition() {
      scrollTop();
    }
  },

  deactivate() {
    const session = this.get('session');
    this._super(...arguments);

    if (session.get('isAuthenticated')) {
      this.ajax({ id: 'logout' });
    }
  }
});
