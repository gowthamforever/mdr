import Ember from "ember";

const { Helper } = Ember;

export default Helper.helper(function(params) {
  const value = params[0];
  const from  = params[1] || 'YYYY-MM-DD';
  const to    = params[2] || 'MMM DD YYYY';
  let result;

  if (!value) {
    return;
  }

  // Check date is already in valid format or else format the date.
  if (moment(value, to, true).isValid()) {
    result = value;
  } else {
    return moment(value, from, true).format(to);
  }
});
