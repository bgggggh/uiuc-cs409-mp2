import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ListView from "./pages/ListView";
import GalleryView from "./pages/GalleryView";
import DetailView from "./pages/DetailView";
import { MoviesProvider } from "./context/MoviesContext";
import "./styles.css";

export default function App() {
  return (
    <MoviesProvider>
      <BrowserRouter basename="/uiuc-cs409-mp2">
        <header className="topbar">
          <h1>🎬 TMDB Movies</h1>
          <div className="nav-center">
            <nav>
              <NavLink to="/" end>Search</NavLink>
              <NavLink to="/gallery">Gallery</NavLink>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ListView />} />
            <Route path="/gallery" element={<GalleryView />} />
            <Route path="/movie/:id" element={<DetailView />} />
          </Routes>
        </main>
      </BrowserRouter>
    </MoviesProvider>
  );
}
