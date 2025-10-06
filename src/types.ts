export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids?: number[];
    genres?: { id: number; name: string }[];
  };
  
  export type PagedResponse<T> = {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  };
  
  export type Genre = { id: number; name: string };
  