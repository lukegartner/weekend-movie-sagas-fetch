import { useSelector } from "react-redux";

const MovieDetails = () => {
  const { details } = useSelector((store) => store);
  console.log(details);
  return (
    <div>
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
