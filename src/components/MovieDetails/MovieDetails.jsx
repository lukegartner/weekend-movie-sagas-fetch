import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

// MUI
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";

const MovieDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { details } = useSelector((store) => store);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, []);
  return (
    <div>
      <Button
        style={{ position: "absolute", left: "1rem", top: "4rem" }}
        onClick={() => history.push("/")}
      >
        Back to List
      </Button>
      <Button
        style={{ position: "absolute", right: "1rem", top: "4rem" }}
        onClick={() => history.push(`/edit-movie/${id}`)}
      >
        Edit
      </Button>
      <Typography variant="h2" sx={{ mt: 2 }}>
        {details.title}
      </Typography>
      <img
        src={details.poster}
        alt={details.title}
        style={{ width: "16rem" }}
      />
      <Typography sx={{ width: 650, mx: "auto" }}>
        {details.description}
      </Typography>
      <Container
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        <Typography variant="h6" sx={{ mt: 1 }}>
          Genres
        </Typography>
        <List
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 0,
          }}
        >
          {details.genre_names.map((genre) => (
            <ListItem key={genre}>
              <ListItemText primary={genre} align="center" />
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default MovieDetails;
