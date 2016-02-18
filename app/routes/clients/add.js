import Ember from 'ember';
import EmberValidator from 'ember-validator';
import Client from 'mdr/models/client';
import FamilyMemeber from 'mdr/models/family-member';
import Api from 'mdr/mixins/api';
import { animateTo, retainNumbers } from 'mdr/utility/utils';

const {
  Route,
  RSVP,
  isEmpty,
  inject
} = Ember;

const {
  service
} = inject;

const { Promise } = RSVP;

export default Route.extend(EmberValidator, Api, {
  clients: service(),

  beforeModel() {
    const session = this.get('session');

    if (session.get('role_doctor') || session.get('role_assessor')) {
      this.transitionTo('home');
    }
  },

  model() {
    return Client.create();
  },

  _validations(/*model*/) {
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

      dob: {
        required: 'Date of Birth is required.',
      },

      selected_language: {
        required: 'Language is required.',
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
        required: 'Zip Code is required',
        zip: 'Zip is not valid(NNNNN or NNNNN-NNNN).'
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

      selected_insurance_plan: {
        required: 'Insurance plan is required'
      }/*,

      card_full_name: {
        required: 'Full name is required.',
        length: {
          maximum: 100,
          message: 'Must be 100 characters or less.'
        }
      },

      card_no: {
        required: 'Card no is required.',
        length: {
          maximum: 16,
          message: 'Must be 16 characters or less.'
        }
      },

      cvv: {
        required: 'CVV is required.',
        length: {
          maximum: 4,
          message: 'Must be 4 characters or less.'
        },
        numeric: {
          integer: true,
          message: 'CVV is not valid.'
        }
      },

      selected_expiry_month: {
        required: 'Expiry month is required.'
      },

      expiry_year: {
        required: 'Expiry year is required.'
      },

      card_address: {
        unless: model.get('billing_is_primary'),
        required: 'Address is required.',
        length: {
          maximum: 250,
          message: 'Must be 250 characters or less.'
        }
      },

      selected_card_state: {
        unless: model.get('billing_is_primary'),
        required: 'State is required.'
      },

      selected_card_city: {
        unless: model.get('billing_is_primary'),
        required: 'City is required.'
      },

      card_zip: {
        unless: model.get('billing_is_primary'),
        required: 'Zip is required',
        zip: 'Zip is not valid(NNNNN or NNNNN-NNNN).'
      }*/
    };
  },

  _memeberValidations() {
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

      dob: {
        required: 'DOB is required.',
      },

      dependent: {
        required: 'Dependent is required.',
      }
    };
  },

  actions: {
    add() {
      const model       = this.get('controller.model');
      const validations = this._validations(model);
      const self        = this;
      const promises    = {};
      let data          = {};
      let valid         = true;

      model.set('validationResult', null);

      promises.model = new Promise((resolve, reject) => {
        self.validateMap({ model, validations }).then(() => {
          resolve();
        }).catch((validationResult) => {
          reject(validationResult);
        });
      });

      if (!isEmpty(model.get('family_memebers'))) {
        model.get('family_memebers').forEach((family_memeber, index) => {
          family_memeber.set('validationResult', null);
          promises[`memeber${index}`] = new Promise((resolve, reject) => {
            self.validateMap({
              model: family_memeber,
              validations: self._memeberValidations()
            }).then(() => {
              resolve();
            }).catch((validationResult) => {
              reject(validationResult);
            });
          });
        });
      }

      RSVP.hashSettled(promises).then((hash) => {
        _.forIn(hash, function(value, key) {
          if (key === 'model' && value.state === 'rejected') {
            model.set('validationResult', value.reason);
            valid = false;
          } else if (key.indexOf('memeber') !== -1 && value.state === 'rejected') {
            model.get('family_memebers')[key.replace('memeber', '')].set('validationResult', value.reason);
            valid = false;
          }
        });

        if (!valid) {
          animateTo();
          return;
        }

        data = _.pick(model, [
          'last_name',
          'first_name',
          'gender',
          'address1',
          'zip1',
          'city1',
          'memebership_name',
          'email_id'
        ]);

        data.phone1 = retainNumbers(model.get('phone1'));
        data.phone2 = retainNumbers(model.get('phone2'));
        data.dob = moment(model.get('dob'), 'MMM DD YYYY').format('YYYY-MM-DD');
        data.state1 = model.get('selected_state_1.id');
        data.country1 = 'US';
        data.insurance_plan = model.get('selected_insurance_plan.id');

        if (model.get('selected_race')) {
          data.race = model.get('selected_race.id');
        }

        if (model.get('selected_language')) {
          data.language = model.get('selected_language.id');
        }

        if (model.get('pcd_name')) {
          data.pcd_name = model.get('pcd_name');
        }

        if (model.get('pcd_phone')) {
          data.pcd_phone = model.get('pcd_phone');
        }

        data = _.assignIn(data, _.pick(model, [
          'card_full_name',
          'card_type',
          'card_no',
          'cvv'
        ]));

        data.expiry_month = model.get('selected_expiry_month.id');
        data.expiry_year = model.get('expiry_year');

        data = _.assignIn(data, _.pick(model, [
          'card_address',
          'card_zip'
        ]));

        data.card_country = 'US';
        data.card_state = model.get('selected_card_state.id');
        data.card_city = model.get('selected_card_city.name');

        if (model.get('billing_is_primary')) {
          data.card_address = data.address1;
          data.card_zip = data.zip1;
          data.card_country = data.country1;
          data.card_state = data.state1;
          data.card_city = data.city2;
        }

        self.ajax({
          id: 'addclient',
          data
        }).then(() => {
          self.refresh().then(() => {
            const model = self.get('controller.model');
            model.set('created', true);
            self.set('clients.cache', false);
          });
        }).catch(() => {

        });
      }).catch(Ember.K);
    },

    addMemeber() {
      const model = this.get('controller.model');
      model.get('family_memebers').pushObject(FamilyMemeber.create());
    },

    removeMemeber(family_memeber) {
      const model = this.get('controller.model');
      model.get('family_memebers').removeObject(family_memeber);
    }
  }
});
