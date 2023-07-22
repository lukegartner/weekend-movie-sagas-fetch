import { useEffect, useState } from "react";

// MUI
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const MovieEdit = () => {
  const { details } = useSelector((store) => store);
  const { genres } = useSelector((store) => store);
  const [title, setTitle] = useState(details.title);
  const [description, setDescription] = useState(details.description);
  const [poster, setPoster] = useState(details.poster);
  const [genre_id, setGenre_id] = useState(details.genre_ids[0]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
    dispatch({ type: "FETCH_GENRES" });
  }, []);
  return (
    <Card
      sx={{
        width: "90%",
        maxWidth: 650,
        mx: "auto",
        mt: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Edit Movie Information
      </Typography>
      <TextField
        variant="outlined"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        sx={{ width: "65%", mx: "auto", my: 1 }}
      ></TextField>
      <TextField
        variant="outlined"
        label="Image URL"
        value={poster}
        onChange={(event) => setPoster(event.target.value)}
        sx={{ width: "65%", mx: "auto", my: 1 }}
      ></TextField>
      <TextField
        variant="outlined"
        label="Description"
        multiline
        rows={6}
        sx={{ width: "65%", mx: "auto", my: 1 }}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></TextField>

      <FormControl sx={{ width: "65%", mx: "auto", my: 1 }}>
        <InputLabel id="genre-select">Genre</InputLabel>
        <Select
          labelId="genre-select"
          id="demo-simple-select"
          value={genre_id}
          label="Genre"
          onChange={(event) => setGenre_id(event.target.value)}
        >
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Container>
        <Button
          variant="outlined"
          color="error"
          sx={{
            width: "34%",
            mx: 1,
            mt: 1,
            mb: 2,
          }}
          onClick={() => {
            history.goBack();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ width: "34%", mx: 1, mt: 1, mb: 2 }}
          onClick={() => {
            if (title && poster && description && genre_id) {
              dispatch({
                type: "EDIT_MOVIE",
                payload: { id, title, poster, description, genre_id },
              });
            } else {
              alert("Please Complete All Fields");
            }
          }}
        >
          Save
        </Button>
      </Container>
    </Card>
  );
};

export default MovieEdit;
