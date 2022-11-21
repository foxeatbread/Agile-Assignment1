import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from '@mui/material/Pagination';

function MovieListPageTemplate({ movies, title, action ,pages, setPagination}) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");


  const genreId = Number(genreFilter);


  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  const handlePageChange = (page) =>{   
    setPagination(page)
  }

  return (
    <Grid container sx={{ padding: '20px',}}>     
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
         
      <Grid item container spacing={5} >
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
        <Pagination 
        sx={{marginLeft:'40%',marginTop:'2rem'}} 
        color="primary" 
        shape="rounded"
        count="99"
        onChange={(page) => handlePageChange(page.target.textContent)}
        />
    </Grid>
    
  );

}
export default MovieListPageTemplate;