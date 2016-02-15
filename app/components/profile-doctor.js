import Ember from 'ember';
import EmberValidator from 'ember-validator';
import Doctor from 'mdr/models/doctor';
import Api from 'mdr/mixins/api';
import { omitNoValue, retainNumbers } from 'mdr/utility/utils';

const {
  Component,
  on,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend(Api, EmberValidator, {
  session: service(),
  doctors: service(),
  approved: false,
  notifications: service(),

  edit_personal: false,
  edit_contact: false,
  edit_work: false,

  personal_open: true,
  contact_open: false,
  work_open: false,

  model: null,

  personal_validations() {
    return {
      npi: {
        required: 'NPI is required.',
        pattern: {
          with: /^\d{10}$/,
          message: 'Enter valid NPI number.'
        }
      },

      medicaid_number: {
        required: 'Medicaid Number is required.',
        pattern: {
          with: /^[a-zA-Z0-9]{10}$/,
          message: 'Enter valid Medicaid number number.'
        }
      },

      medicare_number: {
        required: 'Medicare Number is required.',
        pattern: {
          with: /^[a-zA-Z0-9]{10}$/,
          message: 'Enter valid Medicare number number.'
        }
      },

      last_name: {
        required: 'Last Name is required.',
        length: {
          maximum: 50,
          message: 'Must be 50 characters or less.'
        }
      },

      first_name: {
        required: 'First Name is required.',
        length: {
          minimum: 3,
          maximum: 50,
          messages: {
            minimum: 'Must be 3 characters or more.',
            maximum: 'Must be 50 characters or less.'
          }
        }
      },

      email_id: {
        required: 'Email Address is required.',
        length: {
          maximum: 50,
          message: 'Must be 50 characters or less.'
        },
        email: 'Email Address is not valid.'
      },

      dob: {
        required: 'Date of Birth is required.',
      }
    };
  },

  contact_validations() {
    return {
      phone1: {
        required: 'Phone Number is required',
        phone: {
          format2: true,
          message: 'Phone Number is not valid (NNN) NNN-NNNN.'
        }
      },

      phone2: {
        phone: {
          format2: true,
          message: 'Confirm Phone Number is not valid (NNN) NNN-NNNN.'
        }
      },

      address1: {
        required: 'Address is required.',
        length: {
          maximum: 250,
          message: 'Must be 250 characters or less.'
        }
      },

      selected_state_1: {
        required: 'State is required.'
      },

      city1: {
        required: 'City is required.'
      },

      zip1: {
        required: 'Zip is required',
        zip: 'Zip is not valid(NNNNN or NNNNN-NNNN).'
      }
    };
  },

  set_model() {
    const doctor = Doctor.create();

    doctor.setProperties(_.pick(this.get('doctor'), [
      'doctor_id',
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
      'npi',
      'dea',
      'ein',
      'medicaid_number',
      'medicare_number',
      'surgeon',
      'primary_speciality',
      'practice_type',
      'practice_years',
      'service_charge',
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday_start',
      'monday_start',
      'tuesday_start',
      'wednesday_start',
      'thursday_start',
      'friday_start',
      'saturday_start',
      'sunday_end',
      'monday_end',
      'tuesday_end',
      'wednesday_end',
      'thursday_end',
      'friday_end',
      'saturday_end',
      'treat_male',
      'treat_female',
      'treat_infants',
      'treat_children',
      'treat_adolescents',
      'treat_adults',
      'treat_senior',
      'treat_pregnent',
      'ins_1',
      'ins_2',
      'ins_3',
      'ins_4',
      'ins_5',
      'ins_6',
      'ins_7',
      'ins_8',
      'ins_9',
      'ins_10',
      'ins_11',
      'ins_12',
      'ins_13',
      'ins_14',
      'ins_15'
    ]));

    this.set('model', doctor);
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
      this.set_model();
      this.toggleProperty('edit_contact');
    },

    toggleWork() {
      this.set_model();
      this.toggleProperty('edit_work');
    },

    openPersonal() {
      this.setProperties({
        personal_open: true,
        contact_open: false,
        work_open: false
      });
    },

    openContact() {
      this.setProperties({
        personal_open: false,
        contact_open: true,
        work_open: false
      });
    },

    openWork() {
      this.setProperties({
        personal_open: false,
        contact_open: false,
        work_open: true
      });
    },

    approve() {
      const self = this;
      const data = {};
      data.isApproved = true;
      data.doctor_id = self.get('doctor.doctor_id');

      self.ajax({
        id: 'patchprospect',
        data
      }).then(() => {
        self.get('notifications').backgroundNotification();
        self.setProperties({
          'doctors.cache': false,
          'model.active': 1,
          'doctor.active': 1,
          approved: true
        });
      });
    },

    personal() {
      const self  = this;
      const model = self.get('model');
      const validations = self.personal_validations();
      let data;

      model.set('validationResult', undefined);
      self.validateMap({ model, validations }).then(() => {
        data = _.pick(model, [
          'first_name',
          'last_name',
          'email_id',
          'gender',
          'medicaid_number',
          'medicare_number',
          'npi',
          'practice_years',
          'service_charge',
          'surgeon',
          'ein',
          'dea',
          'graduation_year'
        ]);

        data.dob = moment(model.get('dob'), 'MMM DD YYYY').format('MM-DD-YYYY');
        data.primary_speciality = model.get('primary_speciality_obj.id');
        data.practice_type = model.get('practice_type_obj.id');

        data = omitNoValue(data);

        self.ajax({
          id: 'updatedoctorinfo',
          path: {
            id: self.get('model.doctor_id')
          },
          data
        }).then(() => {
          self.toggleProperty('edit_personal');
          self.set('doctors.cache', false);
        });
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    },

    contact() {
      const self  = this;
      const model = self.get('model');
      const validations = self.contact_validations();
      let data;

      model.set('validationResult', undefined);
      self.validateMap({ model, validations }).then(() => {
        data = _.pick(model, [
          'address1',
          'city1',
          'zip1'
        ]);

        data.country1 = 'US';
        data.state1 = model.get('selected_state_1.id');
        data.phone1 = retainNumbers(model.get('phone1'));
        data.phone2 = retainNumbers(model.get('phone2'));

        data = omitNoValue(data);

        self.ajax({
          id: 'updatedoctorcontact',
          path: {
            id: self.get('model.doctor_id')
          },
          data
        }).then(() => {
          self.toggleProperty('edit_contact');
          self.set('doctors.cache', false);
        });
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
