import Ember from 'ember';
import Constants from 'mdr/utility/constants';
import { ageCalculator } from 'mdr/utility/utils';

const {
  Object: EmberObject,
  computed
} = Ember;
export default EmberObject.extend({
  // Page 1
  // Section 1
  races: Constants.RACES,
  race: undefined,
  selected_race: computed('race', function() {
    const race = this.get('race');
    return Constants.RACES.findBy('id', race);
  }),
  ethnicities: Constants.ETHNICITIES,
  ethnicity: undefined,
  one_gender: 'Male',
  one_ssn: undefined,
  dob: undefined,
  dob_formatted: computed('dob', function() {
    const dob = this.get('dob');
    if (dob) {
      return moment(dob, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  age: computed('dob_formatted', function() {
    const dob   = moment(this.get('dob_formatted'));
    const today = moment();
    if (dob) {
      return ageCalculator(dob, today);
    }
  }),
  // Section 2
  primary_drugs: Constants.PRIMARY_DRUGS,
  drugs_frequencies: Constants.DRUGS_FREQUENCIES,
  drugs_methods_of_admin: Constants.DRUGS_METHODS_OF_ADMIN,
  two_referral_source: undefined,
  two_referral_contact_name: undefined,
  two_referral_agency_name: undefined,
  two_contact_phone: undefined,
  two_child_welfare_case: undefined,
  two_marchman_act_case: undefined,
  two_criminal_justice_case: undefined,
  two_drug_court: undefined,
  referral_date: undefined,
  referral_date_formatted: computed('referral_date', function() {
    const referral_date = this.get('referral_date');
    if (referral_date) {
      return moment(referral_date, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  two_time: undefined,
  two_type: undefined,
  two_mode: undefined,
  two_case_number: undefined,
  two_referral_reason: undefined,
  two_pdpf: undefined,

  // Page 2
  // Section 3
  three_primary_drug_used: undefined,
  three_primary_drug_frequency: undefined,
  three_primary_drug_method_of_admin: undefined,
  three_primary_drug_last_used: undefined,
  three_primary_drug_age_of_first_use: undefined,
  three_primary_drug_hours_since_last_use: undefined,

  three_iv_drug_user: undefined,
  three_habitual_drug_user: undefined,
  three_sees_drug_use_as_harmful: undefined,
  three_sees_alchol_use_as_harmful: undefined,
  three_sees_tobacco_use_as_harmful: undefined,
  three_uses_tobacco: undefined,

  educational_grades: Constants.EDUCATIONAL_GRADES,
  employment_statuses: Constants.EMPLOYMENT_STATUSES,
  living_arrangements: Constants.LIVING_ARRAGEMENTS
});
