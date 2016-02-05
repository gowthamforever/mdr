import Ember from 'ember';

const {
  Component,
  on
} = Ember;

export default Component.extend({
  classNames: ['full-calendar'],

  // Event Data
  events: null,

  // General Display
  header: {
    left: 'prev,next today',
    center: 'title'//,
    //right: 'month,basicDay'
  },
  theme: false,
  firstDay: 0,
  isRTL: false,
  weekends: true,
  hiddenDays: [],
  fixedWeekCount: true,
  weekNumbers: false,
  height: 'auto',
  businessHours: false,

  // Text/Time Customization
  lang: 'en',

  // Views
  defaultView: 'month',

  // Agenda Options
  minTime: '00:00:00',
  maxTime: '24:00:00',
  scrollTime: '06:00:00',
  slotEventOverlap: true,

  // Current Date
  defaultDate: null,

  // Event Dragging & Resizing
  editable: false,
  eventStartEditable: false,
  eventDurationEditable: false,
  dragRevertDuration: 500,
  dragOpacity: 0.75,
  dragScroll: true,
  dragOverlap: true,

  // Selecting
  selectable: false,

  /*updateEvents: observer('events', function() {
    var fullCalendarElement = this.$();
    fullCalendarElement.fullCalendar('removeEvents');
    fullCalendarElement.fullCalendar('addEventSource', this.get('events'));
    fullCalendarElement.fullCalendar('rerenderEvents' );
  }),*/

  initCalendar: on('didInsertElement', function() {
    const self = this;

    this.$().fullCalendar({

      // Event Data
      events: this.get('events'),
      eventSources: this.get('eventSources'),
      timeFormat: this.get('timeFormat'),

      // General Display
      header: this.get('header'),
      customButtons: this.get('customButtons'),
      theme: this.get('theme'),
      firstDay: this.get('firstDay'),
      isRTL: this.get('isRTL'),
      weekends: this.get('weekends'),
      hiddenDays: this.get('hiddenDays'),
      fixedWeekCount: this.get('fixedWeekCount'),
      weekNumbers: this.get('weekNumbers'),
      height: this.get('height'),
      defaultView: this.get('defaultView'),
      businessHours: this.get('businessHours'),
      titleFormat: this.get('titleFormat'),

      viewRender() {
        const viewRender = self.attrs.viewRender;
        if (viewRender) {
          viewRender(...arguments);
        }

        self.$().fullCalendar('refetchEvents');
      },

      // Timezone
      timezone: this.get('timezone'),

      // Agenda Option
      minTime: this.get('minTime'),
      maxTime: this.get('maxTime'),
      scrollTime: this.get('scrollTime'),
      slotEventOverlap: this.get('slotEventOverlap'),
      slotLabelFormat: this.get('slotLabelFormat'),

      // Current Date
      defaultDate: this.get('defaultDate'),

      // Text/Time Customization
      lang: this.get('lang'),

      // Clicking & Hovering
      // date, jsEvent, view
      dayClick(date) {
        const dayClick = self.attrs.dayClick;
        let toDate = new Date(date);

        toDate = moment(toDate).add(1, 'days').toDate();
        if (dayClick) {
          dayClick(toDate, ...arguments);
        }

        if (this.get('gotoToday')) {
          self.$().fullCalendar( 'changeView', 'basicDay' );
          self.$().fullCalendar( 'gotoDate', toDate );
        }
      },

      // calEvent, jsEvent, view
      eventClick() {
        const eventClick = self.attrs.eventClick;
        if (eventClick) {
          eventClick(...arguments);
        }
      },

      // event, jsEvent, ui, view
      eventDragStart() {
        const eventDragStart = self.attrs.eventDragStart;
        if (eventDragStart) {
          eventDragStart(...arguments);
        }
      },

      // event, jsEvent, ui, view
      eventDragStop() {
        const eventDragStop = self.attrs.eventDragStop;
        if (eventDragStop) {
          eventDragStop(...arguments);
        }
      },

      // event, delta, revertFunc, jsEvent, ui, view
      eventDrop() {
        const eventDrop = self.attrs.eventDrop;
        if (eventDrop) {
          eventDrop(...arguments);
        }
      },

      // event, delta, revertFunc, jsEvent, ui, view
      eventResize() {
        const eventResize = self.attrs.eventResize;
        if (eventResize) {
          eventResize(...arguments);
        }
      },

      // event, jsEvent, ui, view
      eventResizeStart() {
        const eventResizeStart = self.attrs.eventResizeStart;
        if (eventResizeStart) {
          eventResizeStart(...arguments);
        }
      },

      // event, jsEvent, ui, view
      eventResizeStop() {
        const eventResizeStop = self.attrs.eventResizeStop;
        if (eventResizeStop) {
          eventResizeStop(...arguments);
        }
      },

      // start, end, jsEvent, view
      select() {
        const select = self.attrs.select;
        if (select) {
          select(...arguments);
        }
      },

      // Event Rendering
      // event, element, view
      eventRender() {
        const eventRender = self.attrs.eventRender;
        if (eventRender) {
          eventRender(...arguments);
        }
      },

      // event, element, view
      eventAfterRender() {
        const eventAfterRender = self.attrs.eventAfterRender;
        if (eventAfterRender) {
          eventAfterRender(...arguments);
        }
      },

      // view
      eventAfterAllRender() {
        const eventAfterAllRender = self.attrs.eventAfterAllRender;
        if (eventAfterAllRender) {
          eventAfterAllRender(...arguments);
        }
      },

      // event, element, view
      eventDestroy() {
        const eventDestroy = self.attrs.eventDestroy;
        if (eventDestroy) {
          eventDestroy(...arguments);
        }
      },

      // Dragging & Resizing
      editable: this.get('editable'),
      eventStartEditable: this.get('eventStartEditable'),
      eventDurationEditable: this.get('eventDurationEditable'),
      dragRevertDuration: this.get('dragRevertDuration'),
      dragOpacity: this.get('dragOpacity'),
      dragScroll: this.get('dragScroll'),

      // Selecting
      selectable: this.get('selectable')
    });
  })
});
