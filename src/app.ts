import express, { Application } from "express";
import { startDatabase } from "./database";
import { existMovieName, ensureMovieExistis } from "./middlewares";
import {
  createMovies,
  deleteMovie,
  listMovies,
  retrieveMovie,
  updateMovie,
} from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/movies", existMovieName, createMovies);
app.get("/movies", listMovies);
app.get("/movies/:id", ensureMovieExistis, retrieveMovie);
app.patch("/movies/:id", ensureMovieExistis, existMovieName, updateMovie);
app.delete("/movies/:id", ensureMovieExistis, deleteMovie);
app.listen(3000, async () => {
  await startDatabase();
  const host = "localhost";
  const port = 3000;
  console.log(`Server running at http://${host}:${port}/`);
});
