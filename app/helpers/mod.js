import Ember from "ember";

const { Helper } = Ember;

export default Helper.helper(function(params, namedArgs) {
  const value = params[0];
  const mod   = namedArgs.by || 2;
  return value % mod;
});
