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
    'five_notywatabauip12m',
    'five_notywatmtpip24m',
    'five_ecotfmt',
    'five_efteimht',
    'five_last_baker_act_admit',
    'five_length_of_stay',
    'five_agency',
    'five_treating_psychiatrist',
    'five_reason',
    'five_disch_status',
    'five_disch_date',
    'five_last_baker_act_admit2',
    'five_length_of_stay2',
    'five_agency2',
    'five_treating_psychiatrist2',
    'five_reason2',
    'five_disch_status2',
    'five_disch_date2',
    'five_dyhmcm',
    'five_aycrmht',
    'five_dyfymth',
    'five_dyaamcsg',
    'five_orientation',
    'five_cc',
    'five_nps',
    'five_mood_affect',
    'five_actamhm',
    'five_lmhmyhtip12m',
    'five_dolsa',
    'five_siip30d',
    'five_afmwhomp',
    'five_crmhs',
    'five_daeudiyhe',
    'five_duhashre',
    'five_dyfud',
    'five_ophn'
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
      five_notywatabauip12m: {
        required: 'This field is required'
      },
      five_notywatmtpip24m: {
        required: 'This field is required'
      },
      five_ecotfmt: {
        required: 'This field is required'
      },
      five_efteimht: {
        required: 'This field is required'
      },
      five_last_baker_act_admit: {
        required: 'This field is required'
      },
      five_length_of_stay: {
        required: 'This field is required'
      },
      five_agency: {
        required: 'This field is required'
      },
      five_treating_psychiatrist: {
        required: 'This field is required'
      },
      five_reason: {
        required: 'This field is required'
      },
      five_disch_status: {
        required: 'This field is required'
      },
      five_disch_date: {
        required: 'This field is required'
      },
      five_last_baker_act_admit2: {
        required: 'This field is required'
      },
      five_length_of_stay2: {
        required: 'This field is required'
      },
      five_agency2: {
        required: 'This field is required'
      },
      five_treating_psychiatrist2: {
        required: 'This field is required'
      },
      five_reason2: {
        required: 'This field is required'
      },
      five_disch_status2: {
        required: 'This field is required'
      },
      five_disch_date2: {
        required: 'This field is required'
      },
      five_dyhmcm: {
        required: 'This field is required'
      },
      five_aycrmht: {
        required: 'This field is required'
      },
      five_dyfymth: {
        required: 'This field is required'
      },
      five_dyaamcsg: {
        required: 'This field is required'
      },
      five_orientation: {
        required: 'This field is required'
      },
      five_cc: {
        required: 'This field is required'
      },
      five_nps: {
        required: 'This field is required'
      },
      five_mood_affect: {
        required: 'This field is required'
      },
      five_actamhm: {
        required: 'This field is required'
      },
      five_lmhmyhtip12m: {
        required: 'This field is required'
      },
      five_dolsa: {
        required: 'This field is required'
      },
      five_siip30d: {
        required: 'This field is required'
      },
      five_afmwhomp: {
        required: 'This field is required'
      },
      five_crmhs: {
        required: 'This field is required'
      },
      five_daeudiyhe: {
        required: 'This field is required'
      },
      five_duhashre: {
        required: 'This field is required'
      },
      five_dyfud: {
        required: 'This field is required'
      },
      five_ophn: {
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
          page(5);
        }
      } else {
        self.validateMap({ form, validations }).then(() => {
          data = _.pick(form, self.get('props'));

          data.five_last_baker_act_admit = moment(form.get('five_last_baker_act_admit_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.five_disch_date = moment(form.get('five_disch_date_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.five_last_baker_act_admit2 = moment(form.get('five_last_baker_act_admit2_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.five_disch_date2 = moment(form.get('five_disch_date2_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
          data.five_dolsa = moment(form.get('five_dolsa_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');

          self.ajax({
            id: 'assessmentformpost',
            path: {
              id: appointment.get('id'),
              pageNo: 4
            },
            data
          }).then(() => {
            self.set('appointments.cache', false);
            self.set_form(form, self.get('form_model'));
            if (page) {
              page(5);
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
        page(3);
      }
    }
  }
});
