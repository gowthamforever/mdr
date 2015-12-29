import Ember from "ember";

const { Helper } = Ember;

export default Helper.helper(function(params) {
  const leftSide = params[0];
  const rightSide = params[0];
  return leftSide === rightSide;
});
