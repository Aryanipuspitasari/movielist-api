import React from "react";
import { useState,  useEffect } from "react";
import { CiHeart } from "react-icons/ci";
// import HandleLogOutComponent from "./Logout.jsx";


const getMovieList = async () => {
  try {
    const apiKey = "09aa6c6b0f16d2e19cfcc34444ca5643";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error`);
    }

    const movieData = await response.json();
    const movieList = movieData.results;

    console.log(`movie list:`, movieList);
    return movieList;
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};


export function Main({user, onLogOut, children}) {
  const [allMovies, setAllMovies] = useState([]); // Store the original list
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieList = await getMovieList();
        setAllMovies(movieList); // Save the original list
         setMovies(movieList);
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };

    fetchData();
  }, []);

  const search = (item) => {
    setSearchTerm(item);
    const filteredMovies = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(item.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  const favoriteButton = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, favorited: !movie.favorited } : movie
      )
    );
  };

 
  return (
    <>
      <header className="App-header">
        <h1>Movies</h1>
        <input
          type="text"
          className="Movie-search"
          placeholder="Movie name..."
          onChange={({ target }) => search(target.value)}
          value={searchTerm}
        />
      </header>
      <div className="Movie-container">
        {movies.map((movie) => (
          <div className="Movie-wrapper" key={movie.id}>
            <h2 className="Movie-title">{movie.title}</h2>
            <img
              className="Movie-img"
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={`Pict of ${movie.title}`}
            />
            <h3 className="Movie-date">Release: {movie.release_date}</h3>
            <p className="Movie-rate">Rating: {movie.vote_average}</p>
            <button
              onClick={() => 
                favoriteButton(movie.id)} 
              style={{ backgroundColor: movie.favorited ? "#00FFFF" : "white", width:"50px", height:"30px"}}
            >
              <CiHeart />
            </button>
          </div>
        ))}

        {movies.length === 0 && <p>No movies found</p>}
      </div>

      {children}
    </>
  );
}
