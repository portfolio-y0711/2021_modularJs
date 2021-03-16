/// <reference types="cypress" />

describe('Bread Panel', () => {
    context('when using same fixture with sample page', () => {
        beforeEach(() => {
            cy.fixture('files.json').then((obj) => {
                Object.keys(obj).forEach(key => { 
                    cy.intercept({ url: new RegExp(`api\/path\/${key}$`) }, obj[`${key}`])
                })
            })
            cy.visit('http://127.0.0.1:5500/front/index.html')
        })
        it('front page shows breadcrumb (Root)', () => {
            cy.get('bread')
                .find('li')
                .as('breadcrumbs')

            cy.get('@breadcrumbs')
                .eq(0).should('contain', 'Root')
        })

        it('if monorepo clicked, it will show breadcrumbs as (Root > monorepo)', () => {
            cy.get('finder')
                .find('.folder')
                .eq(0)
                .click('center')

            cy.wait(1000)

            cy.get('bread')
                .find('li')
                .as('breadcrumbs')

            cy.get('@breadcrumbs')
                .eq(0).should('contain', 'Root')

            cy.get('@breadcrumbs')
                .eq(1).should('contain', 'monorepo')
        })

        it('if monorepo -> packages clicked, it will show breadcrumbs as (Root, monorepo, packages)', () => {
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

            cy.get('bread')
                .find('li')
                .as('breadcrumbs')

            cy.get('@breadcrumbs')
                .eq(0).should('contain', 'Root')

            cy.get('@breadcrumbs')
                .eq(1).should('contain', 'monorepo')

            cy.get('@breadcrumbs')
                .eq(2).should('contain', 'packages')
        })
    })
})