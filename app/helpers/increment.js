import Ember from "ember";

const { Helper } = Ember;

export default Helper.helper(function(params) {
  const value = params[0];
  const increment = params[1] || 1;
  return value + increment;
});
