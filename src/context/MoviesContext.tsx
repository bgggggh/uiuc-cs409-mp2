import React, { createContext, useContext, useState } from "react";
import { Movie } from "../types";

type MoviesContextType = {
  currentList: Movie[];
  setCurrentList: (movies: Movie[]) => void;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentList, setCurrentList] = useState<Movie[]>([]);
  return (
    <MoviesContext.Provider value={{ currentList, setCurrentList }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesCtx = () => {
  const context = useContext(MoviesContext);
  if (!context) throw new Error("useMoviesCtx must be used within MoviesProvider");
  return context;
};
