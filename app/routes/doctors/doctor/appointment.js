import Ember from 'ember';
import Appointment from 'mdr/models/appointment';
import BreadCrumb from 'mdr/models/bread-crumb';
import Clients from 'mdr/models/clients';
import Doctor from 'mdr/models/doctor';
import Doctors from 'mdr/models/doctors';

const {
  Route,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  clients: service(),
  doctors: service(),

  afterModel(model) {
    const self        = this;
    const appointment = Appointment.create();
    const doctor      = Doctor.create();
    const clients     = Clients.create();
    const doctors     = Doctors.create();
    let bread_crumbs;

    if (model.get('doctor_id') === 'all') {
      doctors.set('doctors', self.get('doctors.doctors'));
    } else {
      doctor.setProperties(_.pick(model, [
        'doctor_id',
        'first_name',
        'last_name',
        'service_charge'
      ]));
      doctors.set('doctors', Ember.A([doctor]));
    }
    clients.set('clients', self.get('clients.clients'));

    bread_crumbs = Ember.A([
      BreadCrumb.create({
        id: 1,
        name: 'Select Doctor',
        disabled: false,
        current: true,
        model: doctors
      }),
      BreadCrumb.create({
        id: 2,
        name: 'Select Patient',
        model: clients
      }),
      BreadCrumb.create({
        id: 3,
        name: 'Reason for Appointment/Appointment Time',
        model: appointment
      }),
      BreadCrumb.create({
        id: 4,
        name: 'Upload Report',
        model: appointment
      })
    ]);

    appointment.set('bread_crumbs', bread_crumbs);
    model.set('appointment', appointment);
  }
});
