import Ember from 'ember';
import Doctors from 'mdr/models/doctors';

const {
  Route
} = Ember;


export default Route.extend({
  model() {
    const enrollments = this.modelFor('admin-tasks');
    return Doctors.create({
      doctors: enrollments.get('doctors')
    });
  }
});
