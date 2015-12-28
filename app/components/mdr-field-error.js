import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

const {
  alias,
  or
} = computed;

export default Component.extend({
  tagName: 'small',
  classNames: ['text-danger'],
  classNameBindings: ['hasError:show:hide'],
  server: null,
  client: null,
  hasServerError: alias('server.hasError'),
  hasClientError: alias('client.hasError'),
  hasError: or('hasClientError', 'hasClientError'),
  serverError: alias('server.error'),
  clientError: alias('client.error'),
  error: computed('serverError', 'clientError', {
    get() {
      return this.get('clientError') || this.get('serverError');
    }
  })
});
