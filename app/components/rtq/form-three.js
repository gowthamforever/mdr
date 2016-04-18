import Ember from 'ember';
import EmberValidator from 'ember-validator';
import Api from 'mdr/mixins/api';
import { formatToServer } from 'mdr/utility/utils';

const {
  Component,
  computed,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend(EmberValidator, Api, {
  assessments: service(),

  noneditable: computed('model.form_status', function() {
    const form_status = this.get('model.form_status');
    return form_status === 'started' || form_status === 'completed';
  }),

  actions: {
    next() {
      const page = this.get('page');

      if (page) {
        page(4);
      }
    },

    submit() {
      const model = this.get('model');
      let data;

      if (model.get('form_status') !== 'started') {
        data = {
          ca_fn: model.get('form.first_name'),
          ca_ln: model.get('form.last_name'),
          ca_a: model.get('form.address'),
          ca_c: model.get('form.city'),
          ca_z: model.get('form.zip'),
          ca_ppn: model.get('form.phone1'),
          ca_spn: model.get('form.phone2'),
          d_g: model.get('form.gender'),

          d_r: model.get('form.race_obj.id'),
          ca_s: model.get('form.selected_state.id'),
          d_dob: moment(model.get('form.dob_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD'),
          ra_rpo: formatToServer(`${model.get('form.rtq_date')} ${model.get('form.rtq_time')}`),
          ra_dtoca: formatToServer(`${model.get('form.client_arrival')} ${model.get('form.client_arrival_time')}`),
          wm_lda: moment(model.get('form.last_detox_admission_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD'),
          wm_ladw: moment(model.get('form.last_alcohol_withdrawal_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD'),
          wm_ladws: moment(model.get('form.last_drug_withdrawal_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD'),
          wm_ltadp: moment(model.get('form.last_daf_program_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD'),
          wm_latast: moment(model.get('form.last_admit_sa_tx_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD'),
          mh_lsa: moment(model.get('form.last_suicide_attempt_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD'),
          mh_latmhc: moment(model.get('form.last_admit_mental_health_center_formatted'), 'MMM DD YYYY').format('YYYY-MM-DD'),
          bbm_bpd: formatToServer(`${model.get('form.blood_pressure_date_formatted')} ${model.get('form.blood_pressure_time')}`),

          d_e: model.get('form.ethnicity'),
          d_ssn: model.get('form.ssn'),
          agency_staff_id: this.get('session.role_staff') ? model.get('form.agency_staff_id') : undefined,
          agency_admin_id: !this.get('session.role_staff') ? model.get('form.agency_admin_id') : undefined,
          ra_scr: `${model.get('form.staff.first_name')} ${model.get('form.staff.last_name')}`,
          ra_rs: model.get('form.referral_source'),
          ra_rfr: model.get('form.referral_reason'),
          ra_rmac: model.get('form.marchman_court_referral'),
          ra_rbdc: model.get('form.drug_court_referral'),
          ra_dcwr: model.get('form.child_welfare_referral'),
          ra_cssil: model.get('form.client_signed'),
          ra_tsa: model.get('form.transport_source'),
          ra_tpn: model.get('form.transport_person'),
          ra_cls: model.get('form.living_status'),
          ra_pf: model.get('form.precipitating_factor'),
          cdu_pdu: model.get('form.primary_drug_used'),
          cdu_sdu: model.get('form.secondary_drug_used'),
          cdu_tdu: model.get('form.teritary_drug_used'),
          cdu_fdu: model.get('form.fourth_drug_used'),
          cdu_odu: model.get('form.other_drug_used'),
          wm_opda: model.get('form.no_detox_admissions'),
          bbm_abt: model.get('form.alcohol_berthalyzer_test'),
          bbm_dt: model.get('form.drug_test'),
          bbm_ss: model.get('form.systolic'),
          bbm_ds: model.get('form.diastolic'),
          bbm_t: model.get('form.temperature'),
          bbm_p: model.get('form.pulse'),
          bbm_cina: model.get('form.non_ambulatory'),
          bbm_cm: model.get('form.current_medications'),
          bbm_cp: model.get('form.pregnant'),
          bbm_chs: model.get('form.health_status'),
          bbm_dd: model.get('form.developmentl_disablities'),
          bbm_pd: model.get('form.physical_disablities'),
          bbm_vd: model.get('form.visual_disablities'),
          bbm_hd: model.get('form.hearing_disablities'),
          bbm_cmc: model.get('form.medical_complaints'),
          mh_pmct: model.get('form.physical_meds'),
          mh_rmha: model.get('form.reason_mental_health'),
          mh_nomhf: model.get('form.mental_health_facility'),
          mh_tpn: model.get('form.psuchiatrist_name'),
          mh_mhcm: model.get('form.mental_case_manager'),
          mh_pdip21d: model.get('form.psych_disch_21_days'),
          mh_crms: model.get('form.mh_services'),
          mh_amhi: model.get('form.additional_mental_health_info'),
          pdad_wart: model.get('form.rejected_past_treatment'),
          pdad_hrpt: model.get('form.accept_residential_tx'),
          pdad_lddo: model.get('form.daf_detox_outcome'),
          pdad_lsad: model.get('form.living_status_after_detox'),
          hi_chhi: model.get('form.has_health_insurance'),
          os_oca17ol: model.get('form.no_children_17_less'),
          d_rtqd: model.get('form.rtq_disposition'),

          form_status: 'started'
        };

        this.ajax({
          id: 'emergency',
          data
        }).then((response) => {
          model.set('form.id', response.id);
          model.set('form_status', 'pending');

          this.set('assessments.cache', false);
        }).catch(Ember.K);
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(2);
      }
    }
  }
});
