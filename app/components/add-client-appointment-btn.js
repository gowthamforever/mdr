import Ember from 'ember';
import Client from 'mdr/models/client';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'span',
  model: null,
  client: computed('model', function() {
    let model = this.get('model');
    if (!model) {
      model = Client.create({
        customer_id: 'all'
      })
    }

    return model;
  })
});
