import Ember from 'ember';
import RtqForm from 'mdr/models/rtq-form';

const {
  Route
} = Ember;

export default Route.extend({
  model() {
    return [
      {
        id: 1,
        name: 'RECEIVING & TRIAGE QUERY ASSESSMENT',
        route: 'assessments.forms.rtq',
        form: RtqForm.create({ id: 'new' })
      }
    ];
  }
});
