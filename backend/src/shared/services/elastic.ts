import { Client } from '@elastic/elasticsearch';
import { config } from 'dotenv';

config();

export const elasticClient = new Client({
  node: process.env.ELASTIC_HOST,
  auth: {
    apiKey: {
      id: process.env.ELASTIC_API_KEY_ID,
      api_key: process.env.ELASTIC_API_KEY,
    },
  },
});
