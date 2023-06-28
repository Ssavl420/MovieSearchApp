const movie_To_Search_Node = document.querySelector('#searchMovie')
const searchMovieForm = document.querySelector('#searchMovieForm')
const search_Btn = document.querySelector('#searchBtn')
const movieList = document.querySelector('#listFilms')
const key = 'V6697KC-1MZM6PN-HWFGXH5-FCMKD9X'

let movies = JSON.parse(localStorage.getItem("movies"))
let movie = JSON.parse(localStorage.getItem('movie'))
let moviesToWatch = JSON.parse(localStorage.getItem('moviesToWatch'));

//-------------------------------------------------------------------------------------------------
renderMoviesList()
searchMovieForm.addEventListener('submit', searchBtnHandler)
//-------------------------------------------------------------------------------------------------

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

// Валидация поля ввода
function validation(form) {
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

// Поиск фильма 
function searchMovies() {
   const movieTitle = movie_To_Search_Node.value;

   removeError(movie_To_Search_Node);

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
         animateElement(movie_To_Search_Node);
         createError(movie_To_Search_Node, 'Ошибка на сервере, попробуйте еще раз позже!')
         clearValue(movie_To_Search_Node);
         movie_To_Search_Node.focus();
         return null;
      }
      return data.json()})
   .then (response => {
      if (response.docs.length < 1) {
         search_Btn.removeAttribute("disabled", "disabled");
         search_Btn.style.cssText = "";
         animateElement(movie_To_Search_Node);
         createError(movie_To_Search_Node, 'Неизвестная ошибка, попробуйте еще раз!')
         clearValue(movie_To_Search_Node);
         movie_To_Search_Node.focus();
         return null
      }
      movies = response.docs;
      localStorage.setItem("movies", JSON.stringify(movies));

      search_Btn.removeAttribute("disabled", "disabled");
      search_Btn.style.cssText = "";

      clearValue(movie_To_Search_Node);
      renderMoviesList();
   })
}

// Отрисовка списка фильмов
function renderMoviesList() {
   localStorage.removeItem('movie');
   
   if (!movies) {return null};

   if (movies.length < 1) {return null};

   movieList.innerHTML = '';
   for (let i = 0; i < movies.length; i++) {

      let film = document.createElement('li');
      let filmInner = document.createElement('div');
      let filmPoster = document.createElement('div');
      let poster = document.createElement('img');
      let rating = document.createElement('p');
      let filmBody = document.createElement('div');
      let filmHeader = document.createElement('div');
      let movieTitle = document.createElement('p');
      let filmInfo = document.createElement('div');
      let movieGenre = document.createElement('p');
      let movieYear = document.createElement('p');
      let movieLength = document.createElement('p');
      let shortDescription = document.createElement('p');

      film.className = 'film';
      filmInner.className = 'film__inner';
      filmPoster.className = 'film__poster';
      rating.className = 'rating';
      filmBody.className = 'film__body';
      filmHeader.className = 'film__header';
      movieTitle.className = 'title';
      filmInfo.className = 'film__info';
      movieGenre.className = 'genres';
      movieYear.className = 'years';
      movieLength.className = 'film__length';
      shortDescription.className = 'shortDescription';

      film.setAttribute('id', i);
      if (movies[i].poster.url == undefined) {
         poster.setAttribute('src', ``);
      } else {poster.setAttribute('src', `${movies[i]?.poster.url}`);}
      poster.setAttribute('alt', `${movies[i]?.name}`);
      poster.setAttribute('title', `${movies[i]?.name}`);
      rating.setAttribute('title', `Рейтинг IMDB`);

      rating.innerHTML = `${movies[i]?.rating?.imdb}`;
      movieTitle.innerHTML = `${movies[i]?.name}`;
      movieYear.innerHTML = `${movies[i]?.year}`;

      if(movies[i]?.genres[1]?.name == undefined) {
         movieGenre.innerHTML = `${movies[i]?.genres[0]?.name}`;
      } else {movieGenre.innerHTML = `${movies[i]?.genres[0]?.name} / ${movies[i]?.genres[1]?.name}`};

      if(movies[i]?.shortDescription === null) {
         shortDescription.innerHTML = '';
      } else {shortDescription.innerHTML = `${movies[i]?.shortDescription}`};

      movieList.appendChild(film);
      film.appendChild(filmInner);
      filmInner.appendChild(filmPoster);
      filmPoster.appendChild(poster);
      filmPoster.appendChild(rating);
      filmInner.appendChild(filmBody);
      filmBody.appendChild(filmHeader);
      filmHeader.appendChild(movieTitle);
      filmHeader.appendChild(filmInfo);
      filmInfo.appendChild(movieYear);
      filmInfo.appendChild(movieGenre);
      filmInfo.appendChild(movieLength)
      filmBody.appendChild(shortDescription);

      film.addEventListener('click', () => getMovieInfo(i));
   }
}

