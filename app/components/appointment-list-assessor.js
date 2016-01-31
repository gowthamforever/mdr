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
  durations: computed('duration', function() {
    const duration  = this.get('duration.value');
    const date      = this.get('date');
    const durations = Ember.A();
    let start;
    let end;

    for (let count = Constants.APPOINTMENT_MINS.MIN; count < Constants.APPOINTMENT_MINS.MAX - 1; count = count + duration) {
      start = count;
      end = count + duration;

      if (end <= Constants.APPOINTMENT_MINS.MAX) {
        durations.push(Duration.create({
          date,
          start: count,
          end: count + duration
        }));
      }
    }

    return durations;
  }),
  selected_duration: computed('durations.[]', function() {
    return this.get('durations.firstObject');
  }),
  tagName: 'section',
  selected: null,
  assessors: oneWay('model.assessors'),
  filtered: computed('assessors.[]', 'selected', function() {
    const selected    = this.get('selected');
    const assessors     = this.get('assessors');
    if (selected) {
      return Ember.A([selected]);
    }
    return assessors;
  }),


  actions: {
    select(assessor) {
      const selected = this.get('selected');
      const appointment = this.get('appointment');

      if (!selected) {
        this.set('selected', assessor);
        appointment.set('time_range', this.get('selected_duration'));
      } else {
        this.set('selected', null);
        appointment.set('time_range', null);
      }
      animateTo({ element: this.$() });
    },

    assessor(assessor) {
      this.get('dialog').showDialog({
        name: 'modal-assessor',
        model: assessor
      });
    }
  }
});
