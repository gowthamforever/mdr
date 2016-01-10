import Ember from 'ember';
import Appointment from 'mdr/models/appointment';
import BreadCrumb from 'mdr/models/bread-crumb';
import Clients from 'mdr/models/clients';
import Client from 'mdr/models/client';
import Doctors from 'mdr/models/doctors';

const {
  Route,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  doctors: service(),
  clients: service(),

  afterModel(model) {
    const self        = this;
    const appointment = Appointment.create();
    const client      = Client.create();
    const clients     = Clients.create();
    const doctors     = Doctors.create();
    let bread_crumbs;

    model.setProperties({
      hide_btn_client: true,
      hide_search_client: true,
      show_select_client: false,

      hide_btn_doctor: true,
      hide_search_doctor: false,
      show_select_doctor: true
    });

    if (model.get('customer_id') === 'all') {
      clients.set('clients', self.get('clients.clients'));
      model.setProperties({
        hide_search_client: false,
        show_select_client: true
      });
      appointment.set('selected_client', undefined);
    } else {
      client.setProperties(_.pick(model, [
        'customer_id',
        'first_name',
        'last_name',
        'insurance_plan'
      ]));
      clients.set('clients', Ember.A([client]));
      appointment.set('selected_client', client);
    }

    doctors.set('doctors', self.get('doctors.doctors'));

    bread_crumbs = Ember.A([
      BreadCrumb.create({
        id: 1,
        name: 'Select Patient',
        disabled: false,
        current: true,
        model: clients
      }),
      BreadCrumb.create({
        id: 2,
        name: 'Select Doctor',
        model: doctors
      }),
      BreadCrumb.create({
        id: 3,
        name: 'Reason for Appointment/Appointment Time',
        model: appointment
      }),
      BreadCrumb.create({
        id: 4,
        name: 'Verify & Submit',
        model: appointment
      })
    ]);

    appointment.set('bread_crumbs', bread_crumbs);
    model.set('appointment', appointment);
  },

  actions: {
    refresh() {
      this.refresh();
    }
  }
});
