import Ember from 'ember';
import Api from 'mdr/mixins/api';

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

export default Route.extend(Api, {
  session: service(),
  contact: service(),

  model() {
    const self = this;

    return new Promise((resolve) => {
      self.ajax({
        id: 'contact'
      }).then((response) => {
        if (self.get('session.role_doctor')) {
          resolve(self.get('contact').createDoctor(response));
        } else if (self.get('session.role_assessor')) {
          resolve(self.get('contact').createAssessor(response));
        } else if (self.get('session.role_staff')) {
          resolve(self.get('contact').createStaff(response));
        } else if (self.get('session.role_admin') || self.get('session.role_super_admin') || self.get('session.role_global_admin') || self.get('session.role_regional_admin')) {
          resolve(self.get('contact').createAdmin(response));
        }
      });
    });
  }
});
