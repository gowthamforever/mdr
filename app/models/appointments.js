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
  appointments: undefined,
  pending: filterBy('appointments', 'pending', true),
  accepted: filterBy('appointments', 'accepted', true),
  notstarted: filterBy('appointments', 'notstarted', true),
  rejected: filterBy('appointments', 'rejected', true),
  started: filterBy('appointments', 'started_appointment', true),
  completed: filterBy('appointments', 'completed', true)
});
