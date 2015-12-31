import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  redirect() {
     window.location = document.location.href.replace(location.hash , "" );
  }
});
