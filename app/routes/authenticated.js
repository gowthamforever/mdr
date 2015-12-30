import Ember from 'ember';
import Api from 'mdr/mixins/api';

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
    this.set('header.showAuthenticatedBlock', true);
  },

  deactivate() {
    this.set('header.showAuthenticatedBlock', false);
  },

  beforeModel() {
    const isAuthenticated = this.get('session.isAuthenticated');

    if (!isAuthenticated) {
      this.transitionTo('welcome');
    }
  },

  afterModel(model) {
    const self     = this;
    const promises = {
      clients: self.get('clients').callClients(),
      doctors: self.get('doctors').callDoctors(),
      assessors: self.get('assessors').callAssessors(),
      appointments: self.get('appointments').callAppointments()
    };

    return hash(promises);
  }
});
