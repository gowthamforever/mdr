import Ember from 'ember';
// import Appointments from 'mdr/models/appointments';

const {
  Route
} = Ember;

export default Route.extend({
  redirect() {
    /*this.transitionTo('appointments.day', Appointments.create({
      date: moment().format('MMDDYYYY')
    }));*/
    this.transitionTo('appointments.calendar');
  }
});
