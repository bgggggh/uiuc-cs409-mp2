import React from "react";

type Props = { value: string; onChange: (v: string) => void };

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      className="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search movies..."
    />
  );
}
