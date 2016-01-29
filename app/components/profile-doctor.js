import Ember from 'ember';
import Doctor from 'mdr/models/doctor';

const {
  Component,
  on
} = Ember;

export default Component.extend({
  edit_personal: false,
  edit_contact: false,
  edit_work: false,

  personal_open: true,
  contact_open: false,
  work_open: false,

  model: null,

  set_model() {
    const doctor = Doctor.create();

    doctor.setProperties(_.pick(this.get('doctor'), [
      'last_name',
      'first_name',
      'dob',
      'gender',
      'email_id',
      'phone1',
      'phone2',
      'address1',
      'state1',
      'city1',
      'zip1',
      'npi',
      'dea',
      'ein',
      'medicaid_number',
      'medicare_number',
      'surgeon',
      'primary_speciality',
      'practice_type',
      'practice_years',
      'service_charge',
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday_start',
      'monday_start',
      'tuesday_start',
      'wednesday_start',
      'thursday_start',
      'friday_start',
      'saturday_start',
      'sunday_end',
      'monday_end',
      'tuesday_end',
      'wednesday_end',
      'thursday_end',
      'friday_end',
      'saturday_end',
      'treat_male',
      'treat_female',
      'treat_infants',
      'treat_children',
      'treat_adolescents',
      'treat_adults',
      'treat_senior',
      'treat_pregnent',
      'ins_1',
      'ins_2',
      'ins_3',
      'ins_4',
      'ins_5',
      'ins_6',
      'ins_7',
      'ins_8',
      'ins_9',
      'ins_10',
      'ins_11',
      'ins_12',
      'ins_13',
      'ins_14',
      'ins_15'
    ]));

    this.set('model', doctor);
  },

  init_props: on('didInitAttrs', function() {
    this.set_model();
  }),

  actions: {
    togglePersonal() {
      this.set_model();
      this.toggleProperty('edit_personal');
    },

    toggleContact() {
      this.set_model();
      this.toggleProperty('edit_contact');
    },

    toggleWork() {
      this.set_model();
      this.toggleProperty('edit_work');
    },

    openPersonal() {
      this.setProperties({
        personal_open: true,
        contact_open: false,
        work_open: false
      });
    },

    openContact() {
      this.setProperties({
        personal_open: false,
        contact_open: true,
        work_open: false
      });
    },

    openWork() {
      this.setProperties({
        personal_open: false,
        contact_open: false,
        work_open: true
      });
    }
  }
});
