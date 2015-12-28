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
  tagName: 'header',
  classNames: ['mdr-header'],
  ariaRole: 'header',
  showTopBar: false,

  didInitAttrs() {
    this.get('clock').startTimer();
  },

  willDestroyElement() {
    this.get('clock').stopTimer();
  }
});
