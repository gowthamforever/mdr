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
  sidebar: service(),
  session: service(),

  tagName: 'header',
  classNames: ['mdr-header'],
  ariaRole: 'header',
  showTopBar: false,

  actions: {
    toggleSideBar() {
      this.get('sidebar').toggle();
    }
  }
});
