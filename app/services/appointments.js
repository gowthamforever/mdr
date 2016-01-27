import Ember from 'ember';
import Appointment from 'mdr/models/appointment';
import Api from 'mdr/mixins/api';

const {
  Service,
  isEmpty,
  inject,
  RSVP
} = Ember;

const {
  Promise
} = RSVP;

const { service } = inject;

export default Service.extend(Api, {
  clients: service(),
  doctors: service(),
  appointments: null,
  cache: false,

  getAppointments() {
    const self = this;
    return new Promise((resolve) => {
      if (self.get('cache')) {
        resolve(self.get('appointments'));
      } else {
        self.ajax({
          id: 'appointments'
        }).then((response) => {
          self.setProperties({
            appointments: self.createAppointments(response),
            cache: true
          });
          resolve(self.get('appointments'));
        }).catch(() => {
          resolve();
        });
      }
    });
  },

  postAppointment(data) {
    const self = this;
    return new Promise((resolve) => {
      self.ajax({
        id: 'addappointment',
        data
      }).then(() => {
        resolve();
      }).catch(() => {
      });
    });
  },

  createAppointments(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.createAppointment(item)));
    }

    return result;
  },

  createAppointment(response) {
    const data = [
      'alt_info',
      'customer_id',
      'doctor_id',
      'id',
      'insurance_plan',
      'reason',
      'service_charge',
      'status',
      'ts_request',
      'ts_request_endtime'
    ];
    let result = Appointment.create(_.pick(response, data));

    if (response.customer) {
      result.set('customer', this.get('clients').createClient(response.customer));
    }

    if (response.doctor) {
      result.set('doctor', this.get('doctors').createDoctor(response.doctor));
    }

    return result;
  }
});
