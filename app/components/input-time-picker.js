import Ember from 'ember';


const {
  TextField,
  on
} = Ember;

export default TextField.extend({
  initPickADate: on('didInsertElement', function() {
    let props  = {
      clear: '',
      format: 'hh:i A'
    };

    Ember.$(`#${this.get('elementId')}`).pickatime(props);
  })
});
