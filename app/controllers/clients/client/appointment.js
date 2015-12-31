import Ember from 'ember';
import { formatToServer } from 'mdr/utility/utils';

const {
  Controller,
  inject
} = Ember;

const {
  service
} = inject;

export default Controller.extend({
  appointments: service(),

  nextBreadCrump(current) {
    const appointment   = this.get('model.appointment');
    const bread_crumbs  = appointment.get('bread_crumbs');
    let next            = current;

    if (!appointment.get('last_bread_crumb')) {
      next = bread_crumbs.findBy('id', current.get('id') + 1);
    }

    current.setProperties({
      current: false,
      selected: true,
      disabled: false
    });

    next.setProperties({
      disabled: false,
      current: true
    });
  },

  selectPatient(current) {
    this.nextBreadCrump(current);
  },

  selectDoctor(current) {
    this.nextBreadCrump(current);
  },

  selectReasonTime(current) {
    this.nextBreadCrump(current);
  },

  selectUpload() {

  },

  actions: {
    onCrumb(bread_crumb) {
      const appointment = this.get('model.appointment');
      const current     = appointment.get('current_bread_crumb');

      if (bread_crumb.get('disabled') ||
        bread_crumb.get('id') === current.get('id')) {
        return;
      } else {
        current.set('current', false);
        bread_crumb.set('current', true);
      }
    },

    next() {
      const appointment = this.get('model.appointment');
      const current     = appointment.get('current_bread_crumb');

      switch(current.get('id')) {
        case 1:
          this.selectPatient(current);
          break;
        case 2:
          this.selectDoctor(current);
          break;
        case 3:
          this.selectReasonTime(current);
          break;
        case 4:
          this.selectReasonTime(current);
          break;
      }
    },

    submit() {
      const self    = this;
      const model   = self.get('model.appointment');
      const service = self.get('appointments');
      const client  = model.get('selected_client');
      const doctor  = model.get('selected_doctor');
      const data    = {};

      data.customer_id = client.get('customer_id');
      data.insurance_plan = client.get('insurance_plan');
      data.doctor_id = doctor.get('doctor_id');
      data.service_charge = doctor.get('service_charge');
      data.reason = model.get('reason');
      data.alt_info = model.get('alt_info');
      data.start_date_time = formatToServer(model.get('start_date_time'));
      data.end_date_time = formatToServer(model.get('end_date_time'));

      service.postAppointment(data).then(() => {
        self.get('appointments').set('cache', false);
        self.transitionToRoute('appointments.requests');
      });
    }
  }
});
