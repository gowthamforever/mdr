import Ember from 'ember';

const {
  Component,
  get,
  set,
  isEmpty,
  on,
  computed
} = Ember;

const {
  oneWay
} = computed;

export default Component.extend({
  tagName: 'section',
  selected: null,
  filtered: oneWay('model.doctors'),

  initFiltered: on('didInitAttrs', function() {
    const selected = this.get('selected');
    if (selected) {
      set(this, 'filtered', Ember.A([selected]));
    }
  }),

  actions: {
    filter() {
      const model     = this.get('model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const doctors   = model.get('doctors');

      if (!isEmpty(doctors)) {
        set(this, 'filtered', doctors.filter((doctor) =>
          get(doctor, 'first_name').indexOf(firstName) !== -1 ||
          get(doctor, 'last_name').indexOf(lastName) !== -1));
      }
    },

    select(doctor) {
      const model     = this.get('model');
      const doctors   = model.get('doctors');
      const selected = this.get('selected');
      if (!selected) {
        this.set('selected', doctor);
        set(this, 'filtered', Ember.A([doctor]));
      } else {
        this.set('selected', null);
        set(this, 'filtered', Ember.A(doctors));
      }
    }
  }
});
