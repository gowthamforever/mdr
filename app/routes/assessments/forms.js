import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model() {
    return [
      {
        id: 1,
        name: 'RECEIVING & TRIAGE QUERY ASSESSMENT',
        route: 'assessments.forms.rtq'
      }
    ];
  }
});
