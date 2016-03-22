import Ember from 'ember';
import Form from 'mdr/models/form';
import Api from 'mdr/mixins/api';
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
    'four_notywataduip12m',
    'four_notywatstpip24m',
    'four_ecott',
    'four_efteit',
    'four_last_detox_admit',
    'four_last_detox_admit_lentgh_of_stay',
    'four_treating_agency',
    'four_drug_detoxed_from',
    'four_drug_detoxed_from_disch_date',
    'four_detox_disch_status',
    'four_last_sa_tx_admit',
    'four_last_sa_tx_admit_length_of_stay',
    'four_last_sa_tx_admit_treating_agency',
    'four_admit_reason',
    'four_last_sa_tx_disch_date',
    'four_last_sa_tx_disch_status',
    'four_actbstd',
    'four_dyfth',
    'four_ltyaan',
    'four_dyhadoap',
    'four_dybynhwydodu',
    'four_dybstchy',
    'four_hwydylomfr',
    'four_iatthlaytc',
    'four_wylhwydodp',
    'four_daeudiyhe',
    'four_dyhashre',
    'four_dyfud',
    'four_othn'
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
      four_notywataduip12m: {
        required: 'This field is required'
      },
      four_notywatstpip24m: {
        required: 'This field is required'
      },
      four_ecott: {
        required: 'This field is required'
      },
      four_efteit: {
        required: 'This field is required'
      },
      four_last_detox_admit: {
        required: 'This field is required'
      },
      four_last_detox_admit_lentgh_of_stay: {
        required: 'This field is required'
      },
      four_treating_agency: {
        required: 'This field is required'
      },
      four_drug_detoxed_from: {
        required: 'This field is required'
      },
      four_drug_detoxed_from_disch_date: {
        required: 'This field is required'
      },
      four_detox_disch_status: {
        required: 'This field is required'
      },
      four_last_sa_tx_admit: {
        required: 'This field is required'
      },
      four_last_sa_tx_admit_length_of_stay: {
        required: 'This field is required'
      },
      four_last_sa_tx_admit_treating_agency: {
        required: 'This field is required'
      },
      four_admit_reason: {
        required: 'This field is required'
      },
      four_last_sa_tx_disch_date: {
        required: 'This field is required'
      },
      four_last_sa_tx_disch_status: {
        required: 'This field is required'
      },
      four_actbstd: {
        required: 'This field is required'
      },
      four_dyfth: {
        required: 'This field is required'
      },
      four_ltyaan: {
        required: 'This field is required'
      },
      four_dyhadoap: {
        required: 'This field is required'
      },
      four_dybynhwydodu: {
        required: 'This field is required'
      },
      four_dybstchy: {
        required: 'This field is required'
      },
      four_hwydylomfr: {
        required: 'This field is required'
      },
      four_iatthlaytc: {
        required: 'This field is required'
      },
      four_wylhwydodp: {
        required: 'This field is required'
      },
      four_daeudiyhe: {
        required: 'This field is required'
      },
      four_dyhashre: {
        required: 'This field is required'
      },
      four_dyfud: {
        required: 'This field is required'
      },
      four_othn: {
        required: 'This field is required'
      }
    };
  },

  actions: {
    next() {
      const self        = this;
      const appointment = self.get('model');
      const page        = this.get('page');
      const form        = this.get('form');
      const validations = this.validations(form);
      let data;

      form.set('validationResult', null);

      if (appointment.get('completed')) {
        if (page) {
          page(4);
        }
      } else {
        self.validateMap({ form, validations }).then(() => {
          data = _.pick(form, self.get('props'));

          data.four_last_detox_admit = moment(form.get('four_last_detox_admit_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.four_drug_detoxed_from_disch_date = moment(form.get('four_drug_detoxed_from_disch_date_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.four_last_sa_tx_admit = moment(form.get('four_last_sa_tx_admit_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.four_last_sa_tx_disch_date = moment(form.get('four_last_sa_tx_disch_date_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.four_ltyaan = moment(form.get('four_ltyaan_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');

          self.ajax({
            id: 'assessmentformpost',
            path: {
              id: appointment.get('id'),
              pageNo: 3
            },
            data
          }).then(() => {
            self.set('appointments.cache', false);
            self.set_form(form, self.get('form_model'));
            if (page) {
              page(4);
            }
          }).catch(Ember.K);
        }).catch((validationResult) => {
          form.set('validationResult', validationResult);
        });
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(2);
      }
    }
  }
});
