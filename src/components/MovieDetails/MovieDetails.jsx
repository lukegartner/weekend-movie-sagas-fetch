import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const MovieDetails = () => {
  const history = useHistory();
  const { details } = useSelector((store) => store);
  console.log(details);
  return (
    <div>
      <button
        style={{ position: "absolute", left: "1rem" }}
        onClick={() => history.push("/")}
      >
        Back to List
      </button>
      <h1>{details.title}</h1>
      <img src={details.poster} alt="" />
      <p>{details.description}</p>
      <ul>
        <h4>Genres</h4>
        {details.genre_names.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;
