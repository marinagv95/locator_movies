import { NextFunction, Request, Response } from "express";
import { client } from "./database";
import { QueryConfig, QueryResult } from "pg";
import { IMovies, IMoviesRequest } from "./interfaces";
import format from "pg-format";

const createMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieDate: IMoviesRequest = request.body;

  const queryString: string = format(
    `
  INSERT INTO
	    movies 
      (%I)
  VALUES
	    (%L)
RETURNING *;
`,
    Object.keys(movieDate),
    Object.values(movieDate)
  );

  const queryResult: QueryResult<IMovies> = await client.query(queryString);

  return response.status(201).json(queryResult.rows[0]);
};

const listMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const category: any = request.query.category;
  let queryString: string = "";
  let queryResult: QueryResult;

  if (category) {
    queryString = `
      SELECT
        *
      FROM
        movies
      WHERE
        category = $1;
    `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [category],
    };
    queryResult = await client.query(queryConfig);

    if (queryResult.rowCount === 0) {
      queryString = `
        SELECT
          *
        FROM
          movies;
      `;
      queryResult = await client.query(queryString);
    }
  } else {
    queryString = `
      SELECT
        *
      FROM
        movies;
    `;
    queryResult = await client.query(queryString);
  }

  return response.json(queryResult.rows);
};

const retrieveMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movies: IMovies = response.locals.movies;

  return response.json(movies);
};

const updateMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieDate: Partial<IMoviesRequest> = request.body;
  const id: number = parseInt(request.params.id);
  const queryString: string = format(
    `    
  UPDATE 
    movies
    SET(%I) = ROW (%L)  
 WHERE
    id = $1
  RETURNING *;     
   `,
    Object.keys(movieDate),
    Object.values(movieDate)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IMovies> = await client.query(queryConfig);
  return response.json(queryResult.rows[0]);
};

const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = parseInt(request.params.id);

  const queryString: string = `
   DELETE FROM
      movies
  WHERE
      id = $1;  
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);
  return response.status(204).send();
};

export { createMovies, listMovies, retrieveMovie, updateMovie, deleteMovie };
