import Ember from 'ember';
import { scrollTop } from 'mdr/utility/utils';
import Api from 'mdr/mixins/api';

const {
  Route
} = Ember;

export default Route.extend(Api, {
  activate() {
    this._super(...arguments);
    Ember.$(window).on('resize.mdr-wrapper-main', () => {
      let height = Ember.$(window).height() + 50;
      let eleheight = Ember.$('.resizeable-container').outerHeight();

      if (height > eleheight) {
        Ember.$('.resizeable-container').css('min-height', height);
      }

      Ember.$('.wrapper-main').css('min-height', height + 50);
    });
  },

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

    Ember.$(window).off('resize.mdr-wrapper-main');

    if (session.get('isAuthenticated')) {
      this.ajax({ id: 'logout' });
    }
  }
});
