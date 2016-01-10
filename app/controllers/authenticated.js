import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

const {
  service
} = inject;

export default Controller.extend({
  sidebar: service(),

  actions: {
    toggleSideBar() {
      this.get('sidebar').toggle();
    }
  }
});
