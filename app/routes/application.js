import Ember from 'ember';
import { scrollTop } from 'mdr/utility/utils';
import Api from 'mdr/mixins/api';

const {
  Route,
  RSVP,
  inject
} = Ember;

const {
  Promise
} = RSVP;

const {
  service
} = inject;

export default Route.extend(Api, {
  session: service(),

  beforeModel() {
    const self = this;
    return new Promise((resolve) => {
      self.ajax({ id: 'logout' }).then(() => {
        resolve();
      }).catch(() => {
        resolve();
      });
    });
  },

  activate() {
    const self = this;

    this._super(...arguments);
    Ember.$(window).on('resize.mdr-wrapper-main', () => {
      let height = Ember.$(window).height() + 50;
      let eleheight = Ember.$('.resizeable-container').outerHeight();

      if (height > eleheight) {
        Ember.$('.resizeable-container').css('min-height', height);
      }

      Ember.$('.wrapper-main').css('min-height', height + 50);
    });

    Ember.$(window).on('beforeunload', function(){
      const session = self.get('session');

      Ember.$(window).off('resize.mdr-wrapper-main');

      if (session.get('isAuthenticated')) {
        self.ajax({ id: 'logout' });
      }

      Ember.$(window).off('beforeunload');
    });
  },

  renderTemplate() {
    this._super(...arguments);
    Ember.$('#preload-css').remove();
    Ember.$('#preload-html').remove();
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
  }
});
