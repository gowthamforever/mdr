export default function() {
  const duration = 350;

  this.transition(
    this.fromRoute('account.signin'),
    this.toRoute('account.signup'),
    this.use('crossFade', { duration }),
    this.reverse('crossFade', { duration })
  );

  this.transition(
    this.use('toRight', { duration })
  );
}
