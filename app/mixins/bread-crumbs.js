import Ember from 'ember';

const {
  Mixin,
  computed
} = Ember;

const { equal } = computed;

export default Mixin.create({
  bread_crumbs: null,
  current_bread_crumb: computed('bread_crumbs.[]', 'bread_crumbs.@each.current', function() {
    return this.get('bread_crumbs').findBy('current', true);
  }),
  last_bread_crumb: computed('bread_crumbs.[]', 'current_bread_crumb', function() {
    return this.get('current_bread_crumb.id') === this.get('bread_crumbs.length');
  }),
  first_bread_crumb: equal('current_bread_crumb.id', 1)
});
