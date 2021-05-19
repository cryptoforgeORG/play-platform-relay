const asyncRedis = require('async-redis');
const redis = require('redis');

import { reportError } from './reporting';

let db: any;

function connectDatabase() {

  let credentials: any = {};

  if (process.env.NODE_ENV == 'production') {
    credentials = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    };
  } else {
    // credentials = {
    //   url: REDIS_URL
    // };
    credentials = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    };
  }

  if (!db) {
    const client = redis.createClient(credentials);
    client.on("error", function (error: string) {
      reportError(error);
    });

    db = asyncRedis.decorate(client);
  }
  return db;
}

export default connectDatabase();
