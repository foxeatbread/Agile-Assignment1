import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from "react-router-dom";
import { searchMovieApi } from '../../api/tmdb-api'
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import imgEnter from '../../images/enter.png';
// const drawerWidth = 240;


function DrawerAppBar(props) {
  const navigate = useNavigate();

  const handelMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  }

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favourites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
  ]

  let inputData;

  const handleChange = (e) => {
    inputData = e.target.value
  }

  const clickToSearch = async () => {
    let data = await searchMovieApi(inputData)
    console.log(data.results[0])
    handelMenuSelect(`/movies/${data.results[0].id}`)
  }

  const searchMovie = async (input) => {
    let data = await searchMovieApi(input)
    console.log(data.results[0])
    handelMenuSelect(`/movies/${data.results[0].id}`)
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      searchMovie(e.target.value)
      console.log(e.target.value)
    }
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar style={{display:'flex',backgroundColor:'#f50057'}}>
          <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search movies"
              onChange={handleChange}
              onKeyUp={handleSearch}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <img src={imgEnter} width='25' onClick={clickToSearch}></img>

          </Paper>
        </Toolbar>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }} style={{position: 'absolute', right: '2rem',top: '1rem'}}>
          {menuOptions.map((item) => (
            <Button key={item.label} sx={{ color: '#fff' }} onClick={() => handelMenuSelect(item.path)}>
              {item.label}
            </Button>
          ))}
        </Box>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
