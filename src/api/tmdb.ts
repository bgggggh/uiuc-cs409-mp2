import axios from "axios";
import { Genre, Movie, PagedResponse } from "../types";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "b7566440727f8c2721730ffb799173c7";
const BASE_URL = "https://api.themoviedb.org/3";

export const IMG = {
  poster: (path: string | null, size: string = "w500") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "",
  backdrop: (path: string | null, size: string = "w780") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "",
};

const client = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export const tmdb = {
  async searchMovies(query: string, page = 1) {
    const { data } = await client.get<PagedResponse<Movie>>("/search/movie", {
      params: { query, page, include_adult: false },
    });
    return data;
  },
  async discoverMovies(params: { with_genres?: string; sort_by?: string }) {
    const { data } = await client.get<PagedResponse<Movie>>("/discover/movie", {
      params: { with_watch_monetization_types: "flatrate", ...params },
    });
    return data;
  },
  async getMovie(id: string | number) {
    const { data } = await client.get<Movie>(`/movie/${id}`, {
      params: { append_to_response: "credits,videos" },
    });
    return data;
  },
  async getGenres() {
    const { data } = await client.get<{ genres: Genre[] }>("/genre/movie/list");
    return data.genres;
  },
};
