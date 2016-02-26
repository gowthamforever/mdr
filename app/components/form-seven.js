import Ember from 'ember';
import Form from 'mdr/models/form';
import Api from 'mdr/mixins/api';

const {
  Component,
  inject,
  on
} = Ember;

const {
  service
} = inject;

export default Component.extend(Api, {
  appointments: service(),

  props: [
    'eight_nothip24m',
    'eight_ehdtdoa',
    'eight_nosip24m',
    'eight_nopad',
    'eight_gbip12m',
    'eight_cp',
    'eight_iphmm',
    'eight_lpe',
    'eight_lpv',
    'eight_lbe',
    'eight_lps',
    'eight_dyhapp',
    'eight_dyhhi',
    'eight_lttfh',
    'eight_lha',
    'eight_los',
    'eight_hospital',
    'eight_tp',
    'eight_reason',
    'eight_disch_status',
    'eight_disch_date',
    'eight_lpv2',
    'eight_tp2',
    'eight_reason2',
    'eight_status',
    'eight_lacmyatatrfsm',
    'eight_lakayh',
    'eight_cmc',
    'eight_omhn'
  ],

  set_form(source, target) {
    target.setProperties(_.pick(source, this.get('props')));
    this.set('form', target);
  },

  init_props: on('didInitAttrs', function() {
    this.set_form(this.get('form_model'), Form.create());
  }),

  actions: {
    next() {
      const self        = this;
      const appointment = self.get('model');
      const page        = this.get('page');
      const form        = this.get('form');
      let data;

      data = _.pick(form, self.get('props'));

      data.eight_lpe = moment(form.get('eight_lpe_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.eight_lpv = moment(form.get('eight_lpv_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.eight_lbe = moment(form.get('eight_lbe_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.eight_lbs = moment(form.get('eight_lbs_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.eight_lttfh = moment(form.get('eight_lttfh_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.eight_lha = moment(form.get('eight_lha_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.eight_disch_date = moment(form.get('eight_disch_date_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.eight_lpv2 = moment(form.get('eight_lpv2_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');

      self.ajax({
        id: 'assessmentformpost',
        path: {
          id: appointment.get('id'),
          pageNo: 7
        },
        data
      }).then(() => {
        self.set('appointments.cache', false);
        self.set_form(form, self.get('form_model'));
        if (page) {
          page(8);
        }
      }).catch(Ember.K);
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(6);
      }
    }
  }
});
