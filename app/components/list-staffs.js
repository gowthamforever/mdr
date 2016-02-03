import Ember from 'ember';

const {
  Component,
  get,
  set,
  isEmpty,
  computed
} = Ember;

const {
  oneWay
} = computed;

export default Component.extend({
  tagName: 'section',
  selected: null,
  filtered: oneWay('model.staffs'),

  actions: {
    filter() {
      const model     = this.get('model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const staffs   = model.get('staffs');

      if (!isEmpty(staffs)) {
        set(this, 'filtered', staffs.filter((staff) => {
          let result = true;

          if (firstName) {
            result = get(staff, 'first_name').toLowerCase().indexOf(firstName.toLowerCase()) !== -1;
          }

          if (lastName) {
            result = get(staff, 'last_name').toLowerCase().indexOf(lastName.toLowerCase()) !== -1;
          }

          return result;
        }));
      }
    }
  }
});
