import React, { useEffect, useMemo, useState } from "react";
import { tmdb } from "../api/tmdb";
import { Movie } from "../types";
import { useMoviesCtx } from "../context/MoviesContext";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";
import MovieCard from "../components/MovieCard";

export default function ListView() {
  const [q, setQ] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortKey, setSortKey] = useState("title");
  const [ascending, setAscending] = useState(true);
  const { setCurrentList } = useMoviesCtx();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!q.trim()) return;
      setLoading(true);
      const r = await tmdb.searchMovies(q);
      setMovies(r.results);
      setCurrentList(r.results);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [q, setCurrentList]);

  const sorted = useMemo(() => {
    const arr = [...movies];
    arr.sort((a, b) => {
      const av = (a as any)[sortKey] ?? "";
      const bv = (b as any)[sortKey] ?? "";
      return ascending
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [movies, sortKey, ascending]);

  return (
    <section className="container">
      <h2>Search Movies</h2>
      <div className="controls">
        <SearchBar value={q} onChange={setQ} />
        <SortControls
          sortKey={sortKey as any}
          setSortKey={setSortKey}
          ascending={ascending}
          setAscending={setAscending}
        />
      </div>
      {loading ? <p>Loading…</p> : <div className="grid">{sorted.map((m) => <MovieCard key={m.id} m={m} />)}</div>}
    </section>
  );
}
