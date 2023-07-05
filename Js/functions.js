import * as createMoviesList from "./createMoviesList.js"
import * as createMovieCard from "./createMovieCard.js"

export const movieToSearchNode = document.querySelector('#searchMovie')
export const searchMoviesHeaderBtn = document.querySelector('#searchMoviesHeaderBtn')
export const searchMovieForm = document.querySelector('#searchMovieForm')
const movieList = document.querySelector('#listFilms')
const search_Btn = document.querySelector('#searchBtn')
const key = 'V6697KC-1MZM6PN-HWFGXH5-FCMKD9X'

let movies = []
let movie = []


let moviesToWatch = []

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

   search_Btn.style.cssText = 'background-color: gray;';
   search_Btn.setAttribute("disabled", "disabled");

   fetch(`https://api.kinopoisk.dev/v1.3/movie?name=${movieTitle}&poster.url=%21null`, {   // Ограничение 200 запросов в сутки!!
      method: 'GET',
      headers: {
         'X-API-KEY': key,
      }
   })
   .then (data => {
      if (data.status !== 200) {
         search_Btn.removeAttribute("disabled", "disabled");
         search_Btn.style.cssText = "";
         animateElement(movieToSearchNode);
         createError(movieToSearchNode, 'Ошибка на сервере, попробуйте еще раз позже!')
         clearValue(movieToSearchNode);
         movieToSearchNode.focus();
         return;
      }
      return data.json()})
   .then (response => {
      if (response.docs.length < 1) {
         search_Btn.removeAttribute("disabled", "disabled");
         search_Btn.style.cssText = "";
         animateElement(movieToSearchNode);
         createError(movieToSearchNode, 'Неизвестная ошибка, попробуйте еще раз!')
         clearValue(movieToSearchNode);
         movieToSearchNode.focus();
         return
      }
      movies = response.docs;
      localStorage.setItem("moviesArr", JSON.stringify(movies));

      search_Btn.removeAttribute("disabled", "disabled");
      search_Btn.style.cssText = "";

      clearValue(movieToSearchNode);
      renderMovies();
   })
}

// Отрисовка списка фильмов
export function renderMovies() {
   if (localStorage.getItem("movieArr") !== null) {movie = JSON.parse(localStorage.getItem("movieArr")); renderMovieCard(); return};
   if (localStorage.getItem("moviesArr") !== null) movies = JSON.parse(localStorage.getItem("moviesArr"));

   searchMovieForm.style.cssText = null;

   if (movies == null || undefined) {movieList.innerHTML = ''; return};
   if (movies.length < 1) {movieList.innerHTML = ''; return};

   movieList.innerHTML = '';
   for (let index = 0; index < movies.length; index++) {

      const film = createMoviesList.createFilm(index, movieList)

      const filmInner = createMoviesList.createFilmInner(film)

      const filmPosterWrap = createMoviesList.createFilmPoster(filmInner)

      const poster = createMoviesList.createFilmPosterIMG(movies, index, filmPosterWrap)

      const rating = createMoviesList.createFilmRating(movies, index, filmPosterWrap)

      const filmBody = createMoviesList.createFilmBody(filmInner)

      const filmHeader = createMoviesList.createFilmHeader(filmBody)

      const title = createMoviesList.createFilmTitle(movies, index, filmHeader)

      const filmInfo = createMoviesList.createFilmInfo(filmHeader)

      createMoviesList.createFilmGenre(movies, index, filmInfo)

      createMoviesList.createFilmYear(movies, index, filmInfo)

      createMoviesList.createFilmLength(movies, index, filmInfo)

      createMoviesList.createFilmDescription(movies, index, filmBody)

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
      movie = response;
      localStorage.setItem("movieArr", JSON.stringify(movie));

      renderMovieCard()
   })
}

// Отрисовка карточки фильма
function renderMovieCard() {

   movieList.innerHTML = '';
   searchMovieForm.style.cssText = 'display: none';

   const movieItem = createMovieCard.movieItem(movieList)

   const moviePosterWrap = createMovieCard.moviePosterWrap(movieItem)

   const moviePosterBG = createMovieCard.moviePosterBG(movie, moviePosterWrap)

   const moviePoster = createMovieCard.moviePoster(movie, moviePosterWrap)

   const movieInfo = createMovieCard.movieInfo(movieItem)

   const movieInfoWrap = createMovieCard.movieInfoWrap(movieInfo)

   const infoTitle = createMovieCard.infoTitle(movie, movieInfoWrap)

   const infoYear = createMovieCard.infoYear(movie, movieInfoWrap)

   const infoGenres = createMovieCard.infoGenres(movie, movieInfoWrap)

   const infoLength = createMovieCard.infoLength(movie, movieInfoWrap)

   const infoBudget = createMovieCard.infoBudget(movie, movieInfoWrap)

   const infoSales = createMovieCard.infoSales(movie, movieInfoWrap)

   const infoDirector = createMovieCard.infoDirector(movie, movieInfoWrap)

   const infoActors = createMovieCard.infoActors(movie, movieInfoWrap)

   const addToArrayBtn = createMovieCard.addToArrayBtn(movieInfo)

   const movieDescription = createMovieCard.movieDescription(movieItem)

   const descriptionText = createMovieCard.descriptionText(movie, movieDescription)

   const movieTrailer = createMovieCard.movieTrailer(movieItem)

   const movieTrailerBtn = createMovieCard.movieTrailerBtn(movie, movieTrailer)

   const similarMovies = createMovieCard.similarMovies(movieItem)

   const similarTitle = createMovieCard.similarTitle(similarMovies)

   const similarMoviesWrap = createMovieCard.similarMoviesWrap(similarMovies)

   if (movie.similarMovies.length > 0) {

      for (let index = 0; index < movie.similarMovies.length; index++) {

         if (index === 6) break;
   
         const similarWrap = createMovieCard.similarWrap(similarMoviesWrap)
   
         const similarMovieTitleWrap = createMovieCard.similarMovieTitleWrap(similarWrap)
      
         // const similarMovieTitle = createMovieCard.similarMovieTitle(movie, similarMovieTitleWrap)
      
         const similarPosterWrap = createMovieCard.similarPosterWrap(similarWrap)
      
         const similarPoster = createMovieCard.similarPoster(movie.similarMovies, similarPosterWrap, index)
      
         similarPoster.addEventListener('click', () => getMovieInfo(movie.similarMovies, index))
      };
   } else {document.querySelector('.similar__movies').style.cssText = 'display: none;';}

   addToArrayBtn.addEventListener('click', writeToWatchList)
   movieList.addEventListener('click', () => {localStorage.removeItem('movieArr'); renderMovies()});
}


//Запись фильма в список для просмотра.
function writeToWatchList() {
   if (!localStorage.getItem("moviesToWatch")) {
      let moviesToWatch = [];
   } else { moviesToWatch = JSON.parse(localStorage.getItem("moviesToWatch"))}
   let movieName = {
      title: movie.name,
      checkboxValue: "unchecked"
   };
   moviesToWatch.unshift(movieName);
   localStorage.setItem("moviesToWatch", JSON.stringify(moviesToWatch));
}

export function clearMovieLS() {
   localStorage.removeItem('movieArr')
}

// // Поиск режиссера. 
// function searchFilmDirector(arr) {
//    let director = {}
//    // director - режиссер
//    // console.log(movie.persons[0].enProfession == 'actor')
//    arr.persons.forEach(element => {
//       if(element.enProfession === 'director') {
//          director.name = element.name;
//          director.photo = element.photo;
//       }  
//    });
//    return director;
// }

// Очищение поля input
function clearValue(element) {
   element.value = null;
}