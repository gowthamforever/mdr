import Ember from 'ember';
import EmberValidator from 'ember-validator';
import Admin from 'mdr/models/admin';
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

  edit_personal: false,
  edit_contact: false,
  approved: false,

  model: null,

  personal_validations() {
    return {
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

      dob_formatted: {
        required: 'Date of Birth is required'
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
          'gender'
        ]);

        data.dob = moment(model.get('dob_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');

        data = omitNoValue(data);

        self.ajax({
          id: 'updateadmininfo',
          path: {
            id: self.get('model.agency_admin_id')
          },
          data
        }).then(() => {
          model.set('dob', data.dob);
          self.toggleProperty('edit_personal');
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
          id: 'updateadmincontact',
          path: {
            id: self.get('model.agency_admin_id')
          },
          data
        }).then(() => {
          self.toggleProperty('edit_contact');
        });
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
