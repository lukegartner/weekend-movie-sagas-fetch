const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const query = `SELECT movies.id, title, poster, description, array_agg(genre_id) as genre_ids, array_agg(genres.name) as genre_names FROM
  movies JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres on genres.id = movies_genres.genre_id 
  GROUP BY movies.id
  ORDER BY title ASC;`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log("New Movie Id:", result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Gets single movie details
router.get("/details/:id", (req, res) => {
  const query = `SELECT movies.id, title, poster, description, array_agg(genre_id) as genre_ids, array_agg(genres.name) as genre_names FROM
  movies JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres on genres.id = movies_genres.genre_id 
  WHERE movies.id = $1
  GROUP BY movies.id;`;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get movie details", err);
      res.sendStatus(500);
    });
});

// Edits Movie
router.put("/:id", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const editMovieQuery = `
  UPDATE "movies" 
     SET title = $1,
         poster = $2,
         description = $3
  WHERE "id" = $4;`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(editMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
      req.params.id,
    ])
    .then((result) => {
      // Now handle the genre reference
      const editMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(editMovieGenreQuery, [req.params.id, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
