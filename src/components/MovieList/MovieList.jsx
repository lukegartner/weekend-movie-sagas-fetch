import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieList.css";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <main>
      <Typography variant="h1">Movie List</Typography>
      <ImageList sx={{ width: 650, height: 725, mx: "auto" }} cols={3}>
        {movies.map((movie) => {
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
        })}
      </ImageList>
    </main>
  );
}

export default MovieList;
