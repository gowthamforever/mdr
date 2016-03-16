import Ember from 'ember';
import EmberValidator from 'ember-validator';
import Client from 'mdr/models/client';
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
  clients: service(),
  edit_personal: false,
  edit_contact: false,
  edit_billing: false,

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

      email_id: {
        required: 'Email Address is required',
        length: {
          maximum: 50,
          message: 'Must be 50 characters or less.'
        },
        email: 'Email Address is not valid.'
      },

      dob_formatted: {
        required: 'Date of Birth is required.',
      },

      pcd_name: {
        length: {
          maximum: 100,
          message: 'Must be 100 characters or less.'
        }
      },

      pcd_phone: {
        phone: {
          format2: true,
          message: 'Phone no is not valid(NNNNNNNNNN).'
        }
      },

      insurance_plan_obj: {
        required: 'Insurance plan is required'
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
      'card_country',
      'customer_id'
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
          'gender',
          'pcd_name',
          'pcd_phone',
          'email_id'
        ]);

        data.dob = moment(model.get('dob_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
        data.insurance_plan = model.get('insurance_plan_obj.id');

        data = omitNoValue(data);

        self.ajax({
          id: 'updateclientinfo',
          path: {
            id: self.get('model.customer_id')
          },
          data
        }).then(() => {
          model.set('dob', data.dob);
          self.toggleProperty('edit_personal');
          self.set('clients.cache', false);
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
          id: 'updateclientcontact',
          path: {
            id: self.get('model.customer_id')
          },
          data
        }).then(() => {
          self.toggleProperty('edit_contact');
          self.set('clients.cache', false);
        });
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
