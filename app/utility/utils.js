import Ember from 'ember';

export function animateTo(options = {}) {
  const { position, duration } = options;
  Ember.$('html, body').animate({ scrollTop: position || 0 }, duration || 'fast');
}

export function formatToServer(date) {
  return moment(date, 'MMM DD YYYY hh:ss A', true).format('MM-DD-YYYY HH:ss');
}

export function toggleScrollBar(show) {
  if (show) {
    Ember.$('body').removeClass('overflow-hidden');
  } else {
    Ember.$('body').addClass('overflow-hidden');
  }
}

export function blurActiveElement() {
  try {
    if (document.activeElement && document.activeElement.nodeName.toLowerCase() !== 'body') {
      document.activeElement.blur();
    }
  } catch(err) {}
}
