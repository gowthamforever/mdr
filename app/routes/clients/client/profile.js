import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  afterModel(model) {
    model.setProperties({
      edit_personal: false,
      edit_contact: false,
      edit_billing: false
    });
  },

  actions: {
    togglePersonal() {
      this.get('controller.model').toggleProperty('edit_personal');
    },

    toggleContact() {
      this.get('controller.model').toggleProperty('edit_contact');
    },

    toggleBilling() {
      this.get('controller.model').toggleProperty('edit_billing');
    }
  }
});
