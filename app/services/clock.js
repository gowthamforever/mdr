import Ember from 'ember';

const {
  Service,
  run
} = Ember;

export default Service.extend({
  tick: null,
  timer: null,

  startTimer() {
    const self  = this;
    let later;

    later = () => {
      this.set('timer', run.later(self, () => {
        self.set('tick', moment().format('hh:mm:ss A'));
        later();
      }, 500));
    };

    later();
  },

  stopTimer() {
    run.cancel(this.get('timer'));
    this.set('timer', null);
  }
});
