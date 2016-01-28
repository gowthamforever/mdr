import Ember from 'ember';
import BreadCrumb from 'mdr/mixins/bread-crumbs';

const {
  computed
} = Ember;

const {
  equal
} = computed;

export default Ember.Object.extend(BreadCrumb, {
  selected_client: null,
  selected_doctor: null,
  selected_assessor: null,
  bread_crumbs: null,
  max_date: null,
  min_date: new Date(),
  start_date: null,
  start_time: null,
  end_date: null,
  end_time: null,
  reason: null,
  alt_info: null,
  start_date_time: computed('start_date', 'start_time', function() {
    const start_date  = this.get('start_date');
    const start_time  = this.get('start_time');
    let start_date_time;
    if (start_date && start_time) {
      start_date_time = `${start_date} ${start_time}`;
      if (moment(start_date_time, 'MMM DD YYYY hh:mm A', true).isValid()) {
        return start_date_time;
      }
    }
  }),
  start_date_time_moment: computed('start_date_time', function() {
    const start_date_time  = this.get('start_date_time');

    if (start_date_time) {
      return moment(start_date_time, 'MMM DD YYYY hh:mm A', true);
    }
  }),
  end_date_time_moment: computed('start_date_time_moment', 'duration', function() {
    const start_date_time_moment  = model.get('start_date_time_moment');
    const duration                = model.get('duration');
    if (start_date_time_moment && duration) {
      return start_date_time_moment.add(duration.value, 'minutes');
    }
  }),
  end_date_time: computed('end_date_time_moment', function() {
    const end_date_time_moment = model.get('end_date_time_moment');
    if (end_date_time_moment) {
      return end_date_time_moment.format('MMM DD YYYY hh:mm A');
    }
  }),
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
});
