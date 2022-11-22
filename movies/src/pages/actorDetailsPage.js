import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { getActorDetails } from '../api/tmdb-api'
import Spinner from '../components/spinner'
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
const ActorPage = (props) => {
  const { id } = useParams();
  const { data: details, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActorDetails
  );



  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }



  return(
    <>
    <p style={{fontSize: '2.5rem', fontWeight: 'bold'}}>{details.name}</p>
      <Grid container direction="row" justifyContent="flex-start">    
        <Grid item xs={2.5}>
          <img style={{maxWidth: '280px', marginLeft:'50px'}} 
          src={`https://image.tmdb.org/t/p/w500/${details.profile_path}`} 
          alt={details.profile_path}/>
        </Grid>
             
        <Grid item xs={6}>
          <Stack>
            <p style={{fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Gender:   </span>{details.gender==2? 'Male': 'Female'}</p>
          </Stack>

          <Stack>
            <p style={{fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Birthday:   </span> {details.birthday}</p>
          </Stack>

          <Stack>
            <p style={{fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Place of Birth:   </span>{details.place_of_birth}</p>
          </Stack>

          <Stack>
            <p style={{fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Main genre:   </span>{details.known_for_department}</p>
          </Stack>

          <Stack>
            <p style={{fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Another Name:  </span>{details.also_known_as.slice(0,10).map((info) => (
              <span key={info} style={{marginBottom: '0'}}> {info}/</span>))}</p>
          </Stack>

          <Stack>
            <p style={{fontSize: '1.2rem'}}><span style={{fontWeight: 'bolder',whiteSpace:'pre'}}>Homepage:   </span>{details.homepage}</p>
          </Stack>

          </Grid>
          
          <Grid item xs="12">
            <Stack style={{marginLeft:'50px', marginLeft:'50px'}}>
              <p style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Biography......</p>
              <p style={{fontSize: '1.2rem'}}>{details.biography}</p>
            </Stack>  
          </Grid>

      </Grid>
    </>
  )
}

export default ActorPage;