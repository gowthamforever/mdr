import Ember from "ember";
import { retainNumbers } from 'mdr/utility/utils';

const { Helper } = Ember;

export default Helper.helper(function(params) {
  let value = params[0];
  let part1;
  let part2;
  let part3;

  if (value) {
    value = retainNumbers(value);
    if (value.length === 10) {
      part1 = value.substr(0, 3);
      part2 = value.substr(3, 3);
      part3 = value.substr(6);
      value = `(${part1}) ${part2}-${part3}`;
    }
    return value;
  } else {
    return Ember.String.htmlSafe('&ndash;');
  }
});
