import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

const {
  service
} = inject;

export default Controller.extend({
  appointments: service(),

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

  selectUpload() {

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
          this.selectReasonTime(current);
          break;
      }
    },

    submit() {
      this.get('appointments').set('cache', false);
      this.transitionToRoute('appointments.requests');
    }
  }
});
