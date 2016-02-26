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
    'one_race',
    'one_ethnicity',
    'one_gender',
    'one_ssn',
    'one_dob',
    'two_referral_source',
    'two_referral_contact_name',
    'two_referral_agency_name',
    'two_referral_date',
    'two_contact_phone',
    'two_child_welfare_case',
    'two_marchman_act_case',
    'two_criminal_justice_case',
    'two_drug_court',
    'two_time',
    'two_type',
    'two_mode',
    'two_case_number',
    'two_referral_reason',
    'two_pdpf'
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

      data.one_age = form.get('one_age');
      data.one_dob = moment(form.get('one_dob_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.two_referral_date = moment(form.get('two_referral_date_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD');
      data.two_contact_phone = retainNumbers(form.get('two_contact_phone'));

      self.ajax({
        id: 'assessmentformpost',
        path: {
          id: appointment.get('id'),
          pageNo: 1
        },
        data
      }).then(() => {
        self.set('appointments.cache', false);
        self.set_form(form, self.get('form_model'));
        if (page) {
          page(2);
        }
      }).catch(Ember.K);
    }
  }
});
