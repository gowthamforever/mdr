import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  tagName: 'span',
  classNames: ['btn', 'btn-file'],
  text: 'Browse',

  actions: {
    fileChange(files, event) {
      const onChange  = this.attrs.onChange;
      let fileName;
      if (files && files.length > 1 ) {
        fileName = `${files.length} files selected`;
      } else {
        fileName = event.target.value.split('\\').pop();
      }

      this.set('text', fileName);

      if (onChange) {
        onChange(files, event);
      }
    }
  }
});
