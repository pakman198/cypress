/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    cy.get('[data-test="filter-items"]').as('filter')
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
  });

  describe('Make an alias for the filter input', () => {
    it('should create alias for the filter input', () => {
      cy.get('@filter').type('Tooth')
      
      cy.get("[data-test='items'] li").each(($item) => {
        expect($item.text()).to.include('Tooth')
      });

    })

    it('should move an item from one list to the other', () => {
      cy.get('@unpackedItems').find('label').first().as('itemLabel')
      cy.get('@itemLabel').invoke('text').as('itemName')
      
      cy.get('@itemLabel').click()

      cy .get('@itemName').then(text => {
        cy.get('@packedItems').contains(text)
      })
    })
  })
});
