import { Response, Request, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IMovies, IMoviesRequest } from "./interfaces";
import { client } from "./database";

const ensureMovieExistis = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(request.params.id);

  const queryString: string = `
        SELECT
            *
        FROM
            movies
        WHERE
            id = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IMovies> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    return response.status(404).json({
      error: "Movie not found!",
    });
  }

  response.locals.movies = queryResult.rows[0];
  return next();
};

const existMovieName = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = request.body;

  const queryString: string = `
          SELECT
              name
          FROM
              movies
          WHERE
              name = $1;

      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount >= 1) {
    return response.status(409).json({
      error: "Movie name already exists!",
    });
  }
  next();
};

export { ensureMovieExistis, existMovieName };
