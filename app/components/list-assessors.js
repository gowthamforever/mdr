import Ember from 'ember';

const {
  Component,
  isEmpty,
  get,
  set,
  computed
} = Ember;

const {
  oneWay
} = computed;

export default Component.extend({
  tagName: 'section',
  selected: null,
  filtered: oneWay('model.assessors'),

  actions: {
    filter() {
      const model     = this.get('model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const assessors   = model.get('assessors');

      if (!isEmpty(assessors)) {
        set(this, 'filtered', assessors.filter((assessor) => {
          let result = true;
          if (firstName) {
            result = get(assessor, 'first_name').toLowerCase().indexOf(firstName.toLowerCase()) !== -1;
          }
          if (lastName) {
            result = get(assessor, 'last_name').toLowerCase().indexOf(lastName.toLowerCase()) !== -1;
          }
          return result;
        }));
      }
    }
  }
});
