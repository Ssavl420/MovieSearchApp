import { 
   validation,
   renderMovies,
   searchMovies,
   searchMovieForm,
   movie_To_Search_Node } from "./functions.js"


renderMovies()
searchMovieForm.addEventListener('submit', searchBtnHandler)
document.querySelectorAll('.header__btn' () => {
   window.navigator.vibrate(200)
})

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