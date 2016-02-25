import Ember from 'ember';
import Api from 'mdr/mixins/api';
import { retainNumbers } from 'mdr/utility/utils';

const {
  Component,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend(Api, {
  appointments: service(),

  actions: {
    next() {
      const self        = this;
      const appointment = self.get('model');
      const page        = this.get('page');
      const form        = this.get('form');
      let data;

      data = _.pick(form, [
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
      ]);

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
        if (page) {
          page(2);
        }
      }).catch(Ember.K);
    }
  }
});
