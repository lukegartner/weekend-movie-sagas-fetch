import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import { takeEvery, put } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};
// Used to store the single movie details
const details = (state = { genre_names: [] }, action) => {
  switch (action.type) {
    case "SET_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const response = yield fetch("/api/movie");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const movies = yield response.json();
    yield put({ type: "SET_MOVIES", payload: movies });
  } catch {
    console.log("get all error");
    alert("Something went wrong.");
  }
}
function* fetchMovieDetails(action) {
  // get single movie details from DB
  try {
    const response = yield fetch(`/api/movie/details/${action.payload.id}`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const details = yield response.json();
    yield put({ type: "SET_DETAILS", payload: details[0] });
  } catch {
    console.log("get details error");
    alert("Something went wrong.");
  }
}
function* fetchAllGenres(action) {
  // get single movie details from DB
  try {
    const response = yield fetch(`/api/genre`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const genres = yield response.json();
    yield put({ type: "SET_GENRES", payload: genres });
  } catch {
    console.log("get genres error");
    alert("Something went wrong.");
  }
}
function* postMovie(action) {
  // get single movie details from DB
  try {
    const response = yield fetch(`/api/movie`, {
      method: "POST",
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    yield put({ type: "FETCH_GENRES", payload: genres });
  } catch {
    console.log("get genres error");
    alert("Something went wrong.");
  }
}

function* watcherSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_DETAILS", fetchMovieDetails);
  yield takeEvery("FETCH_GENRES", fetchAllGenres);
  yield takeEvery("POST_MOVIE", postMovie);
}

sagaMiddleware.run(watcherSaga);

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
