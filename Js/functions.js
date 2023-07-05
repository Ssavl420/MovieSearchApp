import { createFilm, 
         createFilmInner, 
         createFilmPoster, 
         createFilmPosterIMG, 
         createFilmRating, 
         createFilmBody, 
         createFilmHeader, 
         createFilmTitle, 
         createFilmInfo, 
         createFilmGenre, 
         createFilmYear, 
         createFilmLength, 
         createFilmDescription } from "./createMoviesList.js"

import { createMovieItem, 
         createMoviePosterWrap, 
         createMoviePosterBG, 
         createMoviePoster, 
         createMovieInfo, 
         createMovieInfoWrap, 
         createInfoTitle, 
         createInfoYear, 
         createInfoGenres, 
         createInfoLength, 
         createInfoBudget, 
         createInfoSales, 
         createInfoDirector, 
         createInfoActors, 
         createAddToArrayBtn, 
         createMovieDescription, 
         createDescriptionText, 
         createMovieTrailer, 
         createMovieTrailerBtn, 
         createSimilarMovies, 
         createSimilarTitle, 
         createSimilarMoviesWrap, 
         createSimilarWrap, 
         createSimilarMovieTitleWrap, 
         createSimilarPosterWrap, 
         createSimilarPoster } from "./createMovieCard.js"

import { movieToSearchNode, searchMovieForm, movieList, searchBtn, key } from "./variables.js";

