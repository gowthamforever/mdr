import Ember from 'ember';
import EmberValidator from 'ember-validator';
import Assessor from 'mdr/models/assessor';
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
  assessors: service(),
  notifications: service(),

  edit_personal: false,
  edit_contact: false,
  edit_billing: false,
  approved: false,

  model: null,

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
    const assessor = Assessor.create();

    assessor.setProperties(_.pick(this.get('assessor'), [
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
      'rater_id',
      'employee_number',
      'assessor_id',
      'active'
    ]));

    this.set('model', assessor);
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

    approve() {
      const self = this;
      const data = {};
      data.isApproved = true;
      data.assessor_id = self.get('assessor.assessor_id');

      self.ajax({
        id: 'patchprospect',
        data
      }).then(() => {
        self.get('notifications').backgroundNotification();
        self.setProperties({
          'assessor.cache': false,
          'model.active': 1,
          'assessor.active': 1,
          approved: true
        });
      });
    },

    personal() {
      const self  = this;
      const model = self.get('model');
      let data;

      data = _.pick(model, [
        'first_name',
        'last_name',
        'gender',
        'rater_id',
        'employee_number',
        'email_id'
      ]);

      data.dob = moment(model.get('dob'), 'MMM DD YYYY').format('MM-DD-YYYY');

      data = omitNoValue(data);

      self.ajax({
        id: 'updateassessorinfo',
        path: {
          id: self.get('model.assessor_id')
        },
        data
      }).then(() => {
        self.toggleProperty('edit_personal');
        self.set('assessors.cache', false);
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
          id: 'updateassessorcontact',
          path: {
            id: self.get('model.assessor_id')
          },
          data
        }).then(() => {
          self.toggleProperty('edit_contact');
          self.set('assessors.cache', false);
        });
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
