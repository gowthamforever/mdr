import Ember from "ember";

const { Helper } = Ember;

export default Helper.helper(function(params) {
  const value = params[0];
  const from  = params[1] || 'YYYY-MM-DD';
  const to    = params[2] || 'MMM DD YYYY';
  return moment(value, from, true).format(to);
});
