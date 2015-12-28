import Ember from 'ember';
import Doctor from 'mdr/models/doctor';

const {
  Service,
  isEmpty
} = Ember;

export default Service.extend({
  doctors(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.doctor(item)));
    }

    return result;
  },

  doctor(response) {
    const data = [
      'active',
      'customer_rating',
      'dob',
      'doctor_id',
      'email_id',
      'first_name',
      'gender',
      'graduation_institution',
      'graduation_year',
      'medicaid_number',
      'medicare_number',
      'last_name',
      'npi',
      'photo',
      'practice_type',
      'practice_years',
      'primary_speciality',
      'service_charge',
      'surgeon',
      'speciality'
    ];

    return Doctor.create(_.pick(response, data));
  }
});
