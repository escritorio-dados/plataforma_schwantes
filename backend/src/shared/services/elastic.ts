import { Client } from '@elastic/elasticsearch';
import { config } from 'dotenv';

config();

export const elasticClient = new Client({
  node: process.env.ELASTIC_HOST,
  auth: {
    username: 'elastic',
    password: process.env.ELASTIC_PASSWORD,
  },
});
