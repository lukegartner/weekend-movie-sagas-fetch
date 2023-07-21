import { useState } from "react";

// MUI
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Typography } from "@mui/material";

const MovieInput = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [genre, setGenre] = useState("");
  const handleChange = () => {};
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
        Enter Movie Information
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
        value={imageUrl}
        onChange={(event) => setImageURL(event.target.value)}
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
          value={genre}
          label="Genre"
          onChange={(event) => setGenre(event.target.value)}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{ width: "45%", mx: "auto", mt: 1, mb: 2 }}
      >
        Add Movie
      </Button>
    </Card>
  );
};

export default MovieInput;
