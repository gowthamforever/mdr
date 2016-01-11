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
  dialog: service(),

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

  selectVerify(current) {
    this.nextBreadCrump(current);
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
        if (current.get('id') === 4) {
          current.set('disabled', true);
        }
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
          this.selectVerify(current);
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
      data.ts_request = formatToServer(model.get('start_date_time'));
      data.ts_request_endtime = formatToServer(model.get('end_date_time'));
      data.status = 'pending';

      service.postAppointment(data).then(() => {
        self.get('appointments').set('cache', false);
        self.send('refresh');
        self.set('model.created', true);
      });
    }
  }
});
