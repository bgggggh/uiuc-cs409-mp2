import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { tmdb, IMG } from "../api/tmdb";
import { Movie } from "../types";
import { useMoviesCtx } from "../context/MoviesContext";

export default function DetailView() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const { currentList } = useMoviesCtx();
  const navigate = useNavigate();

  useEffect(() => {
    tmdb.getMovie(id!).then(setMovie);
  }, [id]);

  const idx = currentList.findIndex((m) => String(m.id) === id);
  const prev = idx > 0 ? currentList[idx - 1] : null;
  const next = idx < currentList.length - 1 ? currentList[idx + 1] : null;

  if (!movie) return <p>Loading…</p>;

  return (
    <section className="container detail">
      <div className="detail-header">
        <button disabled={!prev} onClick={() => navigate(`/movie/${prev?.id}`)}>← Prev</button>
        <Link to="/">Back</Link>
        <button disabled={!next} onClick={() => navigate(`/movie/${next?.id}`)}>Next →</button>
      </div>
      <div className="detail-body">
        {movie.poster_path && <img src={IMG.poster(movie.poster_path)} alt={movie.title} />}
        <div>
          <h2>{movie.title}</h2>
          <p>⭐ {movie.vote_average.toFixed(1)} | {movie.release_date}</p>
          <p>{movie.overview}</p>
          {movie.genres && <p><b>Genres:</b> {movie.genres.map((g) => g.name).join(", ")}</p>}
        </div>
      </div>
    </section>
  );
}
