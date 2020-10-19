import fetch from 'node-fetch';
import { includeParam } from './utils/filter';
const API_URL = 'https://bod-api-2.herokuapp.com';
const [programId] = process.argv.slice(2);

const allRemoves = [];

allRemoves.push(
  fetch(`${API_URL}/programs/${programId}`, {
    method: 'DELETE',
  })
);

fetch(
  `${API_URL}/programs/${programId}?filter=${includeParam([
    'weeks',
    'programStatistic',
  ])}`
)
  .then((res) => res.json())
  .then((program) => {
    const promises = [];
    allRemoves.push(
      fetch(`${API_URL}/program-statistics/${program.programStatistic?.id}`, {
        method: 'DELETE',
      })
    );
    program.weeks?.forEach((week) => {
      allRemoves.push(
        fetch(`${API_URL}/weeks/${week.id}`, {
          method: 'DELETE',
        })
      );

      promises.push(
        fetch(
          `${API_URL}/weeks/${week.id}?filter=${includeParam([
            'sessions',
            'weekStatistic',
          ])}`
        ).then((res) => res.json())
      );
    });
    return Promise.all(promises);
  })
  .then((weeks) => {
    const promises = [];
    weeks.forEach((week) => {
      allRemoves.push(
        fetch(`${API_URL}/week-statistics/${week.weekStatistic?.id}`, {
          method: 'DELETE',
        })
      );

      week.sessions?.forEach((session) => {
        allRemoves.push(
          fetch(`${API_URL}/sessions/${session.id}`, {
            method: 'DELETE',
          })
        );

        promises.push(
          fetch(
            `${API_URL}/sessions/${session.id}?filter=${includeParam([
              'sessionStatistic',
              'sessionItems',
            ])}`
          ).then((res) => res.json())
        );
      });
    });

    return Promise.all(promises);
  })
  .then((sessions) => {
    const promises = [];
    sessions.forEach((session) => {
      allRemoves.push(
        fetch(`${API_URL}/session-statistics/${session.sessionStatistic.id}`, {
          method: 'DELETE',
        })
      );

      session.sessionItems.forEach((sessionItem) => {
        allRemoves.push(
          fetch(`${API_URL}/session-items/${sessionItem.id}`, {
            method: 'DELETE',
          })
        );

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
      allRemoves.push(
        fetch(
          `${API_URL}/session-item-statistics/${sessionItem.sessionItemStatistic.id}`,
          {
            method: 'DELETE',
          }
        )
      );

      promises.push(
        fetch(
          `${API_URL}/session-item-statistics/${
            sessionItem.sessionItemStatistic.id
          }?filter=${includeParam(['setStatistics'])}`
        ).then((res) => res.json())
      );
    });
    return Promise.all(promises);
  })
  .then((setStatistics) => {
    setStatistics.forEach((setStatistic) => {
      allRemoves.push(
        fetch(`${API_URL}/set-statistics/${setStatistic.id}`, {
          method: 'DELETE',
        })
      );
    });

    return Promise.all(allRemoves);
  })
  .then(() => console.log('ALL DELETED'));
