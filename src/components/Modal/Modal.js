import React, { useEffect, useState } from 'react';
import { FaFilm, FaGlobe, FaSpaceShuttle } from 'react-icons/fa';

import apiService from '../../services/apiService';

import ShowInfo from '../ShowInfo/ShowInfo';

import styles from './modal.module.scss';

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

  function renderTopic(icon, title, render) {
    return (
      <div className={styles.containerTopic}>
        <div className={styles.containerHeaderTitle}>
          {icon}
          <div className={styles.topicTitle}>
            <span className='default-title'>{title}</span>
          </div>
        </div>
        <div className={styles.containerModalData}>
          {render()}
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
      <ul className={styles.containerList}>
        {list.map((item) => (
          <li
            key={item.data.url}
            className={styles.list}
          >
            {item.data.title || item.data.name}
          </li>
        ))}
      </ul>
    );
  }
  
  return (
    <div className={styles.modal}>
      <div className={styles.containerModal}>
        <div className={styles.contentModal}>
          <span className='default-title'>{item.name}</span>
          <div className='divider' />
            {planetData && renderTopic(<FaGlobe />, 'Home World', () => (
              <div className={styles.containerInfo}>
                {planetData.name && renderInfo('Name', planetData.name)}
                {planetData.population && renderInfo('Population', planetData.population)}
                {planetData.climate && renderInfo('Climate', planetData.climate)}
              </div>
            ))}
            {!!starShips.length && renderTopic(<FaSpaceShuttle />,'Star Ships', () => renderListInfo(starShips))}
            {!!films.length && renderTopic(<FaFilm />,'Films', () => renderListInfo(films))}
        </div>
        <div className={styles.containerButtonModal}>
          <button
            className={styles.buttonCloseModal}
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
