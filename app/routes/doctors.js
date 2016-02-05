import Ember from 'ember';
import Doctors from 'mdr/models/doctors';

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
  doctors: service(),

  beforeModel() {
    const session = this.get('session');
    
    if (!(session.get('role_admin') || session.get('role_super_admin') ||
      session.get('role_regional_admin') || session.get('role_global_admin') ||
      session.get('role_staff'))) {
      this.transitionTo('home');
    }
  },

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('doctors').getDoctors().then((doctors) => {
        resolve(Doctors.create({
          doctors
        }));
      });
    });
  }
});
