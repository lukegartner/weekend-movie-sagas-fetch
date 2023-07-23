import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieList.css";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { movies, genres } = useSelector((store) => store);
  const [sortGenre, setSortGenre] = useState("all");

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  return (
    <main>
      <Typography variant="h1">Movie List</Typography>
      <FormControl sx={{ width: "65%", mx: "auto", my: 1 }}>
        <InputLabel id="genre-select">Genre</InputLabel>
        <Select
          labelId="genre-select"
          id="demo-simple-select"
          value={sortGenre}
          label="Genre"
          onChange={(event) => setSortGenre(event.target.value)}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
          <MenuItem key="all" value="all">
            All
          </MenuItem>
        </Select>
      </FormControl>
      <ImageList sx={{ width: 650, height: 725, mx: "auto" }} cols={3}>
        {movies.map((movie) => {
          if (movie.genre_ids.includes(sortGenre) || sortGenre === "all") {
            return (
              <ImageListItem
                key={movie.id}
                onClick={() => {
                  history.push(`/details/${movie.id}`);
                }}
              >
                <img
                  src={`${movie.poster}?w=248&fit=crop&auto=format`}
                  srcSet={`${movie.poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={movie.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={movie.title}
                  position="below"
                  sx={{ bgcolor: "info.light" }}
                />
              </ImageListItem>
            );
          }
        })}
      </ImageList>
    </main>
  );
}

export default MovieList;