// Поиск фильмов
export function searchBtnHandler(event) {
   event.preventDefault();

   if (validation(this) == false) {
      movieToSearchNode.focus();
      return;
   }
   
   localStorage.removeItem('moviesArr');

   searchMovies();
}
// Валидация поля ввода
export function validation(form) {
   let result = true;

   const allInputs = form.querySelectorAll('input');
   const pattern = /[^а-яА-ЯёЁ0-9\s\.\,\:\!\?\/]+/g;

   for (const input of allInputs) {
      removeError(input);
      if(input.value == "") {
         createError(input, 'Поле не заполнено')
         animateElement(input);
         result = false;
      }
      if(!input.value == "" && input.value.trim() == "") {
         createError(input, 'Недопустимые символы')
         clearValue(input)
         animateElement(input);
         result = false;
      }
      if(!input.value == "" && pattern.test(input.value)) {
         createError(input, 'Недопустимые или иностранные символы')
         clearValue(input)
         animateElement(input);
         result = false;
      }
   }
   return result;
}
// Создание элементов
export function newElement(options) {
   const el = document.createElement(options.tag);

   for (const[key, value] of Object.entries(options.params)) {
      if (key == 'classList') {
         for (const newClass of value) {
            el.classList.add(newClass)
         }
      } if (el[key] = !value) {
         // options.params.value = null
         console.log(options.params)
         
         console.log(`${el[key]} innerHTML EMPTY!`)
      } else {
         el[key] = value
      }
   }

   if (options.elements !== undefined) {
      for (const element of options.elements) {
         newElement({
            tag: element.tag,
            params: element.params,
            parent: el
         })
      }
   }

   if (options.parent !== undefined) options.parent.append(el)

   return el;
}
// Удаление ошибки
export function removeError(input) {
   const parent = input.parentNode;
   if (parent.classList.contains('error')) {
      parent.querySelector('.error__label').remove()
      parent.classList.remove('error')
   }
}
// Создание ошибки
export function createError(input, text) {
   const parent = input.parentNode;
   const errorLabel = document.createElement('label');

   errorLabel.classList.add('error__label');
   errorLabel.innerText = text;
   parent.appendChild(errorLabel);
   parent.classList.add('error');
}
// Анимация элемента
export function animateElement(element) {
   element.classList.add('animation')
   
   setTimeout(() => {
      element.classList.remove('animation')
   }, 400);
}
// Поиск фильма 
export function searchMovies() {
   const movieTitle = movieToSearchNode.value;

   removeError(movieToSearchNode);

   searchBtn.style.cssText = 'background-color: gray;';
   searchBtn.setAttribute("disabled", "disabled");

   fetch(`https://api.kinopoisk.dev/v1.3/movie?name=${movieTitle}&poster.url=%21null`, {   // Ограничение 200 запросов в сутки!!
      method: 'GET',
      headers: {
         'X-API-KEY': key,
      }
   })
   .then (data => {
      if (data.status !== 200) {
         searchBtn.removeAttribute("disabled", "disabled");
         searchBtn.style.cssText = "";
         animateElement(movieToSearchNode);
         createError(movieToSearchNode, 'Ошибка на сервере, попробуйте еще раз позже!')
         clearValue(movieToSearchNode);
         movieToSearchNode.focus();
         return;
      }
      return data.json()})
   .then (response => {
      if (response.docs.length < 1) {
         searchBtn.removeAttribute("disabled", "disabled");
         searchBtn.style.cssText = "";
         animateElement(movieToSearchNode);
         createError(movieToSearchNode, 'Неизвестная ошибка, попробуйте еще раз!')
         clearValue(movieToSearchNode);
         movieToSearchNode.focus();
         return
      }
      let movies = response.docs;
      localStorage.setItem("moviesArr", JSON.stringify(movies));

      searchBtn.removeAttribute("disabled", "disabled");
      searchBtn.style.cssText = "";

      clearValue(movieToSearchNode);
      renderMovies();
   })
}
// Отрисовка списка фильмов
export function renderMovies() {
   let movie = [];
   let movies = [];
   if (localStorage.getItem("movieArr") !== null) {movie = JSON.parse(localStorage.getItem("movieArr")); renderMovieCard(); return};
   if (localStorage.getItem("moviesArr") !== null) movies = JSON.parse(localStorage.getItem("moviesArr"));

   searchMovieForm.style.cssText = null;

   if (movies == null || undefined) {movieList.innerHTML = ''; return};
   if (movies.length < 1) {movieList.innerHTML = ''; return};

   movieList.innerHTML = '';
   for (let index = 0; index < movies.length; index++) {

      const film = createFilm(index, movieList)
      const filmInner = createFilmInner(film)
      const filmPosterWrap = createFilmPoster(filmInner)
      const poster = createFilmPosterIMG(movies, index, filmPosterWrap)
      const rating = createFilmRating(movies, index, filmPosterWrap)
      const filmBody = createFilmBody(filmInner)
      const filmHeader = createFilmHeader(filmBody)
      const title = createFilmTitle(movies, index, filmHeader)
      const filmInfo = createFilmInfo(filmHeader)
      createFilmGenre(movies, index, filmInfo)
      createFilmYear(movies, index, filmInfo)
      createFilmLength(movies, index, filmInfo)
      createFilmDescription(movies, index, filmBody)

      film.addEventListener('click', () => getMovieInfo(movies, index));
   }
}
// Получение данных о фильме
function getMovieInfo(array, index) {
   fetch(`https://api.kinopoisk.dev/v1.3/movie/${array[index].id}`, {   // Ограничение 200 запросов в сутки!!
      method: 'GET',
      headers: {
         'X-API-KEY': key,
      }
   })
   .then (data => {
      if (data.status !== 200) {
         return;
      }
   return data.json()})
   .then (response => {
      let movie = response;
      localStorage.setItem("movieArr", JSON.stringify(movie));

      renderMovieCard()
   })
}
// Отрисовка карточки фильма
function renderMovieCard() {
   let movie = [];
   if (localStorage.getItem("movieArr") !== null) {movie = JSON.parse(localStorage.getItem("movieArr"))};

   movieList.innerHTML = '';
   searchMovieForm.style.cssText = 'display: none';

   const movieItem = createMovieItem(movieList)
   const moviePosterWrap = createMoviePosterWrap(movieItem)
   const moviePosterBG = createMoviePosterBG(movie, moviePosterWrap)
   const moviePoster = createMoviePoster(movie, moviePosterWrap)
   const movieInfo = createMovieInfo(movieItem)
   const movieInfoWrap = createMovieInfoWrap(movieInfo)
   const infoTitle = createInfoTitle(movie, movieInfoWrap)
   const infoYear = createInfoYear(movie, movieInfoWrap)
   const infoGenres = createInfoGenres(movie, movieInfoWrap)
   const infoLength = createInfoLength(movie, movieInfoWrap)
   const infoBudget = createInfoBudget(movie, movieInfoWrap)
   const infoSales = createInfoSales(movie, movieInfoWrap)
   const infoDirector = createInfoDirector(movie, movieInfoWrap)
   const infoActors = createInfoActors(movie, movieInfoWrap)
   const addToArrayBtn = createAddToArrayBtn(movieInfo)
   const movieDescription = createMovieDescription(movieItem)
   const descriptionText = createDescriptionText(movie, movieDescription)
   const movieTrailer = createMovieTrailer(movieItem)
   const movieTrailerBtn = createMovieTrailerBtn(movie, movieTrailer)
   const similarMovies = createSimilarMovies(movieItem)
   const similarTitle = createSimilarTitle(similarMovies)
   const similarMoviesWrap = createSimilarMoviesWrap(similarMovies)

   if (movie.similarMovies.length > 0) {

      for (let index = 0; index < movie.similarMovies.length; index++) {

         if (index === 6) break;
   
         const similarWrap = createSimilarWrap(similarMoviesWrap)
         const similarMovieTitleWrap = createSimilarMovieTitleWrap(similarWrap)
         const similarPosterWrap = createSimilarPosterWrap(similarWrap)
         const similarPoster = createSimilarPoster(movie.similarMovies, similarPosterWrap, index)
      
         similarPoster.addEventListener('click', () => getMovieInfo(movie.similarMovies, index))
      };
   } else {document.querySelector('.similar__movies').style.cssText = 'display: none;';}

   addToArrayBtn.addEventListener('click', writeToWatchList)
   movieList.addEventListener('click', (event) => {

      if (event.target.parentNode.classList.contains('similar__poster')) return;
      
      localStorage.removeItem('movieArr'); 
      renderMovies()});
}
//Запись фильма в список для просмотра.
function writeToWatchList() {
   let movie = JSON.parse(localStorage.getItem("movieArr"))
   let moviesToWatch = [];
   if (localStorage.getItem("moviesToWatch") !== null) moviesToWatch = JSON.parse(localStorage.getItem("moviesToWatch"));

   let movieName = {
      title: movie.name,
      checkboxValue: "unchecked"
   };
   moviesToWatch.unshift(movieName);
   localStorage.setItem("moviesToWatch", JSON.stringify(moviesToWatch));
}
// Очищение поля input
function clearValue(element) {
   element.value = null;
}
export function clearMovieLS() {
   localStorage.removeItem('movieArr')
}