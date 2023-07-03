import { 
   validation,
   renderMovies,
   searchMovies,
   searchMovieForm } from "./functions.js"

renderMovies()
searchMovieForm.addEventListener('submit', searchBtnHandler)

function searchBtnHandler(event) {
   event.preventDefault();

   if (validation(this) == false) {
      movie_To_Search_Node.focus();
      console.error('Валидация НЕ пройдена')
      return null;
   }
   console.log('Валидация пройдена')
   
   localStorage.removeItem('movies');

   searchMovies();
}