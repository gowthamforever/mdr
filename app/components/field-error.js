import Ember from 'ember';
import {
  computed,
  Component
} = Ember;

import {
  alias
} = computed;

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['help-block', 'field-error'],
  classNameBindings: ['field.hasError::hide'],
  error: alias('field.error')
});
