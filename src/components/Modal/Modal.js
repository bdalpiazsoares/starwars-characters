import React, { useEffect, useState } from 'react';
import { FaFilm, FaGlobe, FaSpaceShuttle } from 'react-icons/fa';

import apiService from '../../services/apiService';

import Divider from '../Divider/Divider';
import ShowInfo from '../ShowInfo/ShowInfo';

import './modal.scss';
import '../../styles/base-styles.scss';

function Modal({ item, closeModal }) {
  const [planetData, setPlanetData] = useState({});
  const [films, setFilms] = useState([]);
  const [starShips, setStarShips] = useState([]);

  useEffect(() => {
    getPlanet();
    getFilms();
    getStarShips();
  }, []);

  async function getPlanet() {
    const idPlanet = item.homeworld.substring(21);
    if (idPlanet) {
      const response = await apiService.get(idPlanet);
      setPlanetData(response.data)
    }
  }

  async function getFilms() {
    const promiseList = [];

    item.films?.forEach((item) => {
      const idFilm = item.substring(21);
      promiseList.push(apiService.get(idFilm));
    });

    Promise.all(promiseList).then((res) => {
      setFilms(res);
    });
  }

  async function getStarShips() {
    const promiseList = [];

    item.starships?.forEach((item) => {
      const idStarship = item.substring(21);
      promiseList.push(apiService.get(idStarship));
    });

    Promise.all(promiseList).then((res) => {
      setStarShips(res);
    });
  }

  function renderTopic(icon, title, renderTest) {
    return (
      <div className='container-topic'>
        <div className='container-header-title'>
          {icon}
          <span className='character-name topic-title'>{title}</span>
        </div>
        <div className='container-modal-data'>
          {renderTest()}
        </div>
      </div>
    );
  }

  function renderInfo(title, data) {
    return (
      <ShowInfo 
        title={title}
        data={data}
      />
    );
  }

  function renderListInfo(list) {
    return (
      <ul>
        {list.map((item) => (
          <li key={item.data.url}>{item.data.title || item.data.name}</li>
        ))}
      </ul>
    );
  }
  
  return (
    <div className='modal'>
      <div className='container-modal'>
        <div className='content-modal'>
          <span className='character-name'>{item.name}</span>
          <Divider />
          {planetData && renderTopic(<FaGlobe />, 'Home World', () => (
            <>
              {planetData.name && renderInfo('Name', planetData.name)}
              {planetData.population && renderInfo('Population', planetData.population)}
              {planetData.climate && renderInfo('Climate', planetData.climate)}
            </>
          ))}
          {!!starShips.length && renderTopic(<FaSpaceShuttle />,'Star Ships', () => renderListInfo(starShips))}
          {!!films.length && renderTopic(<FaFilm />,'Films', () => renderListInfo(films))}
        </div>
        <div className='container-button-modal'>
          <button
            className='button-close-modal'
            onClick={closeModal}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
