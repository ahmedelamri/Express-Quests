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

const movieHandlers = require("./movieHandlers");
const {
  hashPassword: hashPasswordMiddleware,
  verifyPassword,
  verifyToken,
} = require("./auth.js");

const userHandlers = require("./userHandlers");

const isItDwight = (req, res) => {
  if (
    req.body.email === "dwight@theoffice.com" &&
    req.body.password === "123456"
  ) {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};

app.get("/", welcome);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
app.post("/api/users", hashPasswordMiddleware, userHandlers.postUsers);

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

app.use(verifyToken); /*Le mur d'authentification*/

app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.put("/api/movies/:id", verifyToken, movieHandlers.updateMovie);
app.delete("/api/movies/:id", verifyToken, movieHandlers.deleteMovie);

app.put(
  "/api/users/:id",
  verifyToken,
  hashPasswordMiddleware,
  userHandlers.updateUsers
);
app.delete("/api/users/:id", verifyToken, userHandlers.deleteUsers);
