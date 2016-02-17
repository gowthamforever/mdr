import Ember from 'ember';
import Duration from 'mdr/models/duration';
import Constants from 'mdr/utility/constants';
import { animateTo } from 'mdr/utility/utils';

const {
  Component,
  computed,
  inject
} = Ember;

const {
  oneWay,
  alias
} = computed;

const {
  service
} = inject;

export default Component.extend({
  dialog: service(),
  appointment: null,
  duration: alias('appointment.duration'),
  date: alias('appointment.start_date'),
  date_moment: computed('date', function() {
    const date = this.get('date');
    if (date) {
      return moment(date, 'MMM DD YYYY', true);
    }
  }),
  durations: computed('duration', 'date', 'date_moment', function() {
    const duration  = this.get('duration.value');
    const date      = this.get('date');
    const date_mom  = this.get('date_moment');
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
  selected_duration: computed('durations.[]', function() {
    return this.get('durations.firstObject');
  }),
  tagName: 'section',
  selected: null,
  doctors: oneWay('model.doctors'),
  filtered: computed('doctors.[]', 'selected', function() {
    const selected    = this.get('selected');
    const doctors     = this.get('doctors');
    if (selected) {
      return Ember.A([selected]);
    }
    return doctors;
  }),


  actions: {
    select(doctor) {
      const selected    = this.get('selected');
      const appointment = this.get('appointment');

      if (!selected) {
        this.set('selected', doctor);
        appointment.set('time_range', this.get('selected_duration'));
      } else {
        this.set('selected', null);
        appointment.set('time_range', null);
      }
      animateTo({ element: this.$() });
    },

    doctor(doctor) {
      this.get('dialog').showDialog({
        name: 'modal-doctor',
        model: doctor
      });
    }
  }
});
