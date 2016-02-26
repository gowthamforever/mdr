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
    'three_primary_drug_used',
    'three_frequency',
    'three_method_of_admin',
    'three_last_used',
    'three_age_of_first_use',
    'three_hours_since_last_use',
    'three_secondary_drug_used',
    'three_frequence_2',
    'three_method_of_admin_2',
    'three_last_used_2',
    'three_age_of_first_use_2',
    'three_hours_since_last_use_2',
    'three_tertiary_drug_used',
    'three_frequence_3',
    'three_method_of_admin_3',
    'three_last_used_3',
    'three_age_of_first_use_3',
    'three_hours_since_last_use_3',
    'three_ldodyhu',
    'three_iv_drug_user',
    'three_habitual_drug_user',
    'three_sees_drug_use_as_harmful',
    'three_sees_alcohol_use_as_harmful',
    'three_sees_tobacco_use_as_harmful',
    'three_uses_tobacco',
    'three_eubootip24h',
    'three_ccfdoa',
    'three_cews',
    'three_aecaydau',
    'three_dyfydoudtm',
    'three_eescdtdodu',
    'three_eftylcoydodu',
    'three_dyftyntcborydodu',
    'three_ehtsmtdtydodu',
    'three_eadtydodu',
    'three_oniadu'
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

      data.three_last_used = moment(form.get('three_last_used_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.three_last_used_2 = moment(form.get('three_last_used_2_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.three_last_used_3 = moment(form.get('three_last_used_3_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');

      self.ajax({
        id: 'assessmentformpost',
        path: {
          id: appointment.get('id'),
          pageNo: 2
        },
        data
      }).then(() => {
        self.set('appointments.cache', false);
        self.set_form(form, self.get('form_model'));
        if (page) {
          page(3);
        }
      }).catch(Ember.K);
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(1);
      }
    }
  }
});
