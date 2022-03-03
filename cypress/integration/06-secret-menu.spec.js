/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  describe('Columns Filter', () => {

    for(let prop of properties) {
      describe(`${prop}`, () => {
        it( `should have a ${prop} column`, () => {
          cy.get(`#${prop}-column`);
        });
  
        it(`should hide the ${prop} column if unchecked`, () => {
          cy.get(`#show-${prop}`).click()
          cy.get(`#${prop}-column`).should('be.hidden');
        });
      })
    }
  })

  describe('Restaurants Filter', () => {
    for(let res of restaurants) {
      describe(`${res}`, () => {
        it(`should display results only for ${res}`, () => {
          cy.get('#restaurant-visibility-filter').select(res)
          cy.get(`td[headers="whereToOrder-column"]`).each($el => {
            expect($el.text()).to.contain(res)
          })
        });
      })
    }
  })

  describe('Rating filter', () => {
    for(let rating of ratings) {
      describe(`Rating ${rating}`, () => {
        it(`should display results only for ${rating} rating`, () => {
          cy.get('#minimum-rating-visibility').invoke('val', `${rating}`).trigger('input')
          cy.get(`td[headers="popularity-column"]`).each($el => {
            expect(+$el.text()).to.be.gte(rating)
          })
        });
      })
    }
  })
});
