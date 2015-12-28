import Ember from 'ember';
import Constants from 'mdr/utility/constants';

export default Ember.Object.extend({
  statuses: Constants.REQUEST_STATUSES,
  status: Constants.REQUEST_STATUSES[0],
  appointments: null
});
