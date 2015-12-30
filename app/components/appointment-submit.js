import Ember from 'ember';
import EmberValidator from 'ember-validator';

const {
  Component
} = Ember;

export default Component.extend(EmberValidator, {
  tagName: 'section',

  actions: {
    finish() {
      const submit = this.attrs.submit;
      submit();
    }
  }
});
