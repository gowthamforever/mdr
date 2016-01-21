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
      if (moment(start_date_time, 'MMM DD YYYY hh:ss A', true).isValid()) {
        return start_date_time;
      }
    }
  }),
  end_date_time: computed('end_date', 'end_time', function() {
    const end_date  = this.get('end_date');
    const end_time  = this.get('end_time');
    let end_date_time;
    if (end_date && end_time) {
      end_date_time = `${end_date} ${end_time}`;
      if (moment(end_date_time, 'MMM DD YYYY hh:ss A', true).isValid()) {
        return end_date_time;
      }
    }
  }),
  status: null,
  pending: equal('status', 'pending'),
  accepted: equal('status', 'accepted'),
  rejected: equal('status', 'rejected')
});
