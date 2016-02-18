import Ember from 'ember';
import { prepend } from 'mdr/utility/utils';

const {
  Object: EmberObject,
  computed
} = Ember;

export default EmberObject.extend({
  date: null,
  start: null,
  end: null,
  start_hour: computed('start', function() {
    const start = this.get('start');
    return Math.trunc(start/60);
  }),
  start_min: computed('start', function() {
    const start = this.get('start');
    return start % 60;
  }),
  end_hour: computed('end', function() {
    const end = this.get('end');
    return Math.trunc(end/60);
  }),
  end_min: computed('end', function() {
    const end = this.get('end');
    return end % 60;
  }),
  start_time: computed('start_hour', 'start_min', function() {
    let start_hour = this.get('start_hour');
    let start_min  = this.get('start_min');
    let start_result;

    const toStr = (hour, min) => {
      const am_pm = hour > 12 ? hour % 12 : hour;
      let result  = am_pm === 0 ? '12' : prepend(am_pm);
      result += `:${prepend(min)}`;

      if (hour == 24) {
        result += ' AM';
      } else if (hour >= 12) {
        result += ' PM';
      } else {
        result += ' AM';
      }

      return result;
    };

    start_result = toStr(start_hour, start_min);

    return start_result;
  }),
  end_time: computed('start_hour', 'start_min', function() {
    let end_hour   = this.get('end_hour');
    let end_min    = this.get('end_min');
    let end_result;

    const toStr = (hour, min) => {
      const am_pm = hour > 12 ? hour % 12 : hour;
      let result  = am_pm === 0 ? '12' : prepend(am_pm);
      result += `:${prepend(min)}`;

      if (hour == 24) {
        result += ' AM';
      } else if (hour >= 12) {
        result += ' PM';
      } else {
        result += ' AM';
      }

      return result;
    };

    end_result = toStr(end_hour, end_min);

    return end_result;
  }),
  start_date_time: computed('start_date_time_moment', function() {
    return moment(this.get('start_date_time_moment')).format('MMM DD YYYY hh:mm A');
  }),
  end_date_time: computed('end_date_time_moment', function() {
    return moment(this.get('end_date_time_moment')).format('MMM DD YYYY hh:mm A');
  }),
  start_date_time_moment: computed('date', 'start_time', function() {
    let date = this.get('date');
    let time = this.get('start_time');

    if (time === '12:00 AM') {
      return moment(date, 'MMM DD YYYY', true).add(1, 'days');
    } else {
      return moment(`${date} ${time}`, 'MMM DD YYYY hh:mm A', true);
    }
  }),
  end_date_time_moment: computed('date', 'end_time', function() {
    let date = this.get('date');
    let time = this.get('end_time');

    if (time === '12:00 AM') {
      return moment(date, 'MMM DD YYYY', true).add(1, 'days');
    } else {
      return moment(`${date} ${time}`, 'MMM DD YYYY hh:mm A', true);
    }
  }),
  start_end: computed('start_time', 'end_time', function() {
    return `${this.get('start_time')} to ${this.get('end_time')}`;
  })
});
