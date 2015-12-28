import Ember from 'ember';
import Assessor from 'mdr/models/assessor';

const {
  Service,
  isEmpty
} = Ember;

export default Service.extend({
  assessors(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.assessor(item)));
    }

    return result;
  },

  assessor(response) {
    const data = [
      'active',
      'assessor_id',
      'dob',
      'email_id',
      'employee_number',
      'first_name',
      'gender',
      'graduation_year',
      'last_name',
      'photo',
      'rater_id',
    ];

    return Assessor.create(_.pick(response, data));
  }
});
