import Ember from 'ember';
import Doctors from 'mdr/models/doctors';
import Assessors from 'mdr/models/assessors';
import CreateAppointment from 'mdr/models/create-appointment';
import { formatToServer } from 'mdr/utility/utils';
import { animateTo } from 'mdr/utility/utils';

const {
  Component,
  inject,
  computed,
  set,
  on,
  run
} = Ember;

const {
  scheduleOnce
} = run;

const {
  equal,
  alias
} = computed;

const {
  service
} = inject;

export default Component.extend({
  doctors: service(),
  assessors: service(),
  appointments: service(),
  created: false,
  clients: null,
  single: equal('clients.clients.length', 1),
  appointment: null,

  _initialize: on('init', function() {
    this.set('appointment', CreateAppointment.create());
    this.set('accordians', {
      one: {
        id: 1,
        current: true,
        selected: false,
        disabled: false,
        reference: 'app-client-panel'
      },
      two: {
        id: 2,
        current: false,
        selected: false,
        disabled: true,
        reference: 'app-details-panel'
      },
      three: {
        id: 3,
        current: false,
        selected: false,
        disabled: true,
        reference: 'app-attender-panel'
      },
      four: {
        id: 4,
        current: false,
        selected: false,
        disabled: true,
        reference: 'app-verify-panel'
      },
      five: {
        id: 5,
        current: false,
        selected: false,
        disabled: true,
        reference: 'app-confirm-panel'
      }
    });
  }),

  accordians: null,

  one: alias('accordians.one'),
  two: alias('accordians.two'),
  three: alias('accordians.three'),
  four: alias('accordians.four'),
  five: alias('accordians.five'),

  current() {
    const accordians = this.get('accordians');
    let current;
    _.keys(accordians).forEach((accordian) => {
      if (accordians[accordian].current) {
        current = accordians[accordian];
      }
    });
    return current;
  },

  next(next) {
    const current = this.current();

    set(current, 'current', false);
    set(current, 'selected', true);
    set(current, 'disabled', false);

    scheduleOnce('afterRender', this, function() {
      this.open(next);
    });
  },

  reset(skip) {
    const accordians = this.get('accordians');
    let blind;

    _.keys(accordians).forEach((accordian) => {
      blind = accordians[accordian];
      if (!(skip && skip.id === blind.id)) {
        set(blind, 'current', false);
        set(blind, 'selected', false);
        set(blind, 'disabled', true);
      }
    });
  },

  open(accordian) {
    set(accordian, 'disabled', false);
    set(accordian, 'current', true);
    animateTo({ element: this.$(`#${accordian.reference}`) });
  },

  actions: {
    toggle(accordian) {
      const current = this.current();
      const appointment = this.get('appointment');

      if (accordian.disabled || accordian.id === current.id) {
        return;
      } else if (accordian.id === 2) {
        appointment.setProperties({
          assessors: null,
          doctors: null,
          selected_doctor: null,
          selected_assessor: null
        });

        this.reset(this.get('one'));
        set(accordian, 'current', true);
      } else {
        set(current, 'current', false);
        set(accordian, 'current', true);

        if (current.id === 3 || current.id === 4 || current.id === 5) {
          set(current, 'disabled', true);
        }
      }
    },

    gotoTwo() {
      const appointment = this.get('appointment');
      appointment.setProperties({
        assessors: null,
        doctors: null,
        selected_doctor: null,
        selected_assessor: null
      });

      this.next(this.get('two'));
    },

    gotoThree() {
      const self                  = this;
      const appointment           = this.get('appointment');
      const book_appointment_with = appointment.get('selected_appointment_with');
      let _assessors;
      let _doctors;

      appointment.setProperties({
        assessors: null,
        doctors: null,
        selected_doctor: null,
        selected_assessor: null
      });

      if (book_appointment_with === 'Assessor') {
        self.get('assessors').getAssessors().then((assessors) => {
          _assessors = Assessors.create({ assessors });
          appointment.set('assessors', _assessors);
          self.next(self.get('three'));
        });
      } else {
        self.get('doctors').getDoctors().then((doctors) => {
          _doctors = Doctors.create({ doctors });
          appointment.set('doctors', _doctors);
          self.next(self.get('three'));
        });
      }
    },

    gotoFour() {
      this.next(this.get('four'));
    },

    gotoFive() {
      const self      = this;
      const model     = self.get('appointment');
      const service   = self.get('appointments');
      const client    = model.get('selected_client');
      const doctor    = model.get('selected_doctor');
      const assessor  = model.get('selected_assessor');
      const data    = {};

      data.customer_id = client.get('customer_id');
      data.insurance_plan = client.get('insurance_plan');
      if (model.get('selected_appointment_with') === 'Assessor') {
        data.assessor_id = assessor.get('assessor_id');
      } else {
        data.doctor_id = doctor.get('doctor_id');
        data.service_charge = doctor.get('service_charge');
      }

      data.reason = model.get('reason');
      data.alt_info = model.get('alt_info');
      data.ts_request = formatToServer(model.get('start_date_time'));
      data.ts_request_endtime = formatToServer(model.get('end_date_time'));
      data.status = 'pending';

      service.postAppointment(data).then(() => {
        self.get('appointments').set('cache', false);
        self.reset();
        self.open(this.get('five'));
      });
    },

    create() {
      this.set('appointment', CreateAppointment.create());
      this.reset();
      this.open(this.get('one'));
    }
  }
});
