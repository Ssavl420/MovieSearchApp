export function createFilm(id, parent) {
   const film = document.createElement('li');
   film.className = 'film';
   film.setAttribute('id', id);

   parent.appendChild(film);

   return film;
}

export function createFilmInner(parent) {
   const filmInner = document.createElement('div');
   filmInner.className = 'film__inner';

   parent.appendChild(filmInner);
   return filmInner;
}

export function createFilmPoster(parent) {
   const filmPoster = document.createElement('div');
   filmPoster.className = 'film__poster';

   parent.appendChild(filmPoster);
   return filmPoster;
}

export function createFilmPosterIMG(array, id, parent) {
   const filmPosterIMG = document.createElement('img');
   filmPosterIMG.setAttribute('src', `${array[id]?.poster.url}`);
   filmPosterIMG.setAttribute('alt', `${array[id]?.name??" "}`);
   filmPosterIMG.setAttribute('title', `${array[id]?.name??" "}`);

   parent.appendChild(filmPosterIMG);
   return filmPosterIMG;
}

export function createFilmRating(array, id, parent) {
   const filmRating = document.createElement('div');
   filmRating.className = 'rating';

   filmRating.setAttribute('alt', `${array[id]?.name??" "}`);
   filmRating.setAttribute('title', `Рейтинг IMDB`);

   filmRating.innerHTML = `${array[id]?.rating?.imdb??" "}`;

   parent.appendChild(filmRating);
   return filmRating;
}

export function createFilmBody(parent) {
   const filmBody = document.createElement('div');
   filmBody.className = 'film__body';

   parent.appendChild(filmBody);
   return filmBody;
}

export function createFilmHeader(parent) {
   const filmHeader = document.createElement('div');
   filmHeader.className = 'film__header';

   parent.appendChild(filmHeader);
   return filmHeader;
}

export function createFilmTitle(array, id, parent) {
   const filmHeaderTitle = document.createElement('p');
   filmHeaderTitle.className = 'title';
   filmHeaderTitle.innerHTML = `${array[id]?.name}`;

   parent.appendChild(filmHeaderTitle);
   return filmHeaderTitle;
}

export function createFilmInfo(parent) {
   const filmInfo = document.createElement('div');
   filmInfo.className = 'film__info';

   parent.appendChild(filmInfo);
   return filmInfo;
}

export function createFilmGenre(array, id, parent) {
   const filmGenre = document.createElement('p');
   filmGenre.className = 'genres';
   if (array[id].genres[1] !== undefined) {
      filmGenre.innerHTML = `${array[id].genres[0].name} / ${array[id].genres[1].name}`
   } else {
      filmGenre.innerHTML = `${array[id]?.genres[0]?.name??" "}`}

   parent.appendChild(filmGenre);
   return filmGenre;
}

export function createFilmYear(array, id, parent) {
   const filmYear = document.createElement('p');
   filmYear.className = 'years';
   filmYear.innerHTML = `${array[id]?.year??" "}`

   parent.appendChild(filmYear);
   return filmYear;
}

export function createFilmLength(array, id, parent) {
   const filmLength = document.createElement('p');
   filmLength.className = 'film__length';
   if (array[id].movieLength !== null) {
      filmLength.innerHTML = `Продолжительность: ${array[id]?.movieLength??" - "} мин.`
   } else {filmLength.innerHTML = null}

   parent.appendChild(filmLength);
   return filmLength;
}

export function createFilmDescription(array, id, parent) {
   const filmDescription = document.createElement('p');
   filmDescription.className = 'shortDescription';
   filmDescription.innerHTML = `${array[id]?.shortDescription??" "}`

   parent.appendChild(filmDescription);
   return filmDescription;
}
