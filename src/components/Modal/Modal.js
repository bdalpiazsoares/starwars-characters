import React, { useEffect, useState } from 'react';
import { FaFilm, FaGlobe, FaSpaceShuttle } from 'react-icons/fa';

import {
  getFilmsService,
  getHomeWorldService,
  getStarShipsService
} from '../../services/starwars';

import ShowInfo from '../ShowInfo/ShowInfo';

import styles from './modal.module.scss';

function Modal({ item, closeModal }) {
  const [homeWorld, setHomeWorld] = useState({});
  const [films, setFilms] = useState([]);
  const [starShips, setStarShips] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getServices();
  }, []);
  
  async function getServices() {
    setLoading(true);
    const responseHomeWorld = await getHomeWorldService(item.homeworld);
    setHomeWorld(responseHomeWorld);
    const responseStarShips = await getStarShipsService(item.starships);
    setStarShips(responseStarShips);
    const responseFilms = await getFilmsService(item.films);
    setFilms(responseFilms);
    setLoading(false);
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

  function renderData() {
    if (loading) {
      return (<div className='spinner' />);
    } else {
      return (
        <>
          {homeWorld && renderTopic(<FaGlobe />, 'Home World', () => (
            <div className={styles.containerInfo}>
              {homeWorld.name && renderInfo('Name', homeWorld.name)}
              {homeWorld.population && renderInfo('Population', homeWorld.population)}
              {homeWorld.climate && renderInfo('Climate', homeWorld.climate)}
            </div>
          ))}
          {!!starShips?.length && renderTopic(<FaSpaceShuttle />,'Star Ships', () => renderListInfo(starShips))}
          {!!films.length && renderTopic(<FaFilm />,'Films', () => renderListInfo(films))}
        </>
      );
    }
  }
  
  return (
    <div className={styles.modal}>
      <div className={styles.containerModal}>
        <div className={styles.contentModal}>
          <span className='default-title'>{item.name}</span>
          <div className='divider' />
          {renderData()}
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
