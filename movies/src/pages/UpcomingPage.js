import React ,{lazy, Suspense}from "react";
import { useQuery } from 'react-query';
const Spinner = lazy(() => import('../components/spinner'));
const PageTemplate = lazy(() => import('../components/templateMovieListPage'));
const getUpcomingMovies = lazy(() => import("../api/tmdb-api"));
const AddToFavoritesIcon = lazy(() => import('../components/cardIcons/addToFavorites'));

const HomePage = () => {

  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  // const addToFavorites = (movieId) => true 

  return (
    <Suspense fallback={<h1>Page template list</h1>}>
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
    </Suspense>
);
};
export default HomePage;