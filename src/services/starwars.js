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
  try {
    const response = await apiService.get(homeworld);
    return response.data;
  } catch (error) {
    showErrorMessage('Error fetching homeworld');
  }
}

export async function getFilmsService(films) {
  const promiseList = [];

  films?.forEach((item) => {
    promiseList.push(apiService.get(item));
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
    promiseList.push(apiService.get(item));
  });

  return Promise.all(promiseList)
    .then((response) => {
      return response;
    })
    .catch(() => showErrorMessage('Error fetching starchips'));
}