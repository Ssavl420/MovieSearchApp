import { 
   validation,
   renderMovies,
   searchMovies,
   clearMovieLS,
   searchMovieForm,
   movieToSearchNode,
   searchMoviesHeaderBtn } from "./functions.js"


renderMovies()
searchMovieForm.addEventListener('submit', searchBtnHandler)
searchMoviesHeaderBtn.addEventListener('click', clearMovieLS)

function searchBtnHandler(event) {
   event.preventDefault();

   if (validation(this) == false) {
      movieToSearchNode.focus();
      console.error('Валидация НЕ пройдена')
      return;
   }
   console.log('Валидация пройдена')
   
   localStorage.removeItem('moviesArr');

   searchMovies();
}