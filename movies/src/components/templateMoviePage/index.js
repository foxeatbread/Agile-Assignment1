import React, { useEffect, useState } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {getCredits} from '../../api/tmdb-api'
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";




const TemplateMoviePage = ({ movie, children }) => {
    const [movieCredits, setMovieCredits] = useState([])//
    const navigate = useNavigate();

    useEffect(() => {
        getCredits(movie.id).then(credits => {
          if (credits) {
            setMovieCredits(credits)
          }
        })
    },[])//
    

    const {error, isLoading, isError } = useQuery(
        ["images", { id: movie.id }],
        getMovieImages
    );

    const handelMenuSelect = (pageURL) => {
        navigate(pageURL, { replace: true});
      }
    
      const CastContainer = (data) => {
    
        if(!data.movieCredits || data.movieCredits.length == 0) {
          return
        }
        else {
          let movieCredits = data.movieCredits
          return(
             <Container>
        <p style={{ fontSize: '2rem',  marginBottom: '1rem'}}>Cast:</p>
          <Stack direction="row" spacing={2}>
            {movieCredits.cast.slice(0,6).map((movie) => (
              <Card key={movie.id} >
                <CardMedia component="img" height={300} image={`https://image.tmdb.org/t/p/w500/${movie.profile_path}`} alt="movie.profile_path"
                />
                <CardContent>
                  <p>{movie.original_name}</p>   
                </CardContent>
                <CardActions>
                  <Button onClick={() =>handelMenuSelect(`/actor/${movie.id}`)}>Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Container> 
          )
        }
      }


    if (isLoading) {
    return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
    <>
    <MovieHeader movie={movie} />
    <Grid container >
        

    <Grid item xs={6} style={{marginLeft:'25rem'}}>
        {children}
    </Grid>

    <Grid item xs={2} style={{marginRight:'10rem',marginTop:'2rem'}}>          
    <CardMedia sx={{ maxWidth: 300 }}
        component="img"
        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
    </Grid>



    <Container>
      <CastContainer movieCredits={movieCredits}/>
    </Container>
    </Grid>



    </>
    );
    };

export default TemplateMoviePage;