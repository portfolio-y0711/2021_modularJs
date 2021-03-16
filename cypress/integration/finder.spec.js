/// <reference types="cypress" />

describe('Finder Panel', () => {
    beforeEach(() => {
        cy.intercept('http://localhost:5000/api/path/0', [
            {
                id: 1,
                type: 'DIRECTORY',
                title: 'monorepo',
                filepath: null,
                parent: 0
            },
            {
                id: 3,
                type: 'DIRECTORY',
                title: 'assets',
                filepath: null,
                parent: 0
            },
        ]).as('root')
        cy.visit('http://127.0.0.1:5500/front/index.html')
    })
    it('http request ', () => {
        cy.get('finder')
            .find('.folder')
            .as('folders')

        cy.get('@folders')
            .eq(0).should('contain', 'monorepo')

        cy.get('@folders')
            .eq(1).should('contain', 'assets')
    })
    
    // it('render folders and files', () => {
    //     cy.get('finder')
    //         .find('.folder')
    //         .as('folders')
        
    //     cy.get('@folders')
    //         .eq(0)
    //         .should('contain', 'monorepo')
    // })
    // it('render finder with folders: "monorepo" and "assets"', () => {
    //     cy.get('finder')
    //         .find('.folder')
    //         .as('folders')
        
    //     cy.get('@folders')
    //         .eq(0)
    //         .should('contain', 'monorepo')
    
    //     cy.get('@folders')
    //         .eq(1)
    //         .should('contain', 'assets')
    // })
    // it('rerender finder with new folders & files when "monorepo" folder clicked', () => {
    //     cy.get('finder')
    //         .find('.folder')
    //         .eq(0)
    //         .click('center')
    
    //     cy.get('finder')
    //         .find('.folder')
    //         .should('contain', 'packages')
    
    //     cy.get('finder')
    //         .find('.folder')
    //         .click('center')
        
    //     cy.wait(1000)
    //     cy.get('finder')
    //         .find('.folder')
    //         .eq(0)
    //         .should('contain', 'front')
    // })
})