// Получение данных о фильме
function getMovieInfo(index) {
   fetch(`https://api.kinopoisk.dev/v1.3/movie/${movies[index].id}`, {   // Ограничение 200 запросов в сутки!!
      method: 'GET',
      headers: {
         'X-API-KEY': key,
      }
   })
   .then (data => {
      if (data.status !== 200) {
         return null;
      }
   return data.json()})
   .then (response => {
      movie = response;
      localStorage.setItem("movie", JSON.stringify(movie));

      renderMovieCard()
   })
}

// Отрисовка карточки фильма
function renderMovieCard() {

   movieList.innerHTML = '';
   // let movieListHTML = '';

   document.querySelector('#searchMovieForm').style.cssText = 'display: none';

   let movieItem = document.createElement('li');
   movieItem.className = 'movieItem__wrap';
   movieList.appendChild(movieItem);

   let moviePosterWrap = document.createElement('div');
   moviePosterWrap.className = 'movie__poster';
   movieItem.appendChild(moviePosterWrap);

   let moviePosterBG = document.createElement('div');
   moviePosterBG.className = 'movie__poster-bg';
   moviePosterBG.style.cssText = `background: url('${movie.poster.url}') center`;
   moviePosterWrap.appendChild(moviePosterBG);

   let moviePoster = document.createElement('img');
   moviePoster.setAttribute('src', `${movie.poster.url}`);
   moviePoster.setAttribute('alt', `${movie.name}`);
   moviePosterWrap.appendChild(moviePoster);

   let movieInfo = document.createElement('div');
   movieInfo.className = 'movie__info';
   movieItem.appendChild(movieInfo);

   let movieInfoWrap = document.createElement('div');
   movieInfoWrap.className = 'movie__info-wrap';
   movieInfo.appendChild(movieInfoWrap);

   let infoTitle = document.createElement('p');
   infoTitle.className = 'info__title';
   infoTitle.innerHTML = `${movie.name}`;
   movieInfoWrap.appendChild(infoTitle);

   let infoYear = document.createElement('p');
   infoYear.className = 'info__year';
   infoYear.innerHTML = `Год: ${movie.year}`;
   movieInfoWrap.appendChild(infoYear);

   let infoGenres = document.createElement('p');
   infoGenres.className = 'info__genres';
   if (movie.genres[1]?.name == undefined || null) {
      infoGenres.innerHTML = `Жанр: ${movie?.genres[0]?.name}`;
   } else {infoGenres.innerHTML = `Жанр: ${movie?.genres[0]?.name} / ${movie.genres[1]?.name}`;}
   movieInfoWrap.appendChild(infoGenres);

   let infoLength = document.createElement('p');
   infoLength.className = 'info__length';
   if (movie.movieLength == undefined || null) {
      infoLength.innerHTML = `Продолжительность серии: ${movie?.seriesLength} мин.`;
   } else {infoLength.innerHTML = `Продолжительность: ${movie?.movieLength} мин.`;}
   movieInfoWrap.appendChild(infoLength);

   let infoBudget = document.createElement('p');
   infoBudget.className = 'info__budget';
   if (movie?.budget?.value == undefined || null) {
      infoBudget.style.cssText = 'display: none;';
   } else {infoBudget.innerHTML = `Бюджет: ${(movie?.budget?.value).toLocaleString('ru-Ru')} $`;}
   movieInfoWrap.appendChild(infoBudget);

   let infoSales = document.createElement('p');
   infoSales.className = 'info__sales';
   if (movie?.fees?.world?.value == undefined || null) {
      infoSales.style.cssText = 'display: none;';
   } else {infoSales.innerHTML = `Сборы в мире: ${(movie?.fees?.world?.value).toLocaleString('ru-Ru')} $`;}
   movieInfoWrap.appendChild(infoSales);

   let infoDirector = document.createElement('p');
   infoDirector.className = 'info__director';
   infoDirector.innerHTML = `Режиссер: ${searchFilmDirector(movie).name}`;
   movieInfoWrap.appendChild(infoDirector);

   let infoActors = document.createElement('p');
   infoActors.className = 'info__actors';
   infoActors.innerHTML = `В ролях: ${movie.persons[0].name}, ${movie.persons[1].name}, ${movie.persons[2].name} и другие..`;
   movieInfoWrap.appendChild(infoActors);

   let addToArrayBtn = document.createElement('p');
   addToArrayBtn.className = 'header__btn';
   addToArrayBtn.innerHTML = `Добавить в список посмотреть`;
   movieInfo.appendChild(addToArrayBtn);

   let movieDescription = document.createElement('div');
   movieDescription.className = 'movie__description';
   movieItem.appendChild(movieDescription);

   let descriptionText = document.createElement('p');
   descriptionText.className = 'description__text';
   if (movie.description == undefined || null) {
      descriptionText.style.cssText = 'display: none;';
   } else {descriptionText.innerHTML = `${movie.description}`;}
   movieDescription.appendChild(descriptionText);

   let movieTrailer = document.createElement('div');
   movieTrailer.className = 'movie__trailer';
   movieItem.appendChild(movieTrailer);

   let movieTrailerBtn = document.createElement('a');
   if (movie?.videos?.trailers[4]?.url == undefined || null) {
      movieTrailer.style.cssText = 'display: none;';
   } else {movieTrailerBtn.setAttribute('href', `${movie?.videos?.trailers[4]?.url}`);}
   movieTrailerBtn.setAttribute('target', `_blank`);
   movieTrailerBtn.innerHTML = `Трейлер`;
   movieTrailer.appendChild(movieTrailerBtn);

   let similarMovies = document.createElement('div');
   similarMovies.className = 'similar__movies';
   movieItem.appendChild(similarMovies);

   let similarTitle = document.createElement('p');
   similarTitle.className = 'similar__title';
   similarTitle.innerHTML = `Похожие фильмы`;
   similarMovies.appendChild(similarTitle);

   let similarWrap = document.createElement('div');
   similarWrap.className = 'similar__wrap';
   similarMovies.appendChild(similarWrap);

   let similarMovieTitleWrap = document.createElement('div');
   similarMovieTitleWrap.className = 'similar__title';
   similarWrap.appendChild(similarMovieTitleWrap);

   let similarMovieTitle = document.createElement('p');
   similarMovieTitle.innerHTML = `${movie?.similarMovies[0]?.name}`;
   similarMovieTitleWrap.appendChild(similarMovieTitle);

   let similarPosterWrap = document.createElement('div');
   similarPosterWrap.className = 'similar__poster';
   similarWrap.appendChild(similarPosterWrap);

   let similarPoster = document.createElement('img');
   if (movie.similarMovies[0]?.poster == undefined || null) {
      similarMovies.style.cssText = 'display: none;';
   } else {similarPoster.setAttribute('src', `${movie.similarMovies[0].poster.url}`);}
   similarPoster.setAttribute('alt', `${movie?.similarMovies[0]?.name}`);
   similarPosterWrap.appendChild(similarPoster);

   addToArrayBtn.addEventListener('click', () => {
      let movieName = {
         title: movie.name,
         checkboxValue: "unchecked"
      };
      moviesToWatch.unshift(movieName);
      localStorage.setItem('moviesToWatch', JSON.stringify(moviesToWatch));
   })
   movieList.addEventListener('click', renderMoviesList);
}

// Поиск режиссера. 
function searchFilmDirector(arr) {
   let director = {}
   // director - режиссер
   // console.log(movie.persons[0].enProfession == 'actor')
   arr.persons.forEach(element => {
      if(element.enProfession === 'director') {
         director.name = element.name;
         director.photo = element.photo;
      }  
   });
   return director;
}

// Очищение поля input
function clearValue(element) {
   element.value = null;
}

// Анимация элемента
function animateElement(element) {
   element.classList.add('animation')
   
   setTimeout(() => {
      element.classList.remove('animation')
   }, 400);
}

// Создание ошибки
function createError(input, text) {
   const parent = input.parentNode;
   const errorLabel = document.createElement('label');

   errorLabel.classList.add('error__label');
   errorLabel.innerText = text;
   parent.appendChild(errorLabel);
   parent.classList.add('error');
}

// Удаление ошибки
function removeError(input) {
   const parent = input.parentNode;
   if (parent.classList.contains('error')) {
      parent.querySelector('.error__label').remove()
      parent.classList.remove('error')
   }
}
// ПК или Мобильное устройство?
const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows()
      );
   },
}
if (isMobile.any()) {
   document.body.classList.add("_touch");
} else {
   document.body.classList.add("_pc");
}


// `<li class="movieItem__wrap">
//    <div class="movie__poster">
//       <div class="movie__poster-bg"></div>
//       <img src="https://st.kp.yandex.net/images/film_big/760326.jpg" alt="Люси">
//    </div>
//    <div class="movie__info">
//       <div class="movie__info-wrap">
//          <p class="info__title">Люси</p>
//          <p class="info__year">Год: 2014</p>
//          <p class="info__genres">Жанр: Боевик</p>
//          <p class="info__length">Продолжительность: 89 мин.</p>
//          <p class="info__buget">Бюджет: 40 000 000 $</p>
//          <p class="info__sales">Сборы в мире: 458 863 600 $</p>
//          <p class="info__director">Режиссер: Люк Бессон</p>
//          <p class="info__actors">В ролях: Скарлетт Йохансон, Деми Мур, Ричард Гид и другие</p>
//       </div>
//       <p class="header__btn">Добавить в список посмотреть</p>
//    </div>
//    <div class="movie__description">
//       <p class="description__text">Еще вчера она была просто сексапильной блондинкой, а сегодня -
//          самое опасное и смертоносное создание на планете со сверхъестественными способностями и
//          интеллектом. То, что совсем недавно лучшие умы мира считали фантастической теорией, для нее
//          стало реальностью. И теперь из добычи она превратится в охотницу. Ее зовут Люси...</p>
//    </div>
//    <div class="movie__trailer">
//       <a href="https://www.youtube.com/embed/3zqMB_h4-zk" target="_blank">Трейлер</a>
//    </div>
//    <div class="similar__movies">
//       <p class="similar__title">Похожие фильмы</p>
//       <div class="similar__wrap">
//          <div class="similar__title">
//             <p>Области тьмы</p>
//          </div>
//          <div class="similar__poster">
//             <img
//                src="https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/d3bfd32d-41b4-48ad-9584-b3fc1f5669d4/x1000"
//                alt="Области тьмы">
//          </div>
//       </div>
//    </div>
// </li>`







// `<li id="${[i]}" class="film">
//    <div class="film__inner">
//       <div class="film__poster">
//          <img src="${movies[i]?.poster.url}"
//             alt="${movies[i]?.name}" title="${movies[i]?.name}">
//          <p class="rating" title="Рейтинг IMDB">${movies[i]?.rating?.imdb}</p>
//       </div>
//       <div class="film__body">
//          <div class="film__header">
//             <p class="title">${movies[i]?.name}</p>
//             <div class="film__info">
//                <p class="genres">${movies[i]?.genres[0]?.name}</p>
//                <p class="years">${movies[i]?.year}</p>
//             </div>
//          </div>
//          <p class="shortDescription">${movies[i]?.shortDescription}</p>
//       </div>
//    </div>
// </li>`

