/// <reference types="cypress" />

context('Front Page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/front/index.html')
  })

  it('render breadcrumb with "Root"', () => {
    cy.get('li')
      .eq(0)
      .should('contain', 'Root')
  })
})
