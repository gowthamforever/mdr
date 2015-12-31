import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  showSideBar: true,

  actions: {
    toggleSideBar() {
      this.toggleProperty('showSideBar');
    }
  }
});
