import Ember from 'ember';

const {
  Component,
  on,
  computed
} = Ember;

export default Component.extend({
  subscriberId: computed('elementId', function() {
    return `${this.get('elementId')}-subscriber`;
  }),

  publisherId: computed('elementId', function() {
    return `${this.get('elementId')}-publisher`;
  }),

  initializeSession: on('didInsertElement', function() {
    const self      = this;
    const apiKey    = this.get('apiKey');
    const sessionId = this.get('sessionId');
    const token     = this.get('token');
    const session   = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
      session.subscribe(event.stream, self.get('subscriberId'), {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      });
    });

    session.on('sessionDisconnected', function(event) {
      console.log('You were disconnected from the session.', event.reason);
    });

    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, initialize a publisher and publish to the session
      if (!error) {
        var publisher = OT.initPublisher(self.get('publisherId'), {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        });

        session.publish(publisher);
      } else {
        console.log('There was an error connecting to the session: ', error.code, error.message);
      }
    });
  })
});
