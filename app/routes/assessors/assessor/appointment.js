import Ember from 'ember';
import Appointment from 'mdr/models/appointment';
import BreadCrumb from 'mdr/models/bread-crumb';
import Clients from 'mdr/models/clients';
import Assessor from 'mdr/models/assessor';
import Assessors from 'mdr/models/assessors';

const {
  Route,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  clients: service(),

  afterModel(model) {
    const self        = this;
    const appointment = Appointment.create();
    const assessor      = Assessor.create();
    const clients     = Clients.create();
    const assessors     = Assessors.create();
    let bread_crumbs;

    assessor.setProperties(_.pick(model, [
      'assessor_id',
      'first_name',
      'last_name',
      'service_charge'
    ]));

    assessors.set('assessors', Ember.A([assessor]));
    clients.set('clients', self.get('clients.clients'));

    bread_crumbs = Ember.A([
      BreadCrumb.create({
        id: 1,
        name: 'Select Assessor',
        disabled: false,
        current: true,
        model: assessors
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
