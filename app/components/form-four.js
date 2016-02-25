import Ember from 'ember';
import Api from 'mdr/mixins/api';

const {
  Component,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend(Api, {
  appointments: service(),

  actions: {
    next() {
      const self        = this;
      const appointment = self.get('model');
      const page        = this.get('page');
      const form        = this.get('form');
      let data;

      data = _.pick(form, [
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
      ]);

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
        if (page) {
          page(5);
        }
      }).catch(Ember.K);
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(3);
      }
    }
  }
});
