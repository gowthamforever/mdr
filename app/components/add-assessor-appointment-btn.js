import Ember from 'ember';
import Assessor from 'mdr/models/assessor';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'span',
  model: null,
  assessor: computed('model', function() {
    let model = this.get('model');
    if (!model) {
      model = Assessor.create({
        assessor_id: 'all'
      })
    }

    return model;
  })
});
