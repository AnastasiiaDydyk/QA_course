import MainPage from './pages/mainPage'
import main_page_data from './testdata/main_page_text'
const mainpage = new MainPage();

describe('Open main page and checking elements', () => {
  beforeEach (() => {
    cy.visit('https://dou.ua');
  })
    it.skip('checking the headers elements', () => {
      cy.visit('https://dou.ua');
      cy.get('header > ul > li:nth-child(2) > a').should('be.visible');
      cy.get('header > ul > li:nth-child(3) > a').should('be.visible');
      cy.get('header > ul > li:nth-child(4) > a').should('be.visible');
      cy.get('header > ul > li:nth-child(5) > a').should('be.visible');
      cy.get('header > ul > li:nth-child(6) > a').should('be.visible');
      cy.get('header > ul > li:nth-child(7) > a').should('be.visible');
      //cy.get('header > ul > li:nth-child) > a').should('be.visible');
    })
    it.skip ('click forum link header', ()=> {
    cy.get('header > ul > li:nth-child(3) > a').should('be.visible').click();
    cy.url().should('contain','forums/');
    })

    it ('checking the search', () =>{
      mainpage.searchInputFieldonMainPage().type(main_page_data.javascript_text).type('{enter}');
      cy.url().should('contain','javascript');
      mainpage.searchInputFieldOnSearchPage().should('be.visible')
    })
  })