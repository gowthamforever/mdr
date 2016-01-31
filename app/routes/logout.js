import Ember from 'ember';
import Api from 'mdr/mixins/api';

const { Route } = Ember;

export default Route.extend(Api, {
  model() {
    this.ajax({ data: 'logout' });
  },

  redirect() {
     window.location = document.location.href.replace(location.hash , "" );
  }
});
