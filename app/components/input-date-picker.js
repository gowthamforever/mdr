import Ember from 'ember';


const {
  TextField,
  on
} = Ember;

export default TextField.extend({
  format: 'mmm dd yyyy',
  min: null,
  max: new Date(),

  initPickADate: on('didInsertElement', function() {
    const self    = this;
    const max     = self.get('max');
    const min     = self.get('min');
    const change  = self.get('onChange');

    let props  = {
      format: self.get('format'),
      clear: '',
      selectMonths: true,
      selectYears: true,

      onSet: function(context) {
        if (change) {
          change(moment(context.select).format('MMM DD YYYY'));
        }
      }
    };

    if (min) {
      props.min = min;
    }

    if (max) {
      props.max = max;
    }

    Ember.$(`#${this.get('elementId')}`).pickadate(props);
  })
});
