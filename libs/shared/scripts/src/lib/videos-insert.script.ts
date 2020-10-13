import { createReadStream, readdirSync, statSync } from 'fs';
import { clearLine, cursorTo } from 'readline';
// import { createRequire } from 'module';
import { loadYoutube } from './youtube.js';

// very basic example of uploading a video to youtube
function uploadDirectory(dir) {
  return loadYoutube()
    .then((youtube) => {
      const promises = readdirSync(dir).map((fileName) => {
        const fileSize = statSync(`${dir}/${fileName}`).size;
        return youtube.videos.insert(
          {
            part: ['id', 'snippet', 'status'],
            notifySubscribers: false,
            requestBody: {
              snippet: {
                title: fileName,
                description: `${fileName} video`,
              },
              status: {
                privacyStatus: 'unlisted',
                selfDeclaredMadeForKids: false,
              },
            },
            media: {
              body: createReadStream(`${dir}/${fileName}`),
            },
          },
          {
            // Use the `onUploadProgress` event from Axios to track the
            // number of bytes uploaded to this point.
            onUploadProgress: (evt) => {
              const progress = (evt.bytesRead / fileSize) * 100;
              clearLine(process.stdout, 0);
              cursorTo(process.stdout, 0, null);
              process.stdout.write(`${Math.round(progress)}% complete`);
            },
          }
        );
      });
      return Promise.all(promises);
    })
    .then(() => {
      console.dir('playlist url');
    });
}

uploadDirectory('/Users/upstateinteractive/Desktop/videos/july-4-2020');
