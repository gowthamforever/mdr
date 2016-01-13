import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend({
  sidebar: service(),
  titlebar: service(),

  classNameBindings: ['sidebar.showSideBar:title-bar',
    'sidebar.showSideBar:show-sidebar'],

  actions: {
    toggleSideBar() {
      this.get('sidebar').toggle();
    }
  }
});
