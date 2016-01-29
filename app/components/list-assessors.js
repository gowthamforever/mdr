import Ember from 'ember';

const {
  Component,
  isEmpty,
  get,
  set,
  on,
  computed,
  inject
} = Ember;

const {
  oneWay
} = computed;

const {
  service
} = inject;

export default Component.extend({
  dialog: service(),

  tagName: 'section',
  selected: null,
  filtered: oneWay('model.assessors'),

  initFiltered: on('didInitAttrs', function() {
    const selected  = this.get('selected');
    if (selected) {
      set(this, 'filtered', Ember.A([selected]));
    }
  }),

  actions: {
    filter() {
      const model     = this.get('model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const assessors = model.get('assessors');

      if (!isEmpty(assessors)) {
        set(this, 'filtered', assessors.filter((assessor) =>
          get(assessor, 'first_name').indexOf(firstName) !== -1 ||
          get(assessor, 'last_name').indexOf(lastName) !== -1));
      }
    },

    select(assessor) {
      const model     = this.get('model');
      const assessors = model.get('assessors');
      const selected  = this.get('selected');
      if (!selected) {
        this.set('selected', assessor);
        set(this, 'filtered', Ember.A([assessor]));
      } else {
        this.set('selected', null);
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
