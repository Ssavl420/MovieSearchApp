import { renderMovies, clearMovieLS, searchBtnHandler } from "./functions.js"
import { searchMoviesHeaderBtn, searchMovieForm } from "./variables.js"

renderMovies()

searchMovieForm.addEventListener('submit', searchBtnHandler)
searchMoviesHeaderBtn.addEventListener('click', clearMovieLS)