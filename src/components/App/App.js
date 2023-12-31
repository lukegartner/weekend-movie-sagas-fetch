import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import MovieDetails from "../MovieDetails/MovieDetails";
import Header from "./Header";
import MovieInput from "../MovieInput/MovieInput";
import MovieEdit from "../MovieInput/MovieEdit";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details/:id">
          <MovieDetails />
        </Route>
        <Route path="/add-movie">
          <MovieInput />
        </Route>
        <Route path="/edit-movie/:id">
          <MovieEdit />
        </Route>

        {/* Details page */}

        {/* Add Movie page */}
      </Router>
    </div>
  );
}

export default App;
