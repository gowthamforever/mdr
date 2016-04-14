import Ember from 'ember';

const {
  computed,
  Component
} = Ember;

const {
  alias
} = computed;

export default Component.extend({
  tagName: 'span',
  classNames: ['help-block', 'field-error'],
  classNameBindings: ['field.hasError::hide'],
  error: alias('field.error')
});
