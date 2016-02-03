import Ember from 'ember';

const {
  Service
} = Ember;

export default Service.extend({
  unauthorized() {
    this.get('router').transitionTo('authenticated').then(() => {
      window.MDR.reset();
    });
  },

  fullpageerror() {
    this.get('router').transitionTo('full-page-error');
  }
});
