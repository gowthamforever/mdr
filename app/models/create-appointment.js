import Ember from 'ember';

const {
  Object: EmberObject,
  computed
} = Ember;

export default EmberObject.extend({
  customer_id: 'all',
  clients: null,
  book_appointment_with: [
    'Doctor',
    'Assessor'
  ],
  selected_appointment_with: 'Doctor',
  selected_client: null,
  start_date: null,
  start_time: null,
  end_date: null,
  end_time: null,
  reason: null,
  alt_info: null,
  max_date: null,
  min_date: new Date(),
  selected_client: null,
  selected_doctor: null,
  selected_assessor: null,
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
    const start_date_time_moment  = this.get('start_date_time_moment');
    const duration                = this.get('duration');
    if (start_date_time_moment && duration) {
      return start_date_time_moment.add(duration.value, 'minutes');
    }
  }),
  end_date_time: computed('end_date_time_moment', function() {
    const end_date_time_moment = this.get('end_date_time_moment');
    if (end_date_time_moment) {
      return end_date_time_moment.format('MMM DD YYYY hh:mm A');
    }
  }),
});
