import React, { useContext, lazy, Suspense } from "react";
import { useQueries } from "react-query";
const PageTemplate = lazy(() => import("../components/templateMovieListPage"));
const MoviesContext = lazy(() => import("../contexts/moviesContext"));
const getMovie = lazy(() => import("../api/tmdb-api"));
const Spinner = lazy(() => import('../components/spinner'));
const RemoveFromFavorites = lazy(() => import("../components/cardIcons/removeFromFavorites"));
const WriteReview = lazy(() => import("../components/cardIcons/writeReview"));

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });


  return (
    <Suspense fallback={<h1>Page Template</h1>}>
      <PageTemplate
        title="Favorite Movies"
        movies={movies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavorites movie={movie} />
              <WriteReview movie={movie} />
            </>
          );
        }}
      />
    </Suspense>
  );
};

export default FavoriteMoviesPage;