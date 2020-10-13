import fetch from 'node-fetch';
import { includeParam } from './utils/filter.js';
const API_URL = 'https://bod-api-2.herokuapp.com';

const storedSessionStatistics = [];
/**
 * Goal: attached weekStatisticId to all existing sessionStatistics
 */

/**
 * sessionStatistic.session.weekId
 *   week.weekStatisticId
 *
 * sessionStatistic.weekStatisticId = week.weekStatisticId
 */
fetch(`${API_URL}/session-statistics?filter=${includeParam(['session'])}`)
  .then((res) => res.json())
  .then((sessionStatistics) => {
    const weekIds = sessionStatistics
      .filter((sessionStatistic) => !!sessionStatistic.session)
      .map((sessionStatistic) => {
        storedSessionStatistics.push(sessionStatistic);
        return sessionStatistic.session.weekId;
      });

    const promises = weekIds.map((id) =>
      fetch(
        `${API_URL}/weeks/${id}?filter=${includeParam(['weekStatistic'])}`
      ).then((res) => res.json())
    );

    return Promise.all(promises);
  })
  .then((weeks) => {
    const promises = [];

    storedSessionStatistics.forEach((sessionStatistic) => {
      const body = JSON.stringify({
        weekStatisticId: weeks.find(
          (week) => sessionStatistic.session.weekId === week.id
        ).weekStatistic?.id,
      });

      promises.push(
        fetch(`${API_URL}/session-statistics/${sessionStatistic.id}`, {
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
