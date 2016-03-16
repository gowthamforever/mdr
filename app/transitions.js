export default function() {
  const duration = 350;

  this.transition(
    this.use('toRight', { duration })
  );

  this.transition(
    this.withinRoute(['enrollment.agent', 'enrollment.doctor', 'enrollment.assessor']),
    this.use('crossFade', { duration }),
    this.reverse('crossFade', { duration })
  );

  this.transition(
    this.withinRoute(['appointments.requests.pending', 'appointments.requests.accepted', 'appointments.requests.rejected']),
    this.use('crossFade', { duration }),
    this.reverse('crossFade', { duration })
  );

  this.transition(
    this.withinRoute(['admin-tasks.staffs', 'admin-tasks.doctors', 'admin-tasks.assessors']),
    this.use('crossFade', { duration }),
    this.reverse('crossFade', { duration })
  );
}
