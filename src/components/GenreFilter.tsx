import React from "react";
import { Genre } from "../types";

export default function GenreFilter({
  genres,
  selected,
  toggle,
}: {
  genres: Genre[];
  selected: Set<number>;
  toggle: (id: number) => void;
}) {
  return (
    <div className="chips">
      {genres.map((g) => (
        <button
          key={g.id}
          className={`chip ${selected.has(g.id) ? "active" : ""}`}
          onClick={() => toggle(g.id)}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
