import Ember from 'ember';

const {
  Service
} = Ember;

export default Service.extend({
  fullscreen: true,

  toggle() {
    this.toggleProperty('fullscreen');
  }
});
