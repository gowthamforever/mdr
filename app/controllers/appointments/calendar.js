import Ember from 'ember';
import Appointments from 'mdr/models/appointments';

const {
  Controller
} = Ember;

export default Controller.extend({
  actions: {
    eventRender(event, element) {
      element.find('.fc-content').remove();
      element.find('.fc-event-title').remove();
      element.find('.fc-event-time').remove();
      element.append(`<span class='clickable'>${event.title}</span>`);
    },

    eventClick(event) {
      this.transitionToRoute('appointments.details', event.appointment);
    },

    dayClick(date) {
      this.transitionToRoute('appointments.day', Appointments.create({
        date: moment(date).format('MMDDYYYY')
      }));
    }
  }
});
