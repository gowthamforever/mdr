import Ember from 'ember';
import Appointments from 'mdr/models/appointments';

const {
  Component,
  inject,
  on
} = Ember;

const {
  service
} = inject;

export default Component.extend({
  session: service(),

  tagName: 'aside',
  classNames: ['side-nav', 'col-md-2', 'col-xs-1', 'col-sm-1'],

  initAppointments: on('didInitAttrs', function() {
    this.set('appointments', Appointments.create({
      date: moment().format('MMDDYYYY')
    }));
  })
});
