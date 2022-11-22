let movies;

describe("Search Bar", ()=>{
    before(() => {
        cy.visit("/");
        cy.request(
          `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
            "TMDB_KEY"
          )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
          .its("body")
          .then((response) => {
            movies = response.results;
          });
      });
    describe("Search the movie", () => {
        it("skip into the movie detail page", () => {
          const text = 'adam';
          cy.get(".MuiInputBase-root").type(`${text}{enter}`)
          cy.url().should("not.include", `/movies/436720`);
        });
      });
})