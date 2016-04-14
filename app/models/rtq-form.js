import Ember from 'ember';
import Constants from 'mdr/utility/constants';
import { ageCalculator } from 'mdr/utility/utils';

const {
  Object: EmberObject,
  computed
} = Ember;

export default EmberObject.extend({
  states: Constants.STATES,
  races: Constants.RACES,
  ethnicities: Constants.ETHNICITIES,
  living_arrangements: Constants.LIVING_ARRAGEMENTS,
  drugs: Constants.PRIMARY_DRUGS,
  dispositions: Constants.RTQ_DISPOSITIONS,
  systolics: _.range(70, 200, 10),
  diastolics: _.range(40, 110, 10),

  first_name: undefined,
  last_name: undefined,
  address: undefined,
  city: undefined,
  state: undefined,
  selected_state: computed('state', function() {
    const state = this.get('state');
    return Constants.STATES.findBy('id', state);
  }),
  zip: undefined,
  country: 'United States',
  phone1: undefined,
  phone2: undefined,
  race: undefined,
  race_obj: computed('race', function() {
    const race = this.get('race');
    return Constants.RACES.findBy('id', race);
  }),
  gender: 'Male',
  dob: undefined,
  dob_formatted: computed('dob', function() {
    const dob = this.get('dob');
    if (dob) {
      return moment(dob, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  age: computed('dob', function() {
    const dob   = moment(this.get('dob'), 'YYYY-MM-DD');
    const today = moment();
    return ageCalculator(dob, today);
  }),
  ethnicity: undefined,
  ssn: undefined,

  rtq_date: moment().format('MMM DD YYYY'),
  rtq_time: moment().format('hh:mm A'),
  referral_source: undefined,
  referral_reason: undefined,
  marchman_court_referral: undefined,
  drug_court_referral: undefined,
  child_welfare_referral: undefined,
  client_signed: undefined,
  client_arrival: moment().format('MMM DD YYYY'),
  client_arrival_time: moment().format('hh:mm A'),
  transport_source: undefined,
  transport_person: undefined,
  precipitating_factor: undefined,
  primary_drug_used: undefined,
  secondary_drug_used: undefined,
  teritary_drug_used: undefined,
  fourth_drug_used: undefined,
  other_drug_used: undefined,
  last_detox_admission: undefined,
  last_detox_admission_formatted: computed('last_detox_admission', function() {
    const last_detox_admission = this.get('last_detox_admission');
    if (last_detox_admission) {
      return moment(last_detox_admission, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  last_alcohol_withdrawal: undefined,
  last_alcohol_withdrawal_formatted: computed('last_alcohol_withdrawal', function() {
    const last_alcohol_withdrawal = this.get('last_alcohol_withdrawal');
    if (last_alcohol_withdrawal) {
      return moment(last_alcohol_withdrawal, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  last_drug_withdrawal: undefined,
  last_drug_withdrawal_formatted: computed('last_drug_withdrawal', function() {
    const last_drug_withdrawal = this.get('last_drug_withdrawal');
    if (last_drug_withdrawal) {
      return moment(last_drug_withdrawal, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  last_daf_program: undefined,
  last_daf_program_formatted: computed('last_daf_program', function() {
    const last_daf_program = this.get('last_daf_program');
    if (last_daf_program) {
      return moment(last_daf_program, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  last_admit_sa_tx: undefined,
  last_admit_sa_tx_formatted: computed('last_admit_sa_tx', function() {
    const last_admit_sa_tx = this.get('last_admit_sa_tx');
    if (last_admit_sa_tx) {
      return moment(last_admit_sa_tx, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  alcohol_berthalyzer_test: undefined,
  drug_test: undefined,
  blood_pressure_date: undefined,
  blood_pressure_date_formatted: computed('blood_pressure_date', function() {
    const blood_pressure_date = this.get('blood_pressure_date');
    if (blood_pressure_date) {
      return moment(blood_pressure_date, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  blood_pressure_time: undefined,
  systolic: undefined,
  diastolic: undefined,
  temperature: undefined,
  pulse: undefined,
  non_ambulatory: undefined,
  current_medications: undefined,
  pregnant: undefined,
  health_status: undefined,
  developmentl_disablities: undefined,
  physical_disablities: undefined,
  visual_disablities: undefined,
  hearing_disablities: undefined,
  medical_complaints: undefined,
  last_suicide_attempt: undefined,
  last_suicide_attempt_formatted: computed('last_suicide_attempt', function() {
    const last_suicide_attempt = this.get('last_suicide_attempt');
    if (last_suicide_attempt) {
      return moment(last_suicide_attempt, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  physical_meds: undefined,
  last_admit_mental_health_center: undefined,
  last_admit_mental_health_center_formatted: computed('last_admit_mental_health_center', function() {
    const last_admit_mental_health_center = this.get('last_admit_mental_health_center');
    if (last_admit_mental_health_center) {
      return moment(last_admit_mental_health_center, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  reason_mental_health: undefined,
  mental_health_facility: undefined,
  psuchiatrist_name: undefined,
  mental_case_manager: undefined,
  psych_disch_21_days: undefined,
  mh_services: undefined,
  additional_mental_health_info: undefined,
  accept_residential_tx: undefined,
  daf_detox_outcome: undefined,
  living_status_after_detox: undefined,
  has_health_insurance: undefined,
  no_children_17_less: undefined,
  rtq_disposition: undefined,

  nurse_drug_use_status: undefined,
  nurse_alcohol_test: undefined,
  nurse_drug_test_needed: undefined,
  nurse_drug_detoxing_from: undefined,
  nurse_blood_pressure_date: undefined,
  nurse_blood_pressure_date_formatted: computed('nurse_blood_pressure_date', function() {
    const blood_pressure_date = this.get('nurse_blood_pressure_date');
    if (blood_pressure_date) {
      return moment(blood_pressure_date, 'YYYY-MM-DD', true).format('MMM DD YYYY');
    }
  }),
  nurse_blood_pressure_time: undefined,
  nurse_systolic: undefined,
  nurse_diastolic: undefined,
  nurse_temperature: undefined,
  nurse_pulse: undefined,
  nurse_rtq_date: moment().format('MMM DD YYYY'),
  nurse_rtq_time: moment().format('hh:mm A'),
  nurse_ciwa_score: undefined,
  nurse_non_ambulatory: undefined,
  nurse_open_wounds: undefined,
  nurse_current_medications: undefined,
  nurse_pregnant: undefined,
  nurse_health_status: undefined,
  nurse_developmentl_disablities: undefined,
  nurse_physical_disablities: undefined,
  nurse_medical_complaints: undefined,
  nurse_rtq_disposition: undefined
});
