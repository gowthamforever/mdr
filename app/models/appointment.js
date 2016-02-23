import Ember from 'ember';

const {
  computed
} = Ember;

const {
  equal
} = computed;

export default Ember.Object.extend({
  status: null,
  pending: equal('status', 'pending'),
  accepted: equal('status', 'accepted'),
  rejected: equal('status', 'rejected'),
  ts_request: null,
  ts_request_moment: computed('ts_request', function() {
    return moment(this.get('ts_request'), 'MM-DD-YYYY HH:mm');
  }),
  ts_request_endtime: null,
  ts_request_endtime_moment: computed('ts_request_endtime', function() {
    return moment(this.get('ts_request_endtime'), 'MM-DD-YYYY HH:mm');
  }),
  today_date: moment(),
  date_past: computed('ts_request_endtime_moment', 'today_date', function() {
    const end_date = this.get('ts_request_endtime_moment');
    const today_date = moment();
    return end_date.isBefore(today_date);
  }),
  form_status: 'not-started',
  notstarted: equal('form_status', 'not-started'),
  started: equal('form_status', 'started'),
  completed: equal('form_status', 'completed'),
  last_updated_page: undefined
});
