import fetch from 'node-fetch';
import { includeParam } from './utils/filter.js';
const API_URL = 'https://bod-api-2.herokuapp.com';

/**
 * attach a weekStatisticId to all weeks
 */
fetch(`${API_URL}/weeks?filter=${includeParam(['weekStatistic'])}`)
  .then((res) => res.json())
  .then((weeks) => {
    const promises = [];
    weeks.forEach((week) => {
      const body = JSON.stringify({
        weekStatisticId: week.weekStatistic?.id ?? null,
      });

      promises.push(
        fetch(`${API_URL}/weeks/${week.id}`, {
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
