import Ember from 'ember';
import Doctor from 'mdr/models/doctor';
import Api from 'mdr/mixins/api';

const {
  Service,
  isEmpty,
  RSVP
} = Ember;

const {
  Promise
} = RSVP;

export default Service.extend(Api, {
  doctors: null,
  cache: false,

  callDoctors() {
    const self = this;
    return new Promise((resolve) => {
      if (self.get('cache')) {
        resolve(self.get('doctors'));
      } else {
        self.ajax({
          id: 'doctors'
        }).then((response) => {
          self.setProperties({
            doctors: self.createDoctors(response.doctors),
            cache: true
          });
          resolve(self.get('doctors'));
        }).catch(() => {
          resolve();
        });
      }
    });
  },

  createDoctors(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.createDoctor(item)));
    }

    return result;
  },

  createDoctor(response) {
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
