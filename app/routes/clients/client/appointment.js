import Ember from 'ember';
import BreadCrumb from 'mdr/models/bread-crumb';

const {
  Route
} = Ember;

export default Route.extend({
  afterModel(model) {
    let bread_crumbs;

    bread_crumbs = Ember.A([
      BreadCrumb.create({
        id: 1,
        name: 'Select Patient',
        disabled: false,
        current: true
      }),
      BreadCrumb.create({
        id: 2,
        name: 'Select Doctor'
      }),
      BreadCrumb.create({
        id: 3,
        name: 'Reason for Appointment/Appointment Time'
      }),
      BreadCrumb.create({
        id: 4,
        name: 'Upload Report'
      })
    ]);

    model.set('bread_crumbs', bread_crumbs);
  },

  nextBreadCrump(current) {
    const model         = this.get('controller.model');
    const bread_crumbs  = model.get('bread_crumbs');
    let next            = current;

    if (!model.get('last_bread_crumb')) {
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

  previousBreadCrump(current) {
    const model         = this.get('controller.model');
    const bread_crumbs  = model.get('bread_crumbs');
    let previous        = current;

    if (!model.get('first_bread_crumb')) {
      previous = bread_crumbs.findBy('id', current.get('id') - 1);
    }

    current.set('current', false);
    previous.set('current', true);
  },

  selectPatient(current) {
    this.nextBreadCrump(current);
  },

  selectDoctor() {

  },

  selectReasonTime() {

  },

  selectUpload() {

  },

  actions: {
    onCrumb(bread_crumb) {
      const model   = this.get('controller.model');
      const current = model.get('current_bread_crumb');

      if (bread_crumb.get('disabled') ||
        bread_crumb.get('id') === current.get('id')) {
        return;
      } else {
        current.set('current', false);
        bread_crumb.set('current', true);
      }
    },

    next() {
      const model    = this.get('controller.model');
      const current  = model.get('current_bread_crumb');

      switch(current.get('id')) {
        case 1:
          this.selectPatient(current);
          break;
        case 2:
          this.selectDoctor(current);
          break;
      }
    },

    previous() {
      const model    = this.get('controller.model');
      const current  = model.get('current_bread_crumb');

      this.previousBreadCrump(current);
    }
  }
});
