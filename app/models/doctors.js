import Ember from 'ember';
import Constants from 'mdr/utility/constants';

export default Ember.Object.extend({
  specialities: Constants.DOCTOR_SPECAILITIES,
  firstName: null,
  lastName: null,
  doctors: null
});
