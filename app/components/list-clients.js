import Ember from 'ember';

const {
  Component,
  isEmpty,
  get,
  set,
  on,
  computed
} = Ember;

const {
  oneWay
} = computed;

export default Component.extend({
  tagName: 'section',
  selected: null,
  filtered: oneWay('model.clients'),

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
      const clients   = model.get('clients');

      if (!isEmpty(clients)) {
        set(this, 'filtered', clients.filter((client) =>
          get(client, 'first_name').indexOf(firstName) !== -1 ||
          get(client, 'last_name').indexOf(lastName) !== -1));
      }
    },

    select(client) {
      const model     = this.get('model');
      const clients   = model.get('clients');
      const selected = this.get('selected');
      if (!selected) {
        this.set('selected', client);
        set(this, 'filtered', Ember.A([client]));
      } else {
        this.set('selected', null);
        set(this, 'filtered', Ember.A(clients));
      }
    }
  }
});
