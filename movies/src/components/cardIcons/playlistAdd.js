import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MustWatchMoviesContext } from "../../contexts/mustWatchContext";
import IconButton from "@mui/material/IconButton";

const PlaylistIcon = ({ movie }) => {
  const context = useContext(MustWatchMoviesContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
  };
  return (
    <IconButton aria-label="add to Playlist" onClick={handleAddToPlaylist}>
        <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default PlaylistIcon;