/// <reference types="cypress" />

describe('Finder Panel', () => {
    context('when using same fixture with sample page', () => {
        beforeEach(() => {
            cy.visit('http://127.0.0.1:5500/front/index.html')
        })
        it('front page shows two folders (monorepo, assets) and a file (mono.png)', () => {
            cy.get('finder')
                .find('.folder')
                .as('folders')

            cy.get('@folders')
                .eq(0).should('contain', 'monorepo')

            cy.get('@folders')
                .eq(1).should('contain', 'assets')

            cy.get('finder')
                .find('.file')
                .eq(0).should('contain', 'mono.png')
        })

        it('if monorepo clicked, it shows two files (README.md, package.json) and a folder (packages)', () => {
            cy.get('finder')
                .find('.folder')
                .eq(0)
                .click('center')

            cy.wait(1000)

            cy.get('finder')
                .find('.file')
                .as('files')

            cy.get('@files')
                .eq(0).should('contain', 'README.md')

            cy.get('@files')
                .eq(1).should('contain', 'package.json')
            
            cy.get('finder')
                .find('.folder')
                .eq(0).should('contain', 'packages')
        })

        it('if monorepo -> packages clicked, it shows three folders (front, back, types)', () => {
            cy.get('finder')
                .find('.folder')
                .eq(0)
                .click('center')

            cy.wait(1000)

            cy.get('finder')
                .find('.folder')
                .eq(0)
                .click('center')

            cy.wait(1000)

            cy.get('finder')
                .find('.folder')
                .as('folders')

            cy.get('@folders')
                .eq(0).should('contain', 'front')

            cy.get('@folders')
                .eq(1).should('contain', 'back')
            
            cy.get('@folders')
                .eq(2).should('contain', 'types')
        })
    })
})