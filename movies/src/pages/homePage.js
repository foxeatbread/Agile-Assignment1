import React, {useState,useEffect} from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { getPages } from "../api/tmdb-api";//

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

    <PageTemplate 
      title="Discover Movies" 
      movies={movies}     
      current_page = {current_page}
      setPagination={setPagination} 
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />}}
      />  
  );
};
export default HomePage;