import Ember from "ember";

const { Helper } = Ember;

export default Helper.helper(function([value, increment=1]) {
  return value + increment;
});
