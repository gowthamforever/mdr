import Ember from 'ember';
import Client from 'mdr/models/client';

const {
  Component,
  on
} = Ember;

export default Component.extend({
  edit_personal: false,
  edit_contact: false,
  edit_billing: false,

  model: null,

  set_model() {
    const client = Client.create();

    client.setProperties(_.pick(this.get('client'), [
      'last_name',
      'first_name',
      'dob',
      'gender',
      'pcd_name',
      'pcd_phone',
      'email_id',
      'insurance_plan',
      'phone1',
      'phone2',
      'address1',
      'state1',
      'city1',
      'zip1',
      'address2',
      'state2',
      'city2',
      'zip2',
      'card_type',
      'card_full_name',
      'card_no',
      'cvv',
      'expiry_month',
      'expiry_year',
      'card_address',
      'card_state',
      'card_city',
      'card_zip',
      'card_country'
    ]));

    this.set('model', client);
  },

  init_props: on('didInitAttrs', function() {
    this.set_model();
  }),

  actions: {
    togglePersonal() {
      this.set_model();
      this.toggleProperty('edit_personal');
    },

    toggleContact() {
      this.toggleProperty('edit_contact');
    },

    toggleBilling() {
      this.toggleProperty('edit_billing');
    }
  }
});
