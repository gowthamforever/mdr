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

  actions: {
    next() {
      const self        = this;
      const appointment = self.get('model');
      const page        = this.get('page');
      const form        = this.get('form');
      let data;

      if (appointment.get('completed')) {
        if (page) {
          page(7);
        }
      } else {
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
