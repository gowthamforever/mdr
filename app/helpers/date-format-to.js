import Ember from "ember";

const { Helper } = Ember;

export default Helper.helper(function(params) {
  const value = params[0];
  const to    = params[1] || 'MMM DD YYYY';
  let result;

  if (!value) {
    return;
  }

  return moment(value).format(to);
});
