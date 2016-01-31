import Ember from 'ember';
import Staffs from 'mdr/models/staffs';

const {
  Route
} = Ember;


export default Route.extend({
  model() {
    const enrollments = this.modelFor('admin-tasks');
    return Staffs.create({
      staffs: enrollments.get('staffs')
    });
  }
});
