import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const {
  computed
} = Ember;

const {
  filterBy
} = computed;

export default Ember.Object.extend({
  statuses: Constants.REQUEST_STATUSES,
  status: Constants.REQUEST_STATUSES[0],
  appointments: null,
  pending: filterBy('appointments', 'status', 'pending'),
  accepted: filterBy('appointments', 'status', 'accepted'),
  rejected: filterBy('appointments', 'status', 'rejected')
});
