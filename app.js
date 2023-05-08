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

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUsersById);
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", movieHandlers.postUsers);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", movieHandlers.updateUsers);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", movieHandlers.deleteUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
