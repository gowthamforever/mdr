import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({

  actions: {
    toggleChat() {
      const model = this.get('controller');
      model.toggleProperty('isChatMaximized');
    }
  }
});
