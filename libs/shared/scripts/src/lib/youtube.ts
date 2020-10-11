import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';

function loadYoutube() {
  const youtube = google.youtube('v3');
  const keyfilePath = process.cwd() + '/oauth2.keys.json';

  return authenticate({
    keyfilePath,
    scopes: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube',
    ],
  }).then((auth) => {
    google.options({ auth });
    return youtube;
  });
}

export { loadYoutube };
