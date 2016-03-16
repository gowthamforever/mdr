import Ember from 'ember';

const {
  Route,
  inject,
  run
} = Ember;

const {
  scheduleOnce
} = run;

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
    Ember.$(window).off('resize.store-front');
  },

  renderTemplate() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, () => {
      Ember.$(window).on('resize.store-front', () => {
        let height = Ember.$(window).height();
        if (height < 570) {
          height = 570;
        }
        Ember.$('.join-now-block').css('height', height - 180);
      });
    });
  },

  actions: {
    login() {
      this.get('dialog').showDialog({
        name: 'modal-login',
        extraclass: ['small-dialog']
      });
    },

    home() {
      this.transitionTo('home');
    }
  }
});
