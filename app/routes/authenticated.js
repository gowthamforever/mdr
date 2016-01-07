import Ember from 'ember';
import Api from 'mdr/mixins/api';
import AuthenticatedModel from 'mdr/models/authenticated';

const {
  Route,
  RSVP,
  inject
} = Ember;

const {
  hash,
  Promise
} = RSVP;

const { service } = inject;

export default Route.extend(Api, {
  session: service(),
  header: service(),
  clients: service(),
  doctors: service(),
  assessors: service(),
  appointments: service(),

  activate() {
    this._super(...arguments);
    this.set('header.showAuthenticatedBlock', true);
  },

  deactivate() {
    this._super(...arguments);
    this.set('header.showAuthenticatedBlock', false);
  },

  beforeModel() {
    const isAuthenticated = this.get('session.isAuthenticated');

    if (!isAuthenticated) {
      this.transitionTo('welcome');
    }
  },

  model() {
    const self     = this;
    const session  = self.get('session');
    const promises = {
      clients: self.get('clients').getClients(),
      appointments: self.get('appointments').getAppointments()
    };

    if (session.get('role_admin') || session.get('role_super_admin') ||
      session.get('role_regional_admin') || session.get('role_global_admin')) {
        promises.doctors = self.get('doctors').getDoctors();
        promises.assessors = self.get('assessors').getAssessors();
    }

    return new Promise((resolve) => {
      hash(promises).then((promises) => {
        resolve(AuthenticatedModel.create(_.pick(promises, [
          'clients',
          'appointments',
          'doctors',
          'assessors'
        ])));
      });
    });
  }
});
