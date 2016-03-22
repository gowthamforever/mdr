import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const {
  computed
} = Ember;

const {
  equal
} = computed;

export default Ember.Object.extend({
  form_status: undefined,
  accepted: equal('status', Constants.REQUEST_STATUS.ACCEPTED),

  ts_request: undefined,
  ts_request_moment: computed('ts_request', function() {
    return moment(this.get('ts_request'), 'MM-DD-YYYY HH:mm');
  }),
  ts_request_endtime: undefined,
  ts_request_endtime_moment: computed('ts_request_endtime', function() {
    return moment(this.get('ts_request_endtime'), 'MM-DD-YYYY HH:mm');
  }),

  form_notstarted: computed('form_status', 'accepted', function() {
    const form_status = this.getWithDefault('form_status', Constants.FORM_STATUS.NOT_STARTED);
    return form_status === Constants.FORM_STATUS.NOT_STARTED && this.get('accepted');
  }),
  form_started: equal('form_status', Constants.FORM_STATUS.STARTED),
  form_completed: equal('form_status', Constants.FORM_STATUS.COMPLETED),
  last_updated_page: undefined
});
