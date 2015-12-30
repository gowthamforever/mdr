import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const { computed } = Ember;

const { equal } = computed;

export default Ember.Object.extend({
  alt_info: null,
  customer: null,
  customer_id: null,
  doctor: null,
  doctor_id: null,
  id: null,
  insurance_plan: null,
  reason: null,
  service_charge: null,
  status: null,
  ts_added: null,
  ts_modified: null,
  ts_request: null,
  display_status: computed('status', function() {
    return Constants.REQUEST_STATUSES.findBy('id', this.get('status')).name;
  }),
  accepted: equal('status', Constants.REQUEST_STATUS.ACCEPTED),
  rejected: equal('status', Constants.REQUEST_STATUS.REJECTED),
  pending: equal('status', Constants.REQUEST_STATUS.PENDING),

  bread_crumbs: null,
  current_bread_crumb: computed('bread_crumbs.[]', 'bread_crumbs.@each.current', function() {
    return this.get('bread_crumbs').findBy('current', true);
  }),
  last_bread_crumb: computed('bread_crumbs.[]', 'current_bread_crumb', function() {
    return this.get('current_bread_crumb.id') === this.get('bread_crumbs.length');
  }),
  first_bread_crumb: equal('current_bread_crumb.id', 1)
});
