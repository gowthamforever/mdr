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
      ]);

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
        if (page) {
          page(4);
        }
      }).catch(Ember.K);
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(2);
      }
    }
  }
});
