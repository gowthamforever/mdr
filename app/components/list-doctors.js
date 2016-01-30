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
  filtered: oneWay('model.doctors'),

  actions: {
    filter() {
      const model     = this.get('model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const speciality = model.get('speciality');
      const doctors   = model.get('doctors');

      if (!isEmpty(doctors)) {
        set(this, 'filtered', doctors.filter((doctor) => {
          let result = true;

          if (speciality) {
            result = get(doctor, 'primary_speciality') === speciality.id;
          }

          if (firstName) {
            result = get(doctor, 'first_name').toLowerCase().indexOf(firstName.toLowerCase()) !== -1;
          }

          if (lastName) {
            result = get(doctor, 'last_name').toLowerCase().indexOf(lastName.toLowerCase()) !== -1;
          }

          return result;
        }));
      }
    }
  }
});
