import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend({
  session: service(),

  tagName: 'aside',
  classNames: ['side-nav', 'col-md-2', 'col-xs-1', 'col-sm-1']
});
