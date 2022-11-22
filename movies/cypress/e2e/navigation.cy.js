let movies;
let movieId;
let movies_credit_people;
Cypress.Commands.add('clickButton', (label) => {
  cy.get('button').contains(label).click()
})
Cypress.Commands.add('clickLink', (item,num,label) => {
  cy.get(item).eq(num).contains(label).click()
})

describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`)
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });
  describe("From the home page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.clickLink(".MuiCardActions-root",0,"More Info")
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });
  describe("The site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("navigation via the links", () => {
        cy.clickButton("Favourites")
        cy.url().should("include", `/favorites`);
        cy.clickButton("Favourites")
        cy.url().should("include", `/`);
      });
    });
  });
  describe("From the favourites page to a movie's details", () => {
    beforeEach(() => {
        // Select two favourites and navigate to Favourites page
        cy.get("button[aria-label='add to favorites']").eq(1).click();
        cy.get("button[aria-label='add to favorites']").eq(3).click();
        cy.clickButton("Favourites")
      });
    it("navigates from favourites page to the movie details page and change browser URL", () => {
        cy.visit("/favourites");
        cy.clickLink(".MuiCardActions-root",0,"More Info")
        cy.url().should("include", `/movies/${movies[0].id}`);
      });
  });
  describe("From the movie's detail page to actor details page", () => {
    beforeEach(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${movies[0].id}/credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
        )
        .its("body") 
        .then((response) => {
          movies_credit_people = response.cast;
        });
    })
    it("navigates to the movie details page and then actor detail page and change browser URL", () => {
      cy.clickLink(".MuiCardActions-root",0,"More Info")
      cy.clickLink(".MuiCardActions-root",0,"Learn More")
      cy.url().should("include", `${movies_credit_people[0].id}`);
    });
  })
  describe("The forward/backward links", () => {
    beforeEach(() => {
      cy.clickLink(".MuiCardActions-root",0,"More Info")
    });
    it("navigates between the movies detail page and the Home page.", () => {
      cy.get("svg[data-testid='ArrowBackIcon'").click();
      cy.url().should("not.include", `/movies/${movies[0].id}`);
      cy.get("svg[data-testid='ArrowForwardIcon'").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });
});