import Ember from 'ember';
import RtqForm from 'mdr/models/rtq-form';
import Api from 'mdr/mixins/api';

const {
  Route,
  RSVP,
  inject
} = Ember;

const {
  hash,
  Promise
} = RSVP;

const {
  service
} = inject;

export default Route.extend(Api, {
  contact: service(),

  getContact() {
    return new Promise((resolve) => {
      this.ajax({
        id: 'contact'
      }).then((response) => {
        resolve(response);
      });
    });
  },

  getRtq(model) {
    return new Promise((resolve) => {
      this.ajax({
        id: 'getemergency',
        path: {
          id: model.get('id')
        },
      }).then((response) => {
        resolve({
          customer_id: response.customer_id,
          agency_staff_id: response.agency_staff_id,
          assessor_id: response.assessor_id,
          agency_admin_id: response.agency_admin_id,
          first_name: response.customer.first_name,
          last_name: response.customer.last_name,
          address: response.ca_a,
          city: response.ca_c,
          zip: response.ca_z,
          phone1: response.ca_ppn,
          phone2: response.ca_spn,
          gender: response.customer.gender,
          race: response.customer.race,
          state: response.ca_s,
          ethnicity: response.d_e,
          ssn: response.d_ssn,
          staff_completing_rtq: response.ra_scr,
          nurse_staff_completing_rtq: response.rca_scr,
          referral_source: response.ra_rs,
          referral_reason: response.ra_rfr,
          marchman_court_referral: response.ra_rmac,
          drug_court_referral: response.ra_rbdc,
          child_welfare_referral: response.ra_dcwr,
          client_signed: response.ra_cssil,
          transport_source: response.ra_tsa,
          transport_person: response.ra_tpn,
          living_status: response.ra_cls,
          precipitating_factor: response.ra_pf,
          primary_drug_used: response.cdu_pdu,
          secondary_drug_used: response.cdu_sdu,
          teritary_drug_used: response.cdu_tdu,
          fourth_drug_used: response.cdu_fdu,
          other_drug_used: response.cdu_odu,
          no_detox_admissions: response.wm_opda,
          alcohol_berthalyzer_test: response.bbm_abt,
          drug_test: response.bbm_dt,
          systolic: response.bbm_ss,
          diastolic: response.bbm_ds,
          temperature: response.bbm_t,
          pulse: response.bbm_p,
          non_ambulatory: response.bbm_cina,
          current_medications: response.bbm_cm,
          pregnant: response.bbm_cp,
          health_status: response.bbm_chs,
          developmentl_disablities: response.bbm_dd,
          physical_disablities: response.bbm_pd,
          visual_disablities: response.bbm_vd,
          hearing_disablities: response.bbm_hd,
          medical_complaints: response.bbm_cmc,
          physical_meds: response.mh_pmct,
          reason_mental_health: response.mh_rmha,
          mental_health_facility: response.mh_nomhf,
          psuchiatrist_name: response.mh_tpn,
          mental_case_manager: response.mh_mhcm,
          psych_disch_21_days: response.mh_pdip21d,
          mh_services: response.mh_crms,
          additional_mental_health_info: response.mh_amhi,
          rejected_past_treatment: response.pdad_wart,
          accept_residential_tx: response.pdad_hrpt,
          daf_detox_outcome: response.pdad_lddo,
          living_status_after_detox: response.pdad_lsad,
          has_health_insurance: response.hi_chhi,
          no_children_17_less: response.os_oca17ol,
          rtq_disposition: response.d_rtqd,
          nurse_drug_use_status: response.rdus_rdus,
          nurse_alcohol_test: response.rdus_atr,
          nurse_drug_detoxing_from: response.rdus_dcdf,
          nurse_systolic: response.ema_ss,
          nurse_diastolic: response.ema_ds,
          nurse_temperature: response.ema_t,
          nurse_pulse: response.ema_p,
          nurse_ciwa_score: response.rca_cs,
          nurse_non_ambulatory: response.om_ica,
          nurse_open_wounds: response.om_aow,
          nurse_current_medications: response.om_cm,
          nurse_pregnant: response.om_cp,
          nurse_health_status: response.om_chs,
          nurse_developmentl_disablities: response.om_dd,
          nurse_physical_disablities: response.om_pd,
          nurse_medical_complaints: response.om_cmc,
          nurse_rtq_disposition: response.nd_nrd,
          nurse_disposition: response.psad,
          dob: response.customer.dob,
          ts_request: response.ts_request,
          rtq_date: moment(response.ra_rpo, 'MM-DD-YYYY HH:mm').format('MMM DD YYYY'),
          rtq_time:moment(response.ra_rpo, 'MM-DD-YYYY HH:mm').format('hh:mm A'),
          client_arrival: moment(response.ra_dtoca, 'MM-DD-YYYY HH:mm').format('MMM DD YYYY'),
          client_arrival_time: moment(response.ra_dtoca, 'MM-DD-YYYY HH:mm').format('hh:mm A'),
          last_detox_admission: moment(response.wm_lda, 'YYYY-MM-DD').format('MMM DD YYYY'),
          last_alcohol_withdrawal: moment(response.wm_ladw, 'YYYY-MM-DD').format('MMM DD YYYY'),
          last_drug_withdrawal: moment(response.wm_ladws, 'YYYY-MM-DD').format('MMM DD YYYY'),
          last_daf_program: moment(response.wm_ltadp, 'YYYY-MM-DD').format('MMM DD YYYY'),
          last_admit_sa_tx: moment(response.wm_latast, 'YYYY-MM-DD').format('MMM DD YYYY'),
          last_suicide_attempt: moment(response.mh_lsa, 'YYYY-MM-DD').format('MMM DD YYYY'),
          last_admit_mental_health: moment(response.mh_latmhc, 'YYYY-MM-DD').format('MMM DD YYYY'),
          blood_pressure_date: moment(response.bbm_bpd, 'MM-DD-YYYY HH:mm').format('MMM DD YYYY'),
          blood_pressure_time: moment(response.bbm_bpd, 'MM-DD-YYYY HH:mm').format('hh:mm A'),
          last_admit_mental_health_center: moment(response.mh_latmhc, 'YYYY-MM-DD').format('MMM DD YYYY'),
          nurse_blood_pressure_date: response.ema_bpd ? moment(response.ema_bpd, 'MM-DD-YYYY HH:mm').format('MMM DD YYYY') : undefined,
          nurse_blood_pressure_time: response.ema_bpd ? moment(response.ema_bpd, 'MM-DD-YYYY HH:mm').format('hh:mm A') : undefined,
          nurse_blood_pressure: response.ema_bpd ? moment(response.ema_bpd, 'MM-DD-YYYY HH:mm').format('hh:mm A') : undefined,
          nurse_rtq_date: response.rca_rpo ? moment(response.rca_rpo, 'MM-DD-YYYY HH:mm').format('MMM DD YYYY') : moment().format('MMM DD YYYY'),
          nurse_rtq_time: response.rca_rpo ? moment(response.rca_rpo, 'MM-DD-YYYY HH:mm').format('hh:mm A') : moment().format('hh:mm A')
        });
      });
    });
  },

  afterModel(model) {
    const promises = {
      contact: this.getContact()
    };

    if (model.get('id') !== 'new') {
      promises.form = this.getRtq(model);
    }

    model.set('form', RtqForm.create());

    return new Promise((resolve) => {
      hash(promises).then((promises) => {
        const { contact, form } = promises;

        if (model.get('form_status') !== 'started' && model.get('form_status') !== 'completed') {
          if (this.get('session.role_staff')) {
            model.set('form.staff', this.get('contact').createStaff(contact));
          } else if (this.get('session.role_admin') || this.get('session.role_super_admin') || this.get('session.role_global_admin') || this.get('session.role_regional_admin')) {
            model.set('form.staff', this.get('contact').createAdmin(contact));
          }
        }

        if (model.get('form_status') === 'started') {
          if (this.get('session.role_nurse')) {
            model.set('form.nurse', this.get('contact').createAssessor(contact));
          }
        }

        model.get('form').setProperties(form);

        resolve();
      });
    });
  }
});
