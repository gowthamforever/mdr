import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const {
  computed
} = Ember;

const {
  equal
} = computed;

export default Ember.Object.extend({
  status: undefined,
  form_status: undefined,
  pending: equal('status', Constants.REQUEST_STATUS.PENDING),
  accepted: equal('status', Constants.REQUEST_STATUS.ACCEPTED),
  rejected: equal('status', Constants.REQUEST_STATUS.REJECTED),

  ts_request: undefined,
  ts_request_moment: computed('ts_request', function() {
    return moment(this.get('ts_request'), 'MM-DD-YYYY HH:mm');
  }),
  ts_request_endtime: undefined,
  ts_request_endtime_moment: computed('ts_request_endtime', function() {
    return moment(this.get('ts_request_endtime'), 'MM-DD-YYYY HH:mm');
  }),
  today_date: moment(),
  date_past: computed('ts_request_endtime_moment', 'today_date', function() {
    const end_date = this.get('ts_request_endtime_moment');
    const today_date = moment();
    return end_date.isBefore(today_date);
  }),
  notstarted: computed('form_status', 'accepted', function() {
    const form_status = this.getWithDefault('form_status', Constants.FORM_STATUS.NOT_STARTED);
    return form_status === Constants.FORM_STATUS.NOT_STARTED && this.get('accepted');
  }),
  started_appointment: equal('form_status', Constants.FORM_STATUS.STARTED),
  completed: equal('form_status', Constants.FORM_STATUS.COMPLETED),
  last_updated_page: undefined
});
