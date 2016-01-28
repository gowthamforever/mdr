import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

const {
  or
} = computed;

export default Component.extend({
  classNames: ['alert', 'alert-danger'],
  classNameBindings: ['hasError:show:hide'],
  validationResult: null,
  hasError: or('validationResult.hasError', 'serverError.errorCode'),
  error: or('validationResult.error', 'serverError.error'),
  message: null
});
