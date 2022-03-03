/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter')
  })

  it('should have a form', () => {
      cy.get('form').should('not.exist')
  })

  it('should have the words "Add Item"', () => {
    cy.contains('Add Item')
  })

  describe('Adding a new item', () => {
    it('should add a new item after clicking on Add Item', () => {
      const item = "Kindle";
      cy.get('[data-test="new-item-input"]').type(item);
      
      cy.get('[data-test="add-item"]').click()
  
      cy.contains(item)
    })

    it('should put a new item in the Unpacked Items list', () => {
      const item = "Kindle";
      cy.get('[data-test="new-item-input"]').type(item);
      
      cy.get('form').submit();

      cy.get('[data-test="items-unpacked"]').contains(item);
    })

    it('should put a new item at the end of the Unpacked Items list', () => {
      const item = "Kindle";
      cy.get('[data-test="new-item-input"]').type(item);
      
      cy.get('form').submit();

      cy.get('[data-test="items-unpacked"] li').last().contains(item);
    })
  })

  describe('Filtering items', () => {
    it('should show items that match the input', () => {
      cy.get('[data-test="filter-items"]').type('tooth')

      cy.contains('Tooth Brush')
      cy.contains('Tooth Paste')

      cy.get("[data-test='items'] li").each(($item) => {
        expect($item.text()).to.include('Tooth')
      });
    })

    it('should hide items that do not match the input', () => {
      cy.get('[data-test="filter-items"]').type('tooth')
      
      cy.contains('Deodorant').should('not.exist')
    })
  })

  describe('Removing items', () => {
    it('should remove all', () => {
      cy.get('[data-test="remove-all"]').click()

      cy.get("[data-test='items'] li").should('not.exist')
    })

    it('should remove a single item', () => {
      cy.get("[data-test='items'] li").each($el => {
        cy.wrap($el).find("[data-test='remove']").click()
        cy.wrap($el).should('not.exist')
      })
      
      // cy.get("[data-test='items'] li").first().find("[data-test='remove']").click();
    });
  })

});
