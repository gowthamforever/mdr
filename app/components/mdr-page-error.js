import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

const {
  alias
} = computed;

export default Component.extend({
  classNames: ['bs-callout', 'bs-callout-danger'],
  classNameBindings: ['hasError:show:hide'],
  validationResult: null,
  hasError: alias('validationResult.hasError'),
  error: alias('validationResult.error'),
  message: null
});
