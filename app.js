require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT ?? 5036;

app.use(express.json());

const welcome = (req, res) => {
  res.send(
    "Welcome to my favourite movie list in french | Bienvenue sur ma liste de films préférés "
  );
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const { hashPassword } = require("./auth.js");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
app.post("/api/users", hashPassword, userHandlers.postUsers);
app.put("/api/users/:id", hashPassword, userHandlers.updateUsers);
app.delete("/api/users/:id", userHandlers.deleteUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
