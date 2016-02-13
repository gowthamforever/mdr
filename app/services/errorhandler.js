import Ember from 'ember';

const {
  Service,
  inject
} = Ember;

const {
  service
} = inject;

export default Service.extend({
  session: service(),
  dialog: service(),

  unauthorized() {
    this.get('router').transitionTo('authenticated').then(() => {
      window.location = document.location.href.replace(location.hash , "" );
    });
  },

  fullpageerror() {
    this.get('dialog').showDialog({
      name: 'modal-error'
    });
  }
});
