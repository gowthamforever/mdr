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
  assessment_date: moment(),

  props: [
    'eleven_pr',
    'eleven_disposition',
    'eleven_rs',
    'eleven_ai',
    'eleven_at',
    'eleven_atdate',
    'eleven_s',
    'eleven_s_date',
    'eleven_eis',
    'eleven_eis_date'
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

      if (!appointment.get('completed')) {
        data = _.pick(form, self.get('props'));

        data.eleven_atdate = self.get('assessment_date').format('YYYY-MM-DD');
        data.eleven_s_date = self.get('assessment_date').format('YYYY-MM-DD');
        data.eleven_eis_date = self.get('assessment_date').format('YYYY-MM-DD');

        if (appointment.get('doctor')) {
          data.eleven_at = `${appointment.get('doctor.first_name')} ${appointment.get('doctor.last_name')}`;
        } else if (appointment.get('assessor')) {
          data.eleven_at = `${appointment.get('assessor.first_name')} ${appointment.get('assessor.last_name')}`;
        }

        data.eleven_eis = 'Yes';

        self.ajax({
          id: 'assessmentformpost',
          path: {
            id: appointment.get('id'),
            pageNo: 10
          },
          data
        }).then(() => {
          self.set('appointments.cache', false);
          self.set_form(form, self.get('form_model'));
          if (page) {
            page(11);
          }
        }).catch(Ember.K);
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(9);
      }
    }
  }
});
