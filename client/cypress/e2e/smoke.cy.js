describe('Smoke Test', () => {
  it('can view the signin', () => {
    cy.visit('/signin');
    cy.contains('Sign in');
  });
});
