import { loadYoutube } from './youtube.js';

/**
 * Get the playlistId from the command line
 */
const [playlistId] = process.argv.slice(2);

function updatePrivacy() {
  loadYoutube()
    .then((youtube) => {
      const fullVideos = [];

      /**
       * getVideos - recursive function to get all of the videos in a playlist from multiple pages
       * @param {string} playlistId
       * @param {string} [pageToken]
       */
      function getVideos(playlistId: string, pageToken?: string) {
        return youtube.playlistItems
          .list({
            part: ['id', 'snippet'],
            maxResults: 50,
            playlistId,
            pageToken,
          })
          .then((playlistItems) => {
            const { nextPageToken, items } = playlistItems.data;
            if (nextPageToken) {
              return getVideos(playlistId, nextPageToken);
            }

            const videoIds = items.map(
              (item) => item.snippet.resourceId.videoId
            );
            /**
             * List all of the videos, necessary to get the titles for the "update" API request
             */
            return youtube.videos
              .list({
                part: ['id', 'snippet'],
                id: videoIds,
              })
              .then((videos) => {
                fullVideos.push(...videos.data.items);
                return fullVideos;
              });
          });
      }
      /**
       * Get the video data including title and categoryId
       */
      getVideos(playlistId).then((fullVideos) => {
        /**
         * Update all videos to be unlisted with privacy status of unlisted
         */
        const promises = fullVideos.map((item) => {
          return youtube.videos.update({
            part: ['id', 'snippet', 'status'],
            requestBody: {
              id: item.id,
              kind: 'youtube#video',
              status: {
                privacyStatus: 'unlisted',
                selfDeclaredMadeForKids: false,
                embeddable: true,
              },
              snippet: {
                title: item.snippet.title,
                categoryId: item.snippet.categoryId || '21',
              },
            },
          });
        });

        return Promise.all(promises);
      });
    })
    .then(() => console.log('success'));
}

updatePrivacy();
