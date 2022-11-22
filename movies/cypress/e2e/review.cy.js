let discoverMovies;
let reviews;
let authorList;
let excerptList;
let idList;

describe("Review pgae tests", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        discoverMovies = response.results;
      });
  });

  beforeEach(() => {
    cy.visit(`/movies/${discoverMovies[1].id}`);
    cy.request(
      `https://api.themoviedb.org/3/movie/${
        discoverMovies[1].id
      }/reviews?api_key=${Cypress.env("TMDB_KEY")}`
    )
      .its("body")
      .then((reviewss) => {
        reviews = reviewss;
        authorList = reviews.results.map(a => a.author);
        excerptList = reviews.results.map(c => c.content);
        idList = reviews.results.map(i => i.id);
      });
  });

  describe("The review overplay", () => {
    it("displays reviews botton, author, excerpt and link", () => {
      cy.get(".css-i4bv87-MuiSvgIcon-root").click();
      cy.get(".MuiTableRow-head").contains("Author")
      cy.get(".MuiTableRow-head").contains("Excerpt")
      cy.get(".MuiTableRow-head").contains("More")
      cy.get(".MuiTableBody-root>tr>th").each(($card, index) => {
        cy.wrap($card).contains(authorList[index]);
        cy.wrap($card).next().contains(excerptList[index].substring(0,10));
      });
    })
  });

  describe("The review detail page", () => {
    beforeEach(() => {
      cy.visit(`/movies/${discoverMovies[1].id}`);
      cy.get(".css-i4bv87-MuiSvgIcon-root").click();
      cy.get(".MuiTableBody-root>tr>td>a").contains("Full Review").eq(0).click();
    });

    it("navigate to the review detail page", () => {
      cy.url().should("include", `/reviews/${idList[0]}`);
    })

    it("displays review author", () => {
      cy.get("p").eq(0).contains(authorList[0]);
    })

    it(" display the the review content", () => {
      cy.get("p").eq(1).contains(excerptList[0].substring(0,100));
    });
  });

});