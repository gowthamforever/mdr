import Ember from 'ember';

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
      this.transitionTo('appointments.details', event.appointment);
    }
  }
});
