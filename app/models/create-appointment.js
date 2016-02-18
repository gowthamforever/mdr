import Ember from 'ember';
import Constants from 'mdr/utility/constants';
import Duration from 'mdr/models/duration';

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
  duration: null,
  today_date: new Date(),
  max_date: null,
  min_date: computed('today_date', function() {
    const today_date = moment();
    const max_hour   = Constants.APPOINTMENT_MINS.MAX_HOUR;
    let max_date     = moment().hour(max_hour).minute(0).second(0);
    if (today_date.isAfter(max_date)) {
      today_date.add(1, 'days');
    }
    return today_date.toDate();
  }),
  start_date_with_duration: computed('start_date', 'duration', 'today_date', function() {
    const today_date = moment();
    let start_date = this.get('start_date');
    let duration   = this.get('duration');

    if (start_date && duration) {
      start_date = moment(start_date, 'MMM DD YYYY', true)
        .hour(today_date.hour())
        .minute(today_date.minute())
        .second(today_date.second())
        .add(duration.value, 'minutes');
      return start_date;
    }
  }),
  max_appointment_time: computed('today_date', function() {
    return moment().hour(Constants.APPOINTMENT_MINS.MAX_HOUR).minute(0).second(0);
  }),
  time_range: null,
  start_date_time: alias('time_range.start_date_time'),
  start_date_time_moment: alias('time_range.start_date_time_moment'),
  end_date_time_moment: alias('time_range.start_date_time_moment'),
  end_date_time: alias('time_range.end_date_time'),

  start_date_moment: computed('start_date', function() {
    const date = this.get('start_date');
    if (date) {
      return moment(date, 'MMM DD YYYY', true);
    }
  }),

  durations: computed('duration', 'start_date', 'start_date_moment', function() {
    const duration  = this.get('duration.value');
    const date      = this.get('start_date');
    const date_mom  = this.get('start_date_moment');
    const today     = moment();
    const durations = Ember.A();
    let duration_obj;
    let start_date_time_moment;
    let start;
    let end;

    date_mom.hour(today.hour()).minute(today.minute()).second(today.second());

    for (let count = Constants.APPOINTMENT_MINS.MIN; count < Constants.APPOINTMENT_MINS.MAX - 1; count = count + duration) {
      start = count;
      end = count + duration;

      if (end <= Constants.APPOINTMENT_MINS.MAX) {
        duration_obj = Duration.create({
          date,
          start: count,
          end: count + duration
        });
        start_date_time_moment = duration_obj.get('start_date_time_moment');

        if (today.year() === date_mom.year() &&
          today.month() === date_mom.month() &&
          today.date() === date_mom.date()) {
          if (duration_obj.get('start_date_time_moment').isAfter(date_mom)) {
            durations.push(duration_obj);
          }
        } else {
          durations.push(duration_obj);
        }
      }
    }

    return durations;
  }),
});
