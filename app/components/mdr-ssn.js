import Ember from 'ember';
import { retainNumbers } from 'mdr/utility/utils';

const {
  TextField,
  on,
  run
} = Ember;

const {
  scheduleOnce
} = run;

export default TextField.extend({
  maxlength: 11,
  placeholder: 'XXX-XX-XXXX',

  format(value) {
    const format = /^[0-9]{3}[-\s\.]{0,1}[0-9]{2}[-\s\.]{0,1}[0-9]{4}$/;
    let ssn = value;
    let part1;
    let part2;
    let part3;

    if (value && format.test(value)) {
      ssn = retainNumbers(ssn);
      part1 = ssn.substr(0, 3);
      part2 = ssn.substr(3, 2);
      part3 = ssn.substr(5);

      ssn = `${part1}-${part2}-${part3}`;
    }

    return ssn;
  },

  setssn() {
    const format = this.format(this.get('value'));
    this.set('value', format);
  },

  focusOut() {
    this.setssn();
  },

  onInsert: on('didRender', function() {
    scheduleOnce('afterRender', this, 'setssn');
  }),

  keyDown: function(event) {
    this._super(...arguments);
    if (event.keyCode === 13) {
      this.setssn();
    }
  }

});
