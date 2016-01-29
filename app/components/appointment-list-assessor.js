import Ember from 'ember';
import Duration from 'mdr/models/duration';

const {
  Component,
  set,
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

    for (let count = 0; count < 1440 - 1; count = count + duration) {
      durations.push(Duration.create({
        date,
        start: count,
        end: count + duration
      }));
    }

    return durations;
  }),
  selected_duration: computed('durations.[]', function() {
    return this.get('durations.firstObject');
  }),
  tagName: 'section',
  selected: null,
  assessors: oneWay('model.assessors'),
  filtered: computed('all_assessors.[]', 'selected', function() {
    const selected    = this.get('selected');
    const assessors     = this.get('assessors');
    if (selected) {
      return Ember.A([selected]);
    }
    return assessors;
  }),


  actions: {
    select(assessor) {
      const model     = this.get('model');
      const assessors   = model.get('assessors');
      const selected = this.get('selected');
      const appointment = this.get('appointment');
      
      if (!selected) {
        this.set('selected', assessor);
        appointment.set('time_range', this.get('selected_duration'));
        set(this, 'filtered', Ember.A([assessor]));
      } else {
        this.set('selected', null);
        appointment.set('time_range', null);
        set(this, 'filtered', Ember.A(assessors));
      }
    },

    assessor(assessor) {
      this.get('dialog').showDialog({
        name: 'modal-assessor',
        model: assessor
      });
    }
  }
});
