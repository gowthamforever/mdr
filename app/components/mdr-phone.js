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
  maxlength: 14,
  placeholder: '(XXX) XX-XXXX',

  format(value) {
    const format = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    let phone = value;
    let part1;
    let part2;
    let part3;

    if (value && format.test(value)) {
      phone = retainNumbers(phone);
      part1 = phone.substr(0, 3);
      part2 = phone.substr(3, 3);
      part3 = phone.substr(6);

      phone = `(${part1}) ${part2}-${part3}`;
    }

    return phone;
  },

  setphone() {
    const format = this.format(this.get('value'));
    this.set('value', format);
  },

  focusOut() {
    this.setphone();
  },

  onInsert: on('didRender', function() {
    scheduleOnce('afterRender', this, 'setphone');
  }),

  keyDown: function(event) {
    this._super(...arguments);
    if (event.keyCode === 13) {
      this.setphone();
    }
  }

});
