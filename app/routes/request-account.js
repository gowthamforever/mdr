import Ember from 'ember';
import EmberValidator from 'ember-validator';
import RequestAccount from 'mdr/models/request-account';
import Api from 'mdr/mixins/api';
import { animateTo } from 'mdr/utility/utils';

const {
  Route
} = Ember;

export default Route.extend(EmberValidator, Api, {
  model() {
    return RequestAccount.create();
  },

  _validations() {
    return {
      last_name: {
        length: {
          maximum: 50,
          message: 'Must be 50 characters or less.'
        }
      },

      first_name: {
        required: 'First name is required.',
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
        required: 'Email id is required.',
        length: {
          maximum: 50,
          message: 'Must be 50 characters or less.'
        },
        email: 'Email id is not valid.'
      },

      phone1: {
        required: 'Phone no is required',
        phone: {
          format9: true,
          message: 'Phone no is not valid(NNNNNNNNNN).'
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

  actions: {
    request() {
      const self        = this;
      const model       = self.get('controller.model');
      const validations = this._validations();
      const data        = {};

      model.set('validationResult', null);
      animateTo();
      self.validateMap({ model, validations }).then(() => {
        self.ajax({
          id: 'addclient',
          data
        }).then(() => {
          self.refresh().then(() => {
            const model = self.get('controller.model');
            model.set('created', true);
          });
        }).catch(() => {

        });
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
