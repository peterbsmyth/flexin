import fetch from 'node-fetch';
const API_URL = 'https://bod-api-2.herokuapp.com';
const [programId] = process.argv.slice(2);

const allRemoves = [];

/**
 * delete program
 */
allRemoves.push(
  fetch(`${API_URL}/programs/${programId}`, {
    method: 'DELETE',
  })
);

/**
 * delete program statistic
 */
allRemoves.push(
  fetch(`${API_URL}/programs/${programId}/program-statistic`)
    .then((res) => res.json())
    .then((programStatistic) =>
      fetch(`${API_URL}/program-statistics/${programStatistic.id}`, {
        method: 'DELETE',
      })
    )
);

/**
 * find weeks related to program id
 */
fetch(`${API_URL}/programs/${programId}/weeks`)
  .then((res) => res.json())
  /**
   * find sessions related to weeks
   */
  .then((weeks) => {
    const promises = [];
    weeks.forEach((week) => {
      allRemoves.push(
        fetch(`${API_URL}/weeks/${week.id}`, {
          method: 'DELETE',
        })
      );

      promises.push(
        fetch(`${API_URL}/weeks/${week.id}/sessions`).then((res) => res.json())
      );
    });
    return Promise.all(promises);
  })
  /**
   * find session items related to sessions
   */
  .then((sessionsLists) => {
    const promises = [];
    const sessions = sessionsLists.flat();
    sessions.forEach((session) => {
      allRemoves.push(
        fetch(`${API_URL}/sessions/${session.id}`, {
          method: 'DELETE',
        })
      );

      promises.push(
        fetch(`${API_URL}/sessions/${session.id}/session-items`).then((res) =>
          res.json()
        )
      );
    });
    return Promise.all(promises);
  })
  .then((sessionItemsLists) => {
    const sessionItems = sessionItemsLists.flat();
    sessionItems.forEach((sessionItem) => {
      allRemoves.push(
        fetch(`${API_URL}/session-items/${sessionItem.id}`, {
          method: 'DELETE',
        })
      );
    });
    return Promise.all(allRemoves);
  })
  .then(() => {
    console.dir('ALL DELETED');
  });
