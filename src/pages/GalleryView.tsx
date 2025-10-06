import React, { useEffect, useState } from "react";
import { tmdb } from "../api/tmdb";
import { Genre, Movie } from "../types";
import GenreFilter from "../components/GenreFilter";
import MovieCard from "../components/MovieCard";
import { useMoviesCtx } from "../context/MoviesContext";

export default function GalleryView() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [movies, setMovies] = useState<Movie[]>([]);
  const { setCurrentList } = useMoviesCtx();

  useEffect(() => {
    tmdb.getGenres().then(setGenres);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const with_genres = [...selected].join(",") || undefined;
      const r = await tmdb.discoverMovies({ with_genres, sort_by: "popularity.desc" });
      setMovies(r.results);
      setCurrentList(r.results);
    };
    fetchMovies();
  }, [selected, setCurrentList]);

  const toggle = (id: number) => {
    const copy = new Set(selected);
    copy.has(id) ? copy.delete(id) : copy.add(id);
    setSelected(copy);
  };

  return (
    <section className="container">
      <h2>Gallery</h2>
      <GenreFilter genres={genres} selected={selected} toggle={toggle} />
      <div className="grid">{movies.map((m) => <MovieCard key={m.id} m={m} />)}</div>
    </section>
  );
}
