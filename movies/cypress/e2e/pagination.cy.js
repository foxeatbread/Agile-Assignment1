let movies
const num = 20;
describe("Base tests", () => {
    before(() => {
        cy.visit("/");
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=2`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
        cy.get(".MuiPagination-ul").contains("2").click();
    });

    describe("The movies in page 2", () => {
        it("displays the page header and 20 movies", () => {
            cy.get("h3").contains("Discover Movies");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
        });

        it("displays the correct movie titles", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.log(movies)
                cy.wrap($card).find("p").contains(movies[index].title);
            });
        });
    });
});