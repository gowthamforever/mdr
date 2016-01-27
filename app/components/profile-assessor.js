import Ember from 'ember';
import Assessor from 'mdr/models/assessor';

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
    const assessor = Assessor.create();

    assessor.setProperties(_.pick(this.get('assessor'), [
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
      'employee_number'
    ]));

    this.set('model', assessor);
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
