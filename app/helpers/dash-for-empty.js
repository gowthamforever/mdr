import Ember from "ember";

const { Helper } = Ember;

export default Helper.helper(function(params) {
  const value = params[0];
  return value ? value : Ember.String.htmlSafe("&ndash;");
});
