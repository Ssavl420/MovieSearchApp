export function movieItem(parent) {
   const movieItem = document.createElement('li');
   movieItem.className = 'movieItem__wrap';
   parent.appendChild(movieItem);

   return movieItem
}

export function moviePosterWrap(parent) {
   const moviePosterWrap = document.createElement('div');
   moviePosterWrap.className = 'movie__poster';
   parent.appendChild(moviePosterWrap);

   return moviePosterWrap
}

export function moviePosterBG(array, parent) {
   const moviePosterBG = document.createElement('div');
   moviePosterBG.className = 'movie__poster-bg';
   moviePosterBG.style.cssText = `background: url('${array.poster.url}') center`;
   parent.appendChild(moviePosterBG);

   return moviePosterBG
}

export function moviePoster(array, parent) {
   const moviePoster = document.createElement('img');
   moviePoster.setAttribute('src', `${array.poster.url}`);
   moviePoster.setAttribute('alt', `${array.name}`);
   parent.appendChild(moviePoster);

   return moviePoster
}

export function movieInfo(parent) {
   const movieInfo = document.createElement('div');
   movieInfo.className = 'movie__info';
   parent.appendChild(movieInfo);

   return movieInfo
}

export function movieInfoWrap(parent) {
   const movieInfoWrap = document.createElement('div');
   movieInfoWrap.className = 'movie__info-wrap';
   parent.appendChild(movieInfoWrap);

   return movieInfoWrap
}

export function infoTitle(array, parent) {
   const infoTitle = document.createElement('p');
   infoTitle.className = 'info__title';
   infoTitle.innerHTML = `${array.name}`;
   parent.appendChild(infoTitle);

   return infoTitle
}

export function infoYear(array, parent) {
   const infoYear = document.createElement('p');
   infoYear.className = 'info__year';
   infoYear.innerHTML = `Год: ${array.year}`;
   parent.appendChild(infoYear);

   return infoYear
}

export function infoGenres(array, parent) {
   const infoGenres = document.createElement('p');
   infoGenres.className = 'info__genres';
   if (array.genres[1]?.name == undefined || null) {
      infoGenres.innerHTML = `Жанр: ${array?.genres[0]?.name}`;
   } else {infoGenres.innerHTML = `Жанр: ${array?.genres[0]?.name} / ${array.genres[1]?.name}`;}
   parent.appendChild(infoGenres);

   return infoGenres
}

export function infoLength(array, parent) {
   const infoLength = document.createElement('p');
   infoLength.className = 'info__length';
   if (array.movieLength == undefined || null) {
      infoLength.innerHTML = `Продолжительность серии: ${array?.seriesLength} мин.`;
   } else {infoLength.innerHTML = `Продолжительность: ${array?.movieLength} мин.`;}
   parent.appendChild(infoLength);

   return infoLength
}

export function infoBudget(array, parent) {
   const infoBudget = document.createElement('p');
   infoBudget.className = 'info__budget';
   if (array?.budget?.value == undefined || null) {
      infoBudget.style.cssText = 'display: none;';
   } else {infoBudget.innerHTML = `Бюджет: ${(array?.budget?.value).toLocaleString('ru-Ru')} $`;}
   parent.appendChild(infoBudget);

   return infoBudget
}

export function infoSales(array, parent) {
   const infoSales = document.createElement('p');
   infoSales.className = 'info__sales';
   if (array?.fees?.world?.value == undefined || null) {
      infoSales.style.cssText = 'display: none;';
   } else {infoSales.innerHTML = `Сборы в мире: ${(array?.fees?.world?.value).toLocaleString('ru-Ru')} $`;}
   parent.appendChild(infoSales);

   return infoSales
}

export function infoDirector(array, parent) {
   const infoDirector = document.createElement('p');
   infoDirector.className = 'info__director';
   infoDirector.innerHTML = `Режиссер: ${searchFilmDirector(array).name}`;
   parent.appendChild(infoDirector);

   return infoDirector
}

