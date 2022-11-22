import React, {useState,useEffect,lazy, Suspense} from "react";
import { useQuery } from 'react-query';
import { getPages } from "../api/tmdb-api";//
const PageTemplate = lazy(() => import('../components/templateMovieListPage'));
const Spinner = lazy(() => import('../components/spinner'));
const AddToFavoritesIcon = lazy(() => import('../components/cardIcons/addToFavorites'));

const HomePage = (props) => {

  const [page,setPagination] = useState(1)

  const  {data, error, isLoading, isError, refetch}  = useQuery("discover", () => getPages(page)) 

  useEffect(() => { 
    refetch();
   }, [page]); 


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;
  const current_page = data.page


  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  // const addToFavorites = (movieId) => true 

  return (
    <Suspense fallback={<h1>PageTemplate list</h1>}>
      <PageTemplate 
        title="Discover Movies" 
        movies={movies}     
        current_page = {current_page}
        setPagination={setPagination} 
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />}}
        />  
    </Suspense>
  );
};
export default HomePage;