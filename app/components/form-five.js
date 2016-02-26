import Ember from 'ember';
import Form from 'mdr/models/form';
import Api from 'mdr/mixins/api';
import { retainNumbers } from 'mdr/utility/utils';

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
        self.set_form(form, self.get('form_model'));
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
