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
  assessments: service(),

  props: [
    'seven_hgc',
    'seven_dyhacdoc',
    'seven_es',
    'seven_psoi',
    'seven_api',
    'seven_afi',
    'seven_ses',
    'seven_nsoh',
    'seven_aythoh',
    'seven_ms',
    'seven_noc',
    'seven_nodc',
    'seven_ytoar',
    'seven_cla',
    'seven_aych',
    'seven_dyphadoap',
    'seven_afmcsst',
    'seven_afmwtsyr',
    'seven_fmeacaydu',
    'seven_ayofmiwcw',
    'seven_ofhn'
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
      seven_hgc: {
        required: 'This field is required'
      },
      seven_dyhacdoc: {
        required: 'This field is required'
      },
      seven_es: {
        required: 'This field is required'
      },
      seven_psoi: {
        required: 'This field is required'
      },
      seven_api: {
        required: 'This field is required'
      },
      seven_afi: {
        required: 'This field is required'
      },
      seven_ses: {
        required: 'This field is required'
      },
      seven_nsoh: {
        required: 'This field is required'
      },
      seven_aythoh: {
        required: 'This field is required'
      },
      seven_ms: {
        required: 'This field is required'
      },
      seven_noc: {
        required: 'This field is required'
      },
      seven_nodc: {
        required: 'This field is required'
      },
      seven_ytoar: {
        required: 'This field is required'
      },
      seven_cla: {
        required: 'This field is required'
      },
      seven_aych: {
        required: 'This field is required'
      },
      seven_dyphadoap: {
        required: 'This field is required'
      },
      seven_afmcsst: {
        required: 'This field is required'
      },
      seven_afmwtsyr: {
        required: 'This field is required'
      },
      seven_fmeacaydu: {
        required: 'This field is required'
      },
      seven_ayofmiwcw: {
        required: 'This field is required'
      },
      seven_ofhn: {
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

<<<<<<< .mine
      form.set('validationResult', null);

      if (appointment.get('completed')) {
=======
      if (appointment.get('form_completed')) {


>>>>>>> .theirs
        if (page) {
          page(7);
        }
      } else {
        self.validateMap({ form, validations }).then(() => {
          data = _.pick(form, self.get('props'));

        self.ajax({
          id: 'assessmentformpost',
          path: {
            id: appointment.get('id'),
            pageNo: 6
          },
          data
        }).then(() => {
          self.set('appointments.cache', false);
          self.set('assessments.cache', false);
          self.set_form(form, self.get('form_model'));
          if (page) {
            page(7);
          }
        }).catch(Ember.K);
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(5);
      }
    }
  }
});
