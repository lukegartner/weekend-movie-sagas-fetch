import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import MovieDetails from "../MovieDetails/MovieDetails";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details">
          <MovieDetails />
        </Route>

        {/* Details page */}

        {/* Add Movie page */}
      </Router>
    </div>
  );
}

export default App;
