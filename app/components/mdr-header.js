import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend({
  header: service(),
  clock: service(),
  sidebar: service(),

  tagName: 'header',
  classNames: ['mdr-header'],
  ariaRole: 'header',
  showTopBar: false,
  isSidebarVisible: false,

  didInitAttrs() {
    this.get('clock').startTimer();
  },

  willDestroyElement() {
    this.get('clock').stopTimer();
  },

  actions: {
    toggleMenu() {
      this.toggleProperty('isSidebarVisible');
    }
  }
});
