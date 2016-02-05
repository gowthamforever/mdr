import Ember from 'ember';
import Staff from 'mdr/models/staff';
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
  notifications: service(),

  edit_personal: false,
  edit_contact: false,
  approved: false,

  model: null,

  set_model() {
    const staff = Staff.create();

    staff.setProperties(_.pick(this.get('staff'), [
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
      'rater_id',
      'employee_number',
      'agency_staff_id',
      'active'
    ]));

    this.set('model', staff);
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

    approve() {
      const self = this;
      const data = {};
      data.isApproved = true;
      data.agency_staff_id = self.get('staff.agency_staff_id');

      self.ajax({
        id: 'patchprospect',
        data
      }).then(() => {
        self.get('notifications').backgroundNotification();
        self.setProperties({
          'model.active': 1,
          'staff.active': 1,
          approved: true
        });
      });
    }
  }
});
