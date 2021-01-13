import apiService from './apiService';
import { showErrorMessage } from '../utils/toast';

export async function getCharactersService(debouncedSearch, page) {
  try {
    const response = await apiService.get(`/people/?search=${debouncedSearch}&page=${page}`);
    return response;
  } catch (error) {
    showErrorMessage('Error fetching characters');
  }
}

export async function getHomeWorldService(homeworld) {
  const idHomeWorld = homeworld.substring(21);
  try {
    const response = await apiService.get(idHomeWorld);
    return response.data;
  } catch (error) {
    showErrorMessage('Error fetching homeworld');
  }
}

export async function getFilmsService(films) {
  const promiseList = [];

  films?.forEach((item) => {
    const idFilm = item.substring(21);
    promiseList.push(apiService.get(idFilm));
  });

  return Promise.all(promiseList)
    .then((response) => {
      return response;
    })
    .catch(() => showErrorMessage('Error fetching films'));
}

export async function getStarShipsService(starships) {
  const promiseList = [];

  starships?.forEach((item) => {
    const idStarship = item.substring(21);
    promiseList.push(apiService.get(idStarship));
  });

  return Promise.all(promiseList)
    .then((response) => {
      return response;
    })
    .catch(() => showErrorMessage('Error fetching starchips'));
}