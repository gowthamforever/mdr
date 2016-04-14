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
  assessments: service(),

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

  validations() {
    return {
      six_notywaip12m: {
        required: 'This field is required'
      },
      six_date_of_last_arrest: {
        required: 'This field is required'
      },
      six_reason_for_last_arrest: {
        required: 'This field is required'
      },
      six_wladar: {
        required: 'This field is required'
      },
      six_toduptla: {
        required: 'This field is required'
      },
      six_ehawuda: {
        required: 'This field is required'
      },
      six_ayciicjs: {
        required: 'This field is required'
      },
      six_ayculs: {
        required: 'This field is required'
      },
      six_wyopaa: {
        required: 'This field is required'
      },
      six_pon: {
        required: 'This field is required'
      },
      six_popn: {
        required: 'This field is required'
      },
      six_toduptla2: {
        required: 'This field is required'
      },
      six_wyottaacop: {
        required: 'This field is required'
      },
      six_wycott: {
        required: 'This field is required'
      },
      six_isbj: {
        required: 'This field is required'
      },
      six_isbc: {
        required: 'This field is required'
      },
      six_olhn: {
        required: 'This field is required'
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

      if (appointment.get('form_completed')) {
        if (page) {
          page(6);
        }
      } else {
        self.validateMap({ form, validations }).then(() => {
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
            self.set('assessments.cache', false);
            self.set_form(form, self.get('form_model'));
            if (page) {
              page(6);
            }
          }).catch(Ember.K);
        });
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(4);
      }
    }
  }
});
