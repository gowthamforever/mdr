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
