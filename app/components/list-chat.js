import Ember from 'ember';
import { prepend } from 'mdr/utility/utils';

const {
  Component,
  on,
  computed,
  run
} = Ember;

const {
  oneWay,
  alias
} = computed;

const {
  later,
  cancel
} = run;

export default Component.extend({
  start_time: oneWay('appointment.ts_added_moment'),
  started: alias('appointment.started'),
  starts_in_next: null,
  timer: null,

  clock() {
    const start_time    = this.get('start_time');
    const current_time  = moment();
    const duration = moment.duration(start_time.diff(current_time));

    this.cancelTimer();
    if (current_time.isSameOrBefore(start_time)) {
      const hours   = prepend(duration.hours());
      const minutes = prepend(duration.minutes());
      const seconds = prepend(duration.seconds());

      this.setProperties({
        starts_in_next: `${hours}:${minutes}:${seconds}`,
        timer: later(this, function() {
          this.clock();
        }, 1000)
      });
    }
  },

  cancelTimer() {
    const timer = this.get('timer');
    if (timer) {
      cancel(this.get('timer'));
    }
    this.set('timer', null);
  },

  calculateRemainingTime: on('didInsertElement', function() {
    if (!this.get('started')) {
      this.clock();
    }
  }),

  clearTimer: on('willDestroyElement', function() {
    this.cancelTimer();
  })

});
