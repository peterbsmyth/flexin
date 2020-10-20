import dotenv from 'dotenv';
import Airtable from 'airtable';
import { format } from 'date-fns';
import { Celebrity, InstagramStatistic } from '@bod/celebrities/domain';
dotenv.config();
const { AIRTABLE_API_KEY: apiKey } = process.env;
const baseId = 'appkd7lxi8RV4nNHU';
const base = new Airtable({ apiKey }).base(baseId);

export interface AirtableRecord<T> {
  id: string;
  fields: T[];
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

const createInstagramStatistics = (instagramStatistics: InstagramStatistic[]) =>
  new Promise<InstagramStatistic[]>((resolve, reject) => {
    const recordsData = instagramStatistics.map((statistic) => ({
      fields: statistic,
    }));
    base('instagram_statistics').create(recordsData, (err, records) => {
      if (err) {
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
  .then((data) => {
    /**
     * TODO: get their corresponding page on the website
     */

    /**
     * TODO: scrape website
     */

    /**
     * put data back in airtable
     */
    const instagramStatistics: InstagramStatistic[] = [
      {
        celebrityId: [data[0].id],
        date: format(new Date(), 'yyyy-MM-dd'),
        followers: 10,
        engagementRate: 0.061,
      },
    ];
    return createInstagramStatistics(instagramStatistics);
  })
  .then(() => console.log('success'));
