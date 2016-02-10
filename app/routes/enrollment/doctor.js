import Ember from 'ember';
import EmberValidator from 'ember-validator';
import Doctor from 'mdr/models/enroll-doctor';
import Api from 'mdr/mixins/api';
import { animateTo, retainNumbers } from 'mdr/utility/utils';

const {
  Route,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend(EmberValidator, Api, {
  session: service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('store-front');
    }
  },
  model() {
    return Doctor.create();
  },

  _validations(model) {
    return {
      agency_id: {
        required: 'Agency Id is required.'
      },

      npi: {
        required: 'NPI Number is required.'
      },

      medicaid_number: {
        required: 'Medicaid Number is required.'
      },

      medicare_number: {
        required: 'Medicare Number is required.'
      },

      password1: {
        required: 'Password is required.'
      },

      password2: {
        required: 'Confirm Password is required.',
        equals: {
          accept: model.get('password1'),
          message: 'Confirm Password must be same as Password.'
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
      },

      selected_timezone: {
        required: 'Timezone is required'
      },

      phone1: {
        required: 'Phone Number is required',
        phone: {
          format2: true,
          message: 'Phone Number is not valid (NNN) NNN-NNNN.'
        }
      },

      phone2: {
        phone: {
          format9: true,
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
        required: 'Zip Code is required',
        zip: 'Zip Code is not valid(NNNNN or NNNNN-NNNN).'
      }
    };
  },

  actions: {
    add() {
      const model       = this.get('controller.model');
      const validations = this._validations(model);
      const self        = this;
      let data          = {};

      model.set('validationResult', null);

      self.validateMap({ model, validations }).then(() => {
        data = _.pick(model, [
          'first_name',
          'last_name',
          'email_id',
          'gender',
          'address1',
          'city1',
          'zip1',
          'agency_id',
          'npi',
          'medicare_number',
          'medicaid_number'
        ]);

        data.phone1 = retainNumbers(model.get('phone1'));
        data.phone2 = retainNumbers(model.get('phone2'));
        data.dob = moment(model.get('dob'), 'MMM DD YYYY').format('MM-DD-YYYY');
        data.state1 = model.get('selected_state_1.id');
        data.country1 = 'US';
        data.password = model.get('password1');
        data.timezone = model.get('selected_timezone.id');

        self.ajax({
          id: 'adddoctor',
          data
        }).then(() => {
          self.transitionTo("enrollment.confirmation");
        }).catch(() => {

        });
      }).catch((validationResult) => {
        animateTo();
        model.set('validationResult', validationResult);
      });
    }
  }
});