export function infoActors(array, parent) {
   const infoActors = document.createElement('p');
   infoActors.className = 'info__actors';
   infoActors.innerHTML = `В ролях: ${array.persons[0].name}, ${array.persons[1].name}, ${array.persons[2].name} и другие..`;
   parent.appendChild(infoActors);

   return infoActors
}

export function addToArrayBtn(parent) {
   const addToArrayBtn = document.createElement('p');
   addToArrayBtn.className = 'header__btn';
   addToArrayBtn.innerHTML = `Добавить в блокнот`;
   parent.appendChild(addToArrayBtn);

   return addToArrayBtn
}

export function movieDescription(parent) {
   const movieDescription = document.createElement('div');
   movieDescription.className = 'movie__description';
   parent.appendChild(movieDescription);

   return movieDescription
}

export function descriptionText(array, parent) {
   const descriptionText = document.createElement('p');
   descriptionText.className = 'description__text';
   if (array.description == undefined || null) {
      descriptionText.style.cssText = 'display: none;';
   } else {descriptionText.innerHTML = `${array.description}`;}
   parent.appendChild(descriptionText);

   return descriptionText
}

export function movieTrailer(parent) {
   const movieTrailer = document.createElement('div');
   movieTrailer.className = 'movie__trailer';
   parent.appendChild(movieTrailer);

   return movieTrailer
}

export function movieTrailerBtn(array, parent) {
   const movieTrailerBtn = document.createElement('a');
   movieTrailerBtn.className = 'header__btn';
   if (array?.videos?.trailers[4]?.url == undefined || null) {
      parent.style.cssText = 'display: none;';
   } else {movieTrailerBtn.setAttribute('href', `${array?.videos?.trailers[4]?.url}`);}
   movieTrailerBtn.setAttribute('target', `_blank`);
   movieTrailerBtn.innerHTML = `Трейлер`;
   parent.appendChild(movieTrailerBtn);

   return movieTrailerBtn
}

export function similarMovies(parent) {
   const similarMovies = document.createElement('div');
   similarMovies.className = 'similar__movies';
   parent.appendChild(similarMovies);

   return similarMovies
}

export function similarTitle(parent) {
   const similarTitle = document.createElement('p');
   similarTitle.className = 'similar__title';
   similarTitle.innerHTML = `Похожий фильм`;
   parent.appendChild(similarTitle);

   return similarTitle
}

export function similarWrap(parent) {
   const similarWrap = document.createElement('div');
   similarWrap.className = 'similar__wrap';
   parent.appendChild(similarWrap);

   return similarWrap
}

export function similarMovieTitleWrap(parent) {
   const similarMovieTitleWrap = document.createElement('div');
   similarMovieTitleWrap.className = 'similar__title';
   parent.appendChild(similarMovieTitleWrap);

   return similarMovieTitleWrap
}

export function similarMovieTitle(array, parent) {
   const similarMovieTitle = document.createElement('p');
   similarMovieTitle.innerHTML = `${array?.similarMovies[0]?.name}`;
   parent.appendChild(similarMovieTitle);

   return similarMovieTitle
}

export function similarPosterWrap(parent) {
   const similarPosterWrap = document.createElement('div');
   similarPosterWrap.className = 'similar__poster';
   parent.appendChild(similarPosterWrap);

   return similarPosterWrap
}

export function similarPoster(array, parent, oldParent) {
   const similarPoster = document.createElement('img');
   if (array.similarMovies[0]?.poster == undefined || null) {
      oldParent.style.cssText = 'display: none;';
   } else {similarPoster.setAttribute('src', `${array.similarMovies[0].poster.url}`);}
   similarPoster.setAttribute('alt', `${array?.similarMovies[0]?.name}`);
   parent.appendChild(similarPoster);

   return similarPoster
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

