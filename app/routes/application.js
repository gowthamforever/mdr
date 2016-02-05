import Ember from 'ember';
import { scrollTop } from 'mdr/utility/utils';

const {
  Route
} = Ember;

export default Route.extend({

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
  }
});
