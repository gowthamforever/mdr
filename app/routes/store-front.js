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
  },

  renderTemplate() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, () => {
      Ember.$('.join-now-block').css('height', Ember.$(window).height() -180);
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
