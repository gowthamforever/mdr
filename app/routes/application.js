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
    loading(transition) {
      const session = this.get('session');
      session.showLoadingBar();
      transition.promise.finally(() => {
        session.hideLoadingBar();
      });
    },

    didTransition() {
      scrollTop();
    }
  }
});
