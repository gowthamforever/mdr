import Ember from 'ember';
import { animateTo } from 'mdr/utility/utils';

const {
  Component,
  computed,
  inject,
  isEmpty,
  set,
  get
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
  clients: oneWay('model.clients'),
  filtered: computed('clients.[]', 'selected', function() {
    const selected    = this.get('selected');
    const clients     = this.get('clients');
    if (selected) {
      return Ember.A([selected]);
    }
    return clients;
  }),


  actions: {
    select(client) {
      const selected    = this.get('selected');

      if (!selected) {
        this.set('selected', client);
      } else {
        this.set('selected', null);
      }
      animateTo({ element: this.$() });
    },

    client(client) {
      this.get('dialog').showDialog({
        name: 'modal-client',
        model: client
      });
    },

    filter() {
      const model     = this.get('model');
      const firstName = model.get('firstName');
      const lastName  = model.get('lastName');
      const clients   = model.get('clients');

      if (!isEmpty(clients)) {
        set(this, 'filtered', clients.filter((client) => {
          let result = true;
          if (firstName) {
            result = get(client, 'first_name').toLowerCase().indexOf(firstName.toLowerCase()) !== -1;
          }

          if (lastName) {
            result = get(client, 'last_name').toLowerCase().indexOf(lastName.toLowerCase()) !== -1;
          }

          return result;
        }));
      }
    }
  }
});
