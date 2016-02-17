import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const {
  Object: EmberObject,
  computed
} = Ember;

const {
  alias
} = computed;

export default EmberObject.extend({
  customer_id: 'all',
  clients: null,
  book_appointment_with: [
    'Doctor',
    'Assessor'
  ],
  specialities: Constants.DOCTOR_SPECAILITIES,
  selected_speciality: null,
  selected_appointment_with: 'Doctor',
  selected_client: null,
  selected_doctor: null,
  selected_assessor: null,
  start_date: null,
  reason: null,
  alt_info: null,
  today_date: new Date(),
  max_date: null,
  min_date: computed('today_date', function() {
    const today_date = moment();
    const max_hour   = Constants.APPOINTMENT_MINS.MAX_HOUR;
    let max_date     = moment().hour(max_hour - 1).minute(0).second(0);
    if (today_date.isAfter(max_date)) {
      today_date.add(1, 'days');
    }
    return today_date.toDate();
  }),
  time_range: null,
  start_date_time: alias('time_range.start_date_time'),
  start_date_time_moment: alias('time_range.start_date_time_moment'),
  end_date_time_moment: alias('time_range.start_date_time_moment'),
  end_date_time: alias('time_range.end_date_time')
});
