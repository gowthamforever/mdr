import Ember from 'ember';
import { scrollTop } from 'mdr/utility/utils';

const {
  Route,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  session: service(),

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
