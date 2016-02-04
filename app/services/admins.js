import Ember from 'ember';
import Admin from 'mdr/models/admin';

const {
  Service,
  isEmpty
} = Ember;

export default Service.extend({
  createAdmins(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.createAdmin(item)));
    }

    return result;
  },

  createAdmin(response) {
    const data = [
      'active',
      'agency_admin_id',
      'dob',
      'email_id',
      'employee_number',
      'first_name',
      'gender',
      'last_name',
      'photo',
      'address1',
      'city1',
      'state1',
      'zip1',
      'phone1',
      'phone2'
    ];

    return Admin.create(_.pick(response, data));
  }
});
