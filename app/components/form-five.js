import Ember from 'ember';
import Api from 'mdr/mixins/api';
import { retainNumbers } from 'mdr/utility/utils';

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
        'six_notywaip12m',
        'six_date_of_last_arrest',
        'six_reason_for_last_arrest',
        'six_wladar',
        'six_toduptla',
        'six_ehawuda',
        'six_ayciicjs',
        'six_ayculs',
        'six_wyopaa',
        'six_pon',
        'six_popn',
        'six_toduptla2',
        'six_wyottaacop',
        'six_wycott',
        'six_isbj',
        'six_isbc',
        'six_olhn'
      ]);

      data.six_date_of_last_arrest = moment(form.get('six_date_of_last_arrest_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.six_popn = retainNumbers(form.get('six_popn'));

      self.ajax({
        id: 'assessmentformpost',
        path: {
          id: appointment.get('id'),
          pageNo: 5
        },
        data
      }).then(() => {
        self.set('appointments.cache', false);
        if (page) {
          page(6);
        }
      }).catch(Ember.K);
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(4);
      }
    }
  }
});
