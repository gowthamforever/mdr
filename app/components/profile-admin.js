import Ember from 'ember';
import Admin from 'mdr/models/admin';
import Api from 'mdr/mixins/api';

const {
  Component,
  on,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend(Api, {
  session: service(),

  edit_personal: false,
  edit_contact: false,
  approved: false,

  model: null,

  set_model() {
    const admin = Admin.create();

    admin.setProperties(_.pick(this.get('admin'), [
      'active',
      'last_name',
      'first_name',
      'dob',
      'gender',
      'email_id',
      'phone1',
      'phone2',
      'address1',
      'state1',
      'city1',
      'zip1',
      'agency_admin_id',
      'active'
    ]));

    this.set('model', admin);
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
    }
  }
});
