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
    'ten_dim1',
    'ten_dim2',
    'ten_dim3',
    'ten_dim4',
    'ten_dim5',
    'ten_dim6'
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
      ten_dim1: {
        required: 'This field is required'
      },
      ten_dim2: {
        required: 'This field is required'
      },
      ten_dim3: {
        required: 'This field is required'
      },
      ten_dim4: {
        required: 'This field is required'
      },
      ten_dim5: {
        required: 'This field is required'
      },
      ten_dim6: {
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

      form.set('validationResult', null);

      if (appointment.get('form_completed')) {
        if (page) {
          page(10);
        }
      } else {
        self.validateMap({ form, validations }).then(() => {
          data = _.pick(form, self.get('props'));

        self.ajax({
          id: 'assessmentformpost',
          path: {
            id: appointment.get('id'),
            pageNo: 9
          },
          data
        }).then(() => {
          self.set('appointments.cache', false);
          self.set('assessments.cache', false);
          self.set_form(form, self.get('form_model'));
          if (page) {
            page(10);
          }
        }).catch(Ember.K);
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(8);
      }
    }
  }
});
