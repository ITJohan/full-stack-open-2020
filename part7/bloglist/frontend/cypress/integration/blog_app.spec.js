Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url, likes},
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('blogUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login/', {
        username: 'jdoe', password: 'pass123'
      }).then(({ body }) => {
        localStorage.setItem('blogUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('New note').click()
      cy.get('#title').type('Blog title')
      cy.get('#author').type('Hemmingway')
      cy.get('#url').type('http://blogs.com')
      cy.get('#submit-button').click()

      cy.contains('Blog title Hemmingway')
    })

    describe('And several blogs is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Blog one',
          author: 'Author one',
          url: 'URL one',
          likes: 0
        })
        cy.createBlog({
          title: 'Blog two',
          author: 'Author two',
          url: 'URL two',
          likes: 10
        })
        cy.createBlog({
          title: 'Blog three',
          author: 'Author three',
          url: 'URL three',
          likes: 20
        })
      })

      it('User can like a blog', function() {
        cy.contains('Show').click()
        cy.contains('Like').click()
        cy.contains('Likes: 21')
      })

      it('Creator user can remove the blog', function() {
        cy.contains('Show').click()
        cy.contains('Remove').click()
        cy.contains('Removed blog')
      })

      it('The blogs are ordered according to number of likes', function() {
        cy.contains('Show').click()
        cy.contains('Show').click()
        cy.contains('Show').click()

        cy.get('.blog').then(res => {
          const firstString = res[0].children[1].children[1].innerText
          const secondString = res[1].children[1].children[1].innerText
          const thirdString = res[2].children[1].children[1].innerText

          const firstLikes = Number(firstString.slice(7, firstString.length - 4))
          const secondLikes = Number(secondString.slice(7, secondString.length - 4))
          const thirdLikes = Number(thirdString.slice(7, thirdString.length - 4))

          const arr = [firstLikes, secondLikes, thirdLikes]
          expect(arr).to.have.ordered.members([20, 10, 0])
        })
      })
    })
  })
})