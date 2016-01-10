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
    'sidebar.showSideBar:col-md-offset-2',
    'sidebar.showSideBar:col-xs-offset-1',
    'sidebar.showSideBar:col-sm-offset-1'],

  actions: {
    toggleSideBar() {
      this.get('sidebar').toggle();
    }
  }
});
