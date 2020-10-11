import fetch from 'node-fetch';
const API_URL = 'https://bod-api-2.herokuapp.com';

const allRemoves = [];

/**
 * find all program statistics
 */
fetch(`${API_URL}/program-statistics`)
  .then((res) => res.json())
  /**
   * find sessions related to weeks
   */
  .then((programStatistics) => {
    programStatistics.forEach((ps) => {
      allRemoves.push(
        fetch(`${API_URL}/program-statistics/${ps.id}`, {
          method: 'DELETE',
        })
      );
    });
    return fetch(`${API_URL}/week-statistics`).then((res) => res.json());
  })
  /**
   * find session items related to sessions
   */
  .then((weekStatistics) => {
    weekStatistics.forEach((ws) => {
      allRemoves.push(
        fetch(`${API_URL}/week-statistics/${ws.id}`, {
          method: 'DELETE',
        })
      );
    });

    return fetch(`${API_URL}/session-statistics`).then((res) => res.json());
  })
  .then((sessionStatistics) => {
    sessionStatistics.forEach((ss) => {
      allRemoves.push(
        fetch(`${API_URL}/session-statistics/${ss.id}`, {
          method: 'DELETE',
        })
      );
    });
    return fetch(`${API_URL}/session-item-statistics`).then((res) =>
      res.json()
    );
  })
  .then((sessionItemStatistics) => {
    sessionItemStatistics.forEach((sis) => {
      allRemoves.push(
        fetch(`${API_URL}/session-item-statistics/${sis.id}`, {
          method: 'DELETE',
        })
      );
    });
    return fetch(`${API_URL}/set-statistics`).then((res) => res.json());
  })
  .then((setStatistics) => {
    setStatistics.forEach((ss) => {
      allRemoves.push(
        fetch(`${API_URL}/set-statistics/${ss.id}`, {
          method: 'DELETE',
        })
      );
    });
    return Promise.all(allRemoves);
  })
  .then(() => console.log('All Deleted'));
