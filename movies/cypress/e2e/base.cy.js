import { visuallyHidden } from "@mui/utils";

let movies; // List of movies from TMDB
let movie; //
let movies_credit_people;
let details;

describe("Base tests", () => {
  before(() => {
    // Get the discover movies from TMDB and store them locally.
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });

  describe("The Discover Movies page", () => {
    it("displays the page header and 20 movies", () => {
      cy.get("h3").contains("Discover Movies");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct movie titles", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(movies[index].title);
      });
    });
  });
  describe("The movie details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movies[0].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((movieDetails) => {
          movie = movieDetails;
        });
      cy.request(
        `https://api.themoviedb.org/3/movie/${movies[0].id}/credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
        )
        .its("body") 
        .then((response) => {
          movies_credit_people = response.cast;
        });
      });
    beforeEach(() => {
      cy.visit(`/movies/${movies[0].id}`);
    });
    it(" displays the movie title, tagline", () => {
      cy.get("h3").contains(movie.title);
      cy.get("h3").contains(movie.tagline);
    });
    it(" displays the movie genre, details and overview", () => {
      cy.get("li")
      .eq(0)
      .within(() => {
        const genreChipLabels = movie.genres.map((g) => g.name);
        cy.get("span").each(($card, index) => {
          cy.wrap($card).contains(genreChipLabels[index]);
        });
      });
      cy.get("p").contains(movie.runtime);
      cy.get("p").contains(movie.revenue.toLocaleString());
      cy.get("p").contains(movie.vote_average);
      cy.get("p").contains(movie.popularity);
      cy.get(".MuiBox-root").find("p").contains("Overview");
      cy.get(".MuiBox-root").find("p").contains(movie.overview);

    })
    it(" displays the charactors", () => {  
      cy.get(".MuiContainer-root").find("p").contains("Cast");
      cy.log(movies_credit_people);
      cy.get(".css-e53awj-MuiStack-root")
      .eq(0)
      .within(() => {
        const actorChipLabels = movies_credit_people.map((g) => g.name);
        cy.get("p").each(($card, index) => {
          cy.wrap($card).contains(actorChipLabels[index]);
        })
      })
    })
  });

  describe("The actor details page", () => {
    beforeEach(() => {
      cy.visit(`/actor/${movies_credit_people[0].id}`);
    });
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${movies[0].id}/credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
        )
        .its("body") 
        .then((response) => {
          movies_credit_people = response.cast;
        });
      cy.request(
        `https://api.themoviedb.org/3/person/${movies_credit_people[0].id}?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
        )
        .its("body") 
        .then((response) => {
          details = response;
        });

    })
    it(" displays the actor name", () => {
      cy.get("p").contains(movies_credit_people[0].name)
    })
    it(" displays the actor information", () => {
      cy.get(".css-nen11g-MuiStack-root").find("span").contains("Gender:")
      cy.get(".css-nen11g-MuiStack-root").find("span").contains("Birthday:")
      cy.get(".css-nen11g-MuiStack-root").find("span").contains("Place of Birth:")
      cy.get(".css-nen11g-MuiStack-root").find("span").contains("Main genre:")
      cy.get(".css-nen11g-MuiStack-root").find("span").contains("Another Name:")
      cy.get(".css-nen11g-MuiStack-root").find("span").contains("Homepage:")
      cy.get(".css-nen11g-MuiStack-root").find("p").contains(details.gender==2? 'Male': 'Female')
      cy.get(".css-nen11g-MuiStack-root").find("p").contains(details.birthday)
      cy.get(".css-nen11g-MuiStack-root").find("p").contains(details.place_of_birth)
      cy.get(".css-nen11g-MuiStack-root").find("p").contains(details.known_for_department)
      cy.get(".css-nen11g-MuiStack-root").find("p").contains(details.homepage)
    })
    it(" displays the actor Biography", () => {
      cy.get(".css-nen11g-MuiStack-root").find("p").contains("Biography......")
    })
  })
});