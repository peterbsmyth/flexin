import fetch from 'node-fetch';
import { includeParam } from './utils/filter.js';
const API_URL = 'https://bod-api-2.herokuapp.com';

const storedSessionItemStatistics = [];
/**
 * Goal: attached sessionStatisticId to all existing sessionItemStatistics
 */

/**
 * sessionItemStatistic.sessionItem.sessionId
 *   session.sessionStatisticId
 *
 * sessionItemStatistic.sessionStatisticId = session.sessionStatisticId
 */
fetch(
  `${API_URL}/session-item-statistics?filter=${includeParam(['sessionItem'])}`
)
  .then((res) => res.json())
  .then((sessionItemStatistics) => {
    const sessionIds = sessionItemStatistics
      .filter((sessionItemStatistic) => !!sessionItemStatistic.sessionItem)
      .map((sessionItemStatistic) => {
        storedSessionItemStatistics.push(sessionItemStatistic);
        return sessionItemStatistic.sessionItem.sessionId;
      });

    const promises = sessionIds.map((id) =>
      fetch(
        `${API_URL}/sessions/${id}?filter=${includeParam(['sessionStatistic'])}`
      ).then((res) => res.json())
    );

    return Promise.all(promises);
  })
  .then((sessions) => {
    const promises = [];

    storedSessionItemStatistics.forEach((sessionItemStatistic) => {
      const body = JSON.stringify({
        sessionStatisticId: sessions.find(
          (session) => sessionItemStatistic.sessionItem.sessionId === session.id
        ).sessionStatistic?.id,
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
