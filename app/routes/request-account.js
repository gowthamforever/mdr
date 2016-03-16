import Ember from 'ember';
import EmberValidator from 'ember-validator';
import RequestAccount from 'mdr/models/request-account';
import Api from 'mdr/mixins/api';
import { animateTo, retainNumbers } from 'mdr/utility/utils';

const {
  Route
} = Ember;

export default Route.extend(EmberValidator, Api, {
  model() {
    return RequestAccount.create();
  },

  _validations() {
    return {
      agency_name: {
        required: 'Agency Name is required'
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

      phone1: {
        required: 'Phone Number is required',
        phone: {
          format2: true,
          message: 'Phone Number is not valid (NNN) NNN-NNNN.'
        }
      },

      comments: {
        required: 'Comments is required'
      }
    };
  },

  actions: {
    request() {
      const self        = this;
      const model       = self.get('controller.model');
      const validations = this._validations();
      let data;

      model.set('validationResult', null);

      animateTo();
      self.validateMap({ model, validations }).then(() => {
        data = _.pick(model, [
          'agency_name',
          'first_name',
          'last_name',
          'email_id',
          'comments'
        ]);

        data.phone1 = retainNumbers(model.get('phone1'));

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
