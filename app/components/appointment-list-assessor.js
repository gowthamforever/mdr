import Ember from 'ember';
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
  durations: alias('appointment.durations'),
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
