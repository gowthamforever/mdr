import Ember from 'ember';
import Doctors from 'mdr/models/doctors';

const {
  Route,
  RSVP,
  inject,
  isEmpty
} = Ember;

const {
  Promise
} = RSVP;

const {
  service
} = inject;

export default Route.extend({
  doctors: service(),

  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-doctor');
  },

  model() {
    const self = this;
    return new Promise((resolve) => {
      self.get('doctors').getDoctors().then((doctors) => {
        resolve(Doctors.create({
          doctors: doctors.filter((doctor) => doctor.get('available') || doctor.get('inactive'))
        }));
      });
    });
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
  }
});
