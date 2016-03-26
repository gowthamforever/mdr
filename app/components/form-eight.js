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
  assessments: service(),

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

  actions: {
    next() {
      const self        = this;
      const appointment = self.get('model');
      const page        = this.get('page');
      const form        = this.get('form');
      let data;

      if (appointment.get('form_completed')) {
        if (page) {
          page(9);
        }
      } else {
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
          self.set('assessments.cache', false);
          self.set_form(form, self.get('form_model'));
          if (page) {
            page(9);
          }
        }).catch(Ember.K);
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
