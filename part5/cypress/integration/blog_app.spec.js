describe('Blog app', function() {
  beforeEach(function() {
    // Reset db
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // Create user
    const user = {
      username: 'jdoe',
      name: 'John Doe',
      password: 'pass123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('Succeeds with correct credentials', function() {
      cy.get('input:first').type('jdoe')
      cy.get('input:last').type('pass123')
      cy.contains('Login').click()
      cy.contains('John Doe logged in')
    })

    it('Fails with wrong credentials', () => {
      cy.get('input:first').type('jdoe')
      cy.get('input:last').type('wrongpass')
      cy.contains('Login').click()
      cy.get('#notification').should('contain', 'Wrong credentials')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})