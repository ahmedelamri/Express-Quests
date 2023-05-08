require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT ?? 5036;

const welcome = (req, res) => {
  res.send(
    "Welcome to my favourite movie list in french | Bienvenue sur ma liste de films préférés "
  );
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
