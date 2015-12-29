import Ember from 'ember';
import Doctor from 'mdr/models/doctor';

const {
  Route
} = Ember;

export default Route.extend({
  model() {
    return Doctor.create();
  }
});
