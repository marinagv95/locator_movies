interface IMovies {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

type IMoviesRequest = Omit<IMovies, "id">;

export { IMovies, IMoviesRequest };
