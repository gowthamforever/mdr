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
    'nine_pd',
    'nine_sd',
    'nine_dir'
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
      nine_pd: {
        required: 'This field is required'
      },
      nine_sd: {
        required: 'This field is required'
      },
      nine_dir: {
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

      if (appointment.get('completed')) {
        if (page) {
          page(9);
        }
      } else {
        self.validateMap({ form, validations }).then(() => {
          data = _.pick(form, self.get('props'));

          self.ajax({
            id: 'assessmentformpost',
            path: {
              id: appointment.get('id'),
              pageNo: 8
            },
            data
          }).then(() => {
            self.set('appointments.cache', false);
            self.set_form(form, self.get('form_model'));
            if (page) {
              page(9);
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
        page(7);
      }
    }
  }
});
