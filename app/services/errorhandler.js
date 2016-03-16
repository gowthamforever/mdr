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
    if (this.get('dialog.show')) {
      this.get('dialog').hideDialog();
    }
    this.get('dialog').showDialog({
      name: 'modal-error'
    });
  }
});
