import Ember from 'ember';
import TableHeading from 'mdr/models/table-heading';

const {
  Route,
  RSVP,
  inject
} = Ember;

const {
  Promise
} = RSVP;

const {
  service
} = inject;

export default Route.extend({
  assessments: service(),

  activate() {
    this._super(...arguments);
    if (!this.get('session.role_nurse')) {
      this.get('titlebar').set('right_content', 'create-form');
    }
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
  },

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('assessments').getAssessments().then((assessments) => {
        resolve(assessments);
      });
    });
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('headings', [
      TableHeading.create({
        name: 'Form Name',
        property: 'form_name'
      }),
      TableHeading.create({
        name: 'Client Name',
        property: 'customer_name'
      }),
      TableHeading.create({
        name: 'Status',
        property: 'form_status'
      }),
      TableHeading.create({
        name: 'Date',
        property: 'ts_request_date'
      }),
    ]);
  }
});
