import Ember from 'ember';
import Assessors from 'mdr/models/assessors';

const {
  Route
} = Ember;


export default Route.extend({
  model() {
    const enrollments = this.modelFor('admin-tasks');
    return Assessors.create({
      assessors: enrollments.get('assessors')
    });
  }
});
