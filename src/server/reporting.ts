const bugsnag = require('bugsnag');

bugsnag.register(process.env.BUGSNAG_KEY as string, {
  notifyReleaseStages: ["production"]
  // appVersion: `${process.env.HEROKU_RELEASE_VERSION} (${process.env.HEROKU_SLUG_COMMIT})`,
  // metaData: {
  //     dyno: {
  //         commit: process.env.HEROKU_SLUG_COMMIT,
  //         version: process.env.HEROKU_RELEASE_VERSION,
  //         createdAt: process.env.HEROKU_RELEASE_CREATED_AT,
  //         appId: process.env.HEROKU_APP_ID
  //     }
  // }
});

export const reportError = (error: string) => {
  bugsnag.notify(error);
}
