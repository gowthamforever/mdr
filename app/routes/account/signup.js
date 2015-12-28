import Ember from 'ember';
import EmberValidator from 'ember-validator';
import SingupModel from 'mdr/models/signup';
import { animateTo } from 'mdr/utility/utils';

const {
  Route
} = Ember;

export default Route.extend(EmberValidator, {
  model() {
    return SingupModel.create();
  },

  _validations(model) {
    return {
      agencyName: {
        required: 'This field is required'
      },
      eiNo: {
        required: 'This field is required'
      },
      address: {
        required: 'This field is required'
      },
      state: {
        required: 'This field is required'
      },
      city: {
        required: 'This field is required'
      },
      zip: {
        required: 'This field is required',
        zip: 'Zip code is invalid'
      },
      timezone: {
        required: 'This field is required'
      },
      phoneNo: {
        required: 'This field is required',
        phone: {
          format9: true,
          message: 'Phone number is invalid'
        }
      },
      altPhoneNo: {
        required: 'This field is required',
        phone: {
          format9: true,
          message: 'Phone number is invalid'
        }
      },
      faxNo: {
        required: 'This field is required',
        phone: {
          format9: true,
          message: 'Fax number is invalid'
        }
      },
      secondaryAddress: {
        required: 'This field is required'
      },
      secondaryState: {
        required: 'This field is required'
      },
      secondaryCity: {
        required: 'This field is required'
      },
      secondaryZip: {
        required: 'This field is required',
        zip: 'Zip code is invalid'
      },
      firstName: {
        required: 'This field is required'
      },
      lastName: {
        required: 'This field is required'
      },
      email: {
        required: 'This field is required',
        email: 'Email address is invalid'
      },
      confirmEmail: {
        if: (model) =>  model.get('email'),
        required: 'This field is required',
        email: 'Email address is invalid',
        equals: {
          accept: model.get('email'),
          message: 'This field doesn\'t match with Email'
        }
      },
      password: {
        required: 'This field is required'
      },
      confirmPassword: {
        if: (model) => model.get('password'),
        required: 'This field is required',
        equals: {
          accept: model.get('password'),
          message: 'This field doesn\'t match with Password'
        }
      }
    };
  },

  actions: {
    signup() {
      const model       = this.get('controller.model');
      const validations = this._validations(model);

      model.set('validationResult', null);
      animateTo();

      this.validateMap({ model, validations }).then(() => {

      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
