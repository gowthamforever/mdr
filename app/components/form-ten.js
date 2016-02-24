import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  today: moment(),
  assessment_date: computed('today', function() {
    return this.get('today').format('MMM DD YYYY');
  }),

  actions: {
    next() {
      const page = this.get('page');
      if (page) {
        page(11);
      }
    },

    previous() {
      const page = this.get('page');
      if (page) {
        page(9);
      }
    }
  }
});
