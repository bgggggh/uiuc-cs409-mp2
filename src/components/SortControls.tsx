import React from "react";

type SortKey = "title" | "vote_average" | "release_date";

type Props = {
  sortKey: SortKey;
  setSortKey: (k: SortKey) => void;
  ascending: boolean;
  setAscending: (b: boolean) => void;
};

export default function SortControls({ sortKey, setSortKey, ascending, setAscending }: Props) {
  return (
    <div className="sort">
      <label>
        Sort by:
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
        >
          <option value="title">Title</option>
          <option value="vote_average">Rating</option>
          <option value="release_date">Release Date</option>
        </select>
      </label>

      <div className="sort-order">
        <label>
          <input
            type="radio"
            name="order"
            value="asc"
            checked={ascending}
            onChange={() => setAscending(true)}
          />
          ascending
        </label>
        <label>
          <input
            type="radio"
            name="order"
            value="desc"
            checked={!ascending}
            onChange={() => setAscending(false)}
          />
          descending
        </label>
      </div>
    </div>
  );
}
