import React from "react";
import { Link } from "react-router-dom";
import { IMG } from "../api/tmdb";
import { Movie } from "../types";

export default function MovieCard({ m }: { m: Movie }) {
  const poster = IMG.poster(m.poster_path);
  return (
    <Link to={`/movie/${m.id}`} className="card">
      {poster ? <img src={poster} alt={m.title} /> : <div className="noimg">No Image</div>}
      <div className="meta">
        <div className="title">{m.title}</div>
        <div className="sub">⭐ {m.vote_average.toFixed(1)} · {m.release_date}</div>
      </div>
    </Link>
  );
}
