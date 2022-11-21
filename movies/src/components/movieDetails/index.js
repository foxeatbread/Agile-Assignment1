import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';



const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
    const [drawerOpen, setDrawerOpen] = useState(false);


    
  return (
    <>
      <p style={{marginTop:'2rem'}}></p>
      <Stack style={{listStyle: 'none'}} direction="row" >
              {movie.genres.map((g) => (
                <li key={g.name}>
                  <Chip label={g.name} sx={{...chip}} />
                </li>
              ))}
      </Stack>
      
      <p style={{marginTop: '0.5rem' ,fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Runtime:  </span>{movie.runtime} minutes</p>   
      <p style={{marginTop: '0.5rem' ,fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Revenue:  $</span>{movie.revenue.toLocaleString()}</p>  
      <p style={{marginTop: '0.5rem' ,fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Average score  :</span>{movie.vote_average} </p> 
      <p style={{marginTop: '0.5rem' ,fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Popularity  :</span>{movie.popularity} </p>  
          


      <Box>
            <p style={{fontSize: '2rem', marginBottom: '0'}}>Overview</p>
            <p style={{fontSize: '1.2rem'}}>{movie.overview}</p>
      </Box>


      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;