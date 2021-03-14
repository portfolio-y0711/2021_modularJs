/// <reference types="cypress" />

context('Front Page', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/front/index.html')
  })

  it('render breadcrumb with "Root"', () => {
    cy.get('bread')
      .find('li')
      .first()
      .should('contain', 'Root')
  })

  it('render finder with folders: "monorepo" and "assets"', () => {
    cy.get('finder')
      .find('.folder')
      .as('folders')
    
    cy.get('@folders')
      .eq(0)
      .should('contain', 'monorepo')

    cy.get('@folders')
      .eq(1)
      .should('contain', 'assets')
  })
})
