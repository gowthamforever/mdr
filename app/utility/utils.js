import Ember from 'ember';

export function animateTo(options = {}) {
  let { position, duration, offset, selector, element } = options;
  let jqPosition;

  if (selector) {
    jqPosition = Ember.$(`#${selector}`).position();
    jqPosition = jqPosition || Ember.$(`.${selector}`).position();
    position = jqPosition ? jqPosition.top : 0;
  }

  if (element) {
    jqPosition = element.position(); 
    position = jqPosition ? jqPosition.top : 0;
  }

  if (offset) {
    position += offset;
  }

  Ember.$('html, body').animate({
    scrollTop: position || 0
  }, duration || 'fast');
}

export function formatToServer(date) {
  return moment(date, 'MMM DD YYYY hh:mm A', true).format('MM-DD-YYYY HH:mm');
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

export function scrollTop(val=0) {
  window.scroll(0, val);
}

export function prepend(value='', text=0, length=2) {
  let result = value.toString();
  while (result.length < length) {
    result = text + result;
  }

  return result;
}
