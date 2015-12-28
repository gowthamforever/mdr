import Ember from "ember";

const { Helper } = Ember;

export default Helper.helper(function([value, from='YYYY-MM-DD', to='MMM DD YYYY']) {
  return moment(value, from, true).format(to);
});
