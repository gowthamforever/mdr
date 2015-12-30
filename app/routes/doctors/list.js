import Ember from 'ember';

const {
  Route,
  get,
  set,
  isEmpty
} = Ember;

export default Route.extend({
  actions: {
    filter() {
      const model     = this.get('controller.model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const doctors   = model.get('doctors');

      if (!isEmpty(doctors)) {
        set(model, 'doctors', doctors.filter((doctor) =>
          get(doctor, 'first_name').indexOf(firstName) !== -1 ||
          get(doctor, 'last_name').indexOf(lastName) !== -1));
      }
    },

    toggleStatus() {
      // TODO: Implement Toggle status API
    }
  }
});
