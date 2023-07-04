import { 
   validation,
   renderMovies,
   searchMovies,
   clearMovieLS,
   searchMovieForm,
   movie_To_Search_Node,
   searchMoviesHeaderBtn } from "./functions.js"


renderMovies()
searchMovieForm.addEventListener('submit', searchBtnHandler)
searchMoviesHeaderBtn.addEventListener('click', clearMovieLS)

function searchBtnHandler(event) {
   event.preventDefault();

   if (validation(this) == false) {
      movie_To_Search_Node.focus();
      console.error('Валидация НЕ пройдена')
      return null;
   }
   console.log('Валидация пройдена')
   
   localStorage.removeItem('moviesArr');

   searchMovies();
}