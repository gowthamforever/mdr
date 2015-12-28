import Ember from 'ember';
import Appointment from 'mdr/models/appointment';

const {
  Service,
  isEmpty,
  inject
} = Ember;

const { service } = inject;

export default Service.extend({
  clients: service(),
  doctors: service(),

  appointments(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.appointment(item)));
    }

    return result;
  },

  appointment(response) {
    const data = [
      'alt_info',
      'customer_id',
      'doctor_id',
      'id',
      'insurance_plan',
      'reason',
      'service_charge',
      'status',
      'ts_added',
      'ts_modified',
      'ts_request',
    ];
    let result = Appointment.create(_.pick(response, data));

    if (response.customer) {
      result.set('customer', this.get('clients').client(response.customer));
    }

    if (response.doctor) {
      result.set('doctor', this.get('doctors').doctor(response.doctor));
    }

    return result;
  }
});
