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

  validations() {
    return {
      three_primary_drug_used: {
        required: "Primary Drug Used is required"
      },
      three_frequency: {
        required: "Frequency is required"
      },
      three_method_of_admin: {
        required: "Method of Admin is required"
      },
      three_last_used: {
        required: "Last Used is required"
      },
      three_age_of_first_use: {
        required: "Age of First Used is required"
      },
      three_hours_since_last_use: {
        required: "Hours Since Last Used is required"
      },
      three_secondary_drug_used: {
        required: "Secondary Drug Used is required"
      },
      three_frequence_2: {
        required: "Frequency is required"
      },
      three_method_of_admin_2: {
        required: "Method of Admin is required"
      },
      three_last_used_2: {
        required: "Last Used is required"
      },
      three_age_of_first_use_2: {
        required: "Age of First Use is required"
      },
      three_hours_since_last_use_2: {
        required: "Hours Since Last Use is required"
      },
      three_tertiary_drug_used: {
        required: "Tertiary Drug Used is required"
      },
      three_frequence_3: {
        required: "Frequency is required"
      },
      three_method_of_admin_3: {
        required: "Method of Admin is required"
      },
      three_last_used_3: {
        required: "Last Used is required"
      },
      three_age_of_first_use_3: {
        required: "Age of First Use is required"
      },
      three_hours_since_last_use_3: {
        required: "Hours Since Last Use is required"
      },
      three_ldodyhu: {
        required: "other drugs you have used is required"
      },
      three_iv_drug_user: {
        required: "IV Drug User is required"
      },
      three_habitual_drug_user: {
        required: "Habitual Drug User is required"
      },
      three_sees_drug_use_as_harmful: {
        required: "Drug Use is required"
      },
      three_sees_alcohol_use_as_harmful: {
        required: "Alchol Use is required"
      },
      three_sees_tobacco_use_as_harmful: {
        required: "Tobacco Use is required"
      },
      three_uses_tobacco: {
        required: "Tobacco is required"
      },
      three_eubootip24h: {
        required: "This field is required"
      },
      three_ccfdoa: {
        required: "Current Carvings For Drugs or Alchol is required"
      },
      three_cews: {
        required: "This field is required"
      },
      three_aecaydau: {
        required: "This field is required"
      },
      three_dyfydoudtm: {
        required: "This field is required"
      },
      three_eescdtdodu: {
        required: "This field is required"
      },
      three_eftylcoydodu: {
        required: "This field is required"
      },
      three_dyftyntcborydodu: {
        required: "This field is required"
      },
      three_ehtsmtdtydodu: {
        required: "This field is required"
      },
      three_eadtydodu: {
        required: "This field is required"
      },
      three_oniadu: {
        required: "This field is required"
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
          page(3);
        }
      } else {
        self.validateMap({ form, validations }).then(() => {
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
            self.set('assessments.cache', false);
            self.set_form(form, self.get('form_model'));
            if (page) {
              page(3);
            }
          }).catch(Ember.K);
        });
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(1);
      }
    }
  }
});
