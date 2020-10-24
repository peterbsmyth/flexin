import dotenv from 'dotenv';
import Airtable from 'airtable';
import { Celebrity, InstagramStatistic } from '@bod/celebrities/domain';
import { Scraper, Root, CollectContent } from 'nodejs-web-scraper';
import { format } from 'date-fns';
import Record from 'airtable/lib/record';

dotenv.config();
const { AIRTABLE_API_KEY: apiKey } = process.env;
const baseId = 'appkd7lxi8RV4nNHU';
const base = new Airtable({ apiKey }).base(baseId);

export interface AirtableRecord<T> {
  id: string;
  fields: T;
}

/**
 * getUsernameFromUrl
 * get the username from the url and strip the tailing
 * forward slash if it exists
 * @param instagramUrl
 */
const getUsernameFromUrl = (instagramUrl: string): string => {
  const path = instagramUrl.split('https://www.instagram.com/')[1];

  const username = path.endsWith('/') ? path.slice(0, -1) : path;
  return username;
};

/**
 * chunk
 * break an array into an 2D array of fixed size
 * @param array any array
 * @param size length of chunks
 */
const chunk = (array, size: number) =>
  Array(Math.ceil(array.length / size))
    .fill(null)
    .map((_, i) => array.slice(i * size, i * size + size));

/**
 * getCelebrities
 * gets all of the celebrities in the airtable
 */
const getCelebrities = () =>
  new Promise<AirtableRecord<Celebrity>[]>((resolve, reject) => {
    const allRecords = [];
    base('celebrities')
      .select({
        view: 'Grid view',
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => allRecords.push(record));
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(allRecords);
          }
        }
      );
  });

/**
 * getInstagramStatistics
 * for each celebrity, go to their ninjalitics page and extract the
 * followers and engagement rate
 * @param records Airtable Records of Celebrities
 */
const getInstagramStatistics = (
  records: AirtableRecord<Celebrity>[]
): Promise<InstagramStatistic[]> => {
  const instagramStatistics: InstagramStatistic[] = [];
  const getPageObject = (pageObject) => {
    const username = pageObject.username[0].slice(1);
    const celebrity = records.find(
      (record) => getUsernameFromUrl(record.fields.instagramUrl) === username
    );

    /**
     * engagementRate: ['Engagement rate 2.17 %'] => 0.0217
     * followers: ['1,234,567'] => 1234567
     */
    const instagramStatistic = {
      celebrityId: [celebrity.id],
      date: format(new Date(), 'yyyy-MM-dd'),
      engagementRate: +pageObject.engagementRate[0].slice(16, -2) / 100,
      followers: +pageObject.followers[0].replace(/,/g, ''),
    };
    instagramStatistics.push(instagramStatistic);
  };

  const scraperPromises = records.map((record) => {
    const username = getUsernameFromUrl(record.fields.instagramUrl);

    const config = {
      usePuppeteer: true,
      baseSiteUrl: `https://www.ninjalitics.com`,
      startUrl: `https://www.ninjalitics.com/${username}.html`,
    };

    const root = new Root({
      getPageObject,
    });

    const pageUsername = new CollectContent('#label_username', {
      name: 'username',
    });

    const followers = new CollectContent('#num_followers', {
      name: 'followers',
    });

    const engagementRate = new CollectContent('#er_info span:first', {
      name: 'engagementRate',
    });

    root.addOperation(pageUsername);
    root.addOperation(followers);
    root.addOperation(engagementRate);
    const scraper = new Scraper(config);

    return scraper.scrape(root);
  });

  return Promise.all(scraperPromises).then(() => instagramStatistics);
};

/**
 * createInstagramStatistics
 * create new instagram statistics in airbase
 * @param instagramStatistics an array of instagram statistics
 */
const createInstagramStatistics = (
  instagramStatistics: InstagramStatistic[]
): Promise<Record[]> => {
  const recordsData = instagramStatistics.map((statistic) => ({
    fields: statistic,
  }));

  const chunked = chunk(recordsData, 10);

  const promises = chunked.map((chunk) =>
    base('instagram_statistics').create(chunk)
  );

  return Promise.all(promises);
};

/**
 * get all celebrities
 */
getCelebrities()
  .then(getInstagramStatistics)
  .then(createInstagramStatistics)
  .then(() => console.log('success'))
  .catch((err) => {
    throw err;
  });
