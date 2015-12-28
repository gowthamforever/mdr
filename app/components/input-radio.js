import Ember from 'ember';

const {
  Component,
  computed,
  run
} = Ember;

export default Component.extend({
  tagName: 'input',
  type: 'radio',
  value: null,
  group: null,
  disabled: false,
  name: null,

  attributeBindings:[
    'checked',
    'disabled',
    'value',
    'name',
    'type'
  ],

  changeAction() {
    const onChange = this.attrs.onChange;

    if (onChange) {
      onChange(this.get('value'));
    }
  },

  checked: computed('group', 'value', function() {
    return this.get('group') === this.get('value');
  }).readOnly(),

  change() {
    const value = this.get('value');
    const group = this.get('group');

    if (group !== value) {
      this.set('group', value);
      run.once(this, 'changeAction');
    }
  }
});
