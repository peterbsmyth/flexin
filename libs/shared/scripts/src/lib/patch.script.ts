import fetch from 'node-fetch';
import { includeParam } from './utils/filter.js';
const API_URL = 'https://bod-api-2.herokuapp.com';
const [weekId] = process.argv.slice(2);

const storedSessions = [];

/**
 * find all session item statistics connected to a session statistic and connect them
 */
fetch(`${API_URL}/weeks/${weekId}?filter=${includeParam(['sessions'])}`)
  .then((res) => res.json())
  .then((week) => {
    const promises = [];
    week.sessions.forEach((session) => {
      promises.push(
        fetch(
          `${API_URL}/sessions/${session.id}?filter=${includeParam([
            'sessionItems',
            'sessionStatistic',
          ])}`
        ).then((res) => res.json())
      );
    });

    return Promise.all(promises);
  })
  .then((sessions) => {
    const promises = [];
    sessions.forEach((session) => {
      storedSessions.push(session);
      session.sessionItems.forEach((sessionItem) => {
        promises.push(
          fetch(
            `${API_URL}/session-items/${sessionItem.id}?filter=${includeParam([
              'sessionItemStatistic',
            ])}`
          ).then((res) => res.json())
        );
      });
    });
    return Promise.all(promises);
  })
  .then((sessionItems) => {
    const promises = [];
    sessionItems.forEach((sessionItem) => {
      const sessionItemStatistic = sessionItem.sessionItemStatistic;
      const body = JSON.stringify({
        sessionStatisticId: storedSessions.find(
          (session) => session.id === sessionItem.sessionId
        ).sessionStatistic.id,
      });

      promises.push(
        fetch(`${API_URL}/session-item-statistics/${sessionItemStatistic.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        })
      );
    });

    return Promise.all(promises);
  })
  .then(() => console.log('success'));
