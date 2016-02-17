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

export function retainNumbers(str='') {
  return str.replace(/\D/g, "");
}

export function omitNoValue(data={}) {
  return _.omitBy(data, (d) => {
    return _.isUndefined(d) || _.isNull(d);
  });
}

export function ageCalculator(dob, today) {
  const ybirth = dob.year();
  const mbirth = dob.month() + 1;
  const dbirth = dob.date();

  const ynow = today.year();
  const mnow = today.month() + 1;
  const dnow = today.date();

  let age = 0;

  if (ybirth < ynow) {
    age = ynow - ybirth;
    if (mbirth == mnow) {
      if (dbirth > dnow) {
        age--;
      }
    } else if (mbirth > mnow) {
      age--;
    }
  }

  return age;
}
