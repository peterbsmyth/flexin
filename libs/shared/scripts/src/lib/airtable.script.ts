import dotenv from 'dotenv';
import Airtable from 'airtable';
import { Celebrity, InstagramStatistic } from '@bod/celebrities/domain';
import { Scraper, Root, CollectContent } from 'nodejs-web-scraper';
import { format } from 'date-fns';

dotenv.config();
const { AIRTABLE_API_KEY: apiKey } = process.env;
const baseId = 'appkd7lxi8RV4nNHU';
const base = new Airtable({ apiKey }).base(baseId);

export interface AirtableRecord<T> {
  id: string;
  fields: T;
}
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

const getInstagramStatistics = (
  records: AirtableRecord<Celebrity>[]
): Promise<InstagramStatistic[]> => {
  const instagramStatistics: InstagramStatistic[] = [];
  const getPageObject = (pageObject) => {
    const celebrityIndex = instagramStatistics.length;
    const celebrity = records[celebrityIndex];
    const instagramStatistic = {
      celebrityId: [celebrity.id],
      date: format(new Date(), 'yyyy-MM-dd'),
      engagementRate: +pageObject.engagementRate[0].slice(16, -2),
      followers: +pageObject.followers[0].replace(/,/g, ''),
    };
    instagramStatistics.push(instagramStatistic);
  };

  const scraperPromises = records.map((record) => {
    const username = record.fields.instagramUrl.split(
      'https://www.instagram.com/'
    )[1];

    const path = username.endsWith('/') ? username.slice(0, -1) : username;
    const config = {
      usePuppeteer: true,
      baseSiteUrl: `https://www.ninjalitics.com`,
      startUrl: `https://www.ninjalitics.com/${path}.html`,
    };

    const root = new Root({
      getPageObject,
    });

    const followers = new CollectContent('#num_followers', {
      name: 'followers',
    });

    const engagementRate = new CollectContent('#er_info span:first', {
      name: 'engagementRate',
    });

    root.addOperation(followers);
    root.addOperation(engagementRate);
    const scraper = new Scraper(config);

    return scraper.scrape(root);
  });

  return Promise.all(scraperPromises)
    .then(() => {
      console.log(instagramStatistics);
      return instagramStatistics;
    })
    .catch((err) => {
      throw err;
    });
};

const createInstagramStatistics = (instagramStatistics: InstagramStatistic[]) =>
  new Promise<InstagramStatistic[]>((resolve, reject) => {
    const recordsData = instagramStatistics.map((statistic) => ({
      fields: statistic,
    }));

    base('instagram_statistics').create(recordsData, (err, records) => {
      if (err) {
        console.log(err);
        console.dir(err);
        reject(err);
      } else {
        resolve(records);
      }
    });
  });

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
