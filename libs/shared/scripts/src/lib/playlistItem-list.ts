import { loadYoutube } from './youtube.js';

// // very basic example of getting playlistItems for a logged in user
function playlistItemList() {
  loadYoutube()
    .then((youtube) => {
      return youtube.playlistItems.list({
        part: ['id', 'snippet'],
        playlistId: 'PL9YIpGWg8O0tVCDuohYe5wyQbV_b0wVsP',
      });
    })
    .then((playlistItems) => {
      console.dir(playlistItems.data.items);
      console.dir(playlistItems.data.items[0].snippet.resourceId);
    });
}

playlistItemList();
