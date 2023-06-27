// const title = movie.name;
export let moviesToWatch = [];

let checkboxValue = 'unchecked';

export function createMovie(title, checkboxValue) {
   const movie = {
      title: title,
      checkboxValue: checkboxValue,
   }
   moviesToWatch.unshift(movie);
   return movie;
};