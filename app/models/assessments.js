import Ember from 'ember';

const {
  Object: EmberObject,
  computed
} = Ember;

const {
  filterBy
} = computed;

export default EmberObject.extend({
  samha_assessments: undefined,

  all_assessments: computed('samha_assessments.[]', function() {
    const samha_assessments = this.get('samha_assessments');
    const assessments       = Ember.A();

    assessments.addObjects(samha_assessments);

    return assessments;
  }),

  form_notstarted: filterBy('all_assessments', 'form_notstarted', true),
  form_started: filterBy('all_assessments', 'form_started', true),
  form_completed: filterBy('all_assessments', 'form_completed', true)
});
