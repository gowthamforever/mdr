import Ember from 'ember';
import Form from 'mdr/models/form';
import Api from 'mdr/mixins/api';
import { retainNumbers } from 'mdr/utility/utils';
import EmberValidator from 'ember-validator';

const {
  Component,
  inject,
  on
} = Ember;

const {
  service
} = inject;

export default Component.extend(Api, EmberValidator, {
  appointments: service(),

  props: [
    'one_race',
    'one_ethnicity',
    'one_gender',
    'one_ssn',
    'one_dob',
    'two_referral_source',
    'two_referral_contact_name',
    'two_referral_agency_name',
    'two_referral_date',
    'two_contact_phone',
    'two_child_welfare_case',
    'two_marchman_act_case',
    'two_criminal_justice_case',
    'two_drug_court',
    'two_time',
    'two_type',
    'two_mode',
    'two_case_number',
    'two_referral_reason',
    'two_pdpf'
  ],

  set_form(source, target) {
    target.setProperties(_.pick(source, this.get('props')));
    this.set('form', target);
  },

  init_props: on('didInitAttrs', function() {
    this.set_form(this.get('form_model'), Form.create());
  }),

  validations(model) {
    return {
      one_race: {
        required: 'Race is required'
      },
      one_ethnicity: {
        required: 'Ethnicity is required'
      },
      one_gender: {
        required: 'Gender is required'
      },
      one_ssn: {
        required: 'SSN is required',
        ssn: {
          all: true,
          message: "Invalid ssn"
        }
      },
      one_dob: {
        required: 'Date of birth is required',
        date: {
          format: 'MM/DD/YYYY',
          messages: {
            format: 'Please enter the valid date'
          }
        }
      },
      two_referral_source: {
        required: 'Referal Source is required'
      },
      two_referral_contact_name: {
        required: 'Referal Contact Name is required'
      },
      two_referral_agency_name: {
        required: 'Referal Agency Name is required'
      },
      two_referral_date: {
        required: 'Referal date is required',
        date: {
          format: 'MM/DD/YYYY',
          messages: {
            format: 'Please enter the valid date'
          }
        }
      },
      two_contact_phone: {
        required: 'Phone number is required',
        phone: {
          all: true
          message: "Invalid phone"
        }
      },
      two_child_welfare_case: {
        required: 'Child Welfare Case is required'
      },
      two_marchman_act_case: {
        required: 'Marchman Act Case is required'
      },
      two_criminal_justice_case: {
        required: 'Criminal Justice Case is required'
      },
      two_drug_court: {
        required: 'Drug Court is required'
      },
      two_time: {
        required: 'Time is required'
      },
      two_type: {
        required: 'Type is required'
      },
      two_mode: {
        required: 'Mode is required'
      },
      two_case_number: {
        required: 'Case Number is required'
      },
      two_referral_reason: {
        required: 'Referal Reason is required'
      },
      two_pdpf: {
        required: 'Precipitating Factor is required'
      }
    };
  },

  actions: {
    next() {
      const self        = this;
      const appointment = self.get('model');
      const page        = this.get('page');
      let form          = this.get('form');
      const validations = this.validations(form);
      let data;

      form.set('validationResult', null);

      if (appointment.get('completed')) {
        if (page) {
          page(2);
        }
      } else {
        self.validateMap({ form, validations }).then(() => {
          data = _.pick(form, self.get('props'));

          data.one_age = form.get('one_age');
          data.one_dob = moment(form.get('one_dob_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.two_referral_date = moment(form.get('two_referral_date_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.two_contact_phone = retainNumbers(form.get('two_contact_phone'));

          self.ajax({
            id: 'assessmentformpost',
            path: {
              id: appointment.get('id'),
              pageNo: 1
            },
            data
          }).then(() => {
            self.set('appointments.cache', false);
            self.set_form(form, self.get('form_model'));
            if (page) {
              page(2);
            }
          }).catch(Ember.K);
        }).catch((validationResult) => {
          form.set('validationResult', validationResult);
        });
      }
    }
  }
});
