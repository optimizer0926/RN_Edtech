const {default: Plumbing} = require('haiku-plumbing/lib/Plumbing');
const {default: envInfo} = require('haiku-plumbing/lib/envInfo');
const {default: haikuInfo} = require('haiku-plumbing/lib/haikuInfo');
const path = require('path');
const logger = require('haiku-serialization/src/utils/LoggerInstance');

global.eval = function () {
  // noop: eval is forbidden
};

let env;
let haiku;
let args;
let flags;

env = envInfo();
haiku = haikuInfo();
args = env.args;
flags = env.flags;

if (flags.mode !== 'headless') {
  haiku.mode = 'creator';
}

logger.view = 'master';
logger.info(`Haiku plumbing ${process.env.HAIKU_RELEASE_VERSION} on ${process.env.NODE_ENV} launching`);
logger.info('args:', args);
logger.info('flags:', flags);
logger.info('config:', haiku);

const plumbing = new Plumbing();

if (haiku.folder) {
  if (haiku.folder[0] !== path.sep) {
    haiku.folder = path.join(global.process.cwd(), haiku.folder);
  }
}

plumbing.getenv((error, dotenv) => {
  // Before we launch, read .env from ~/.haiku with extreme prejudice, overwriting any environment variables set
  // earlier during bootstrapping.
  if (!error) {
    Object.assign(haiku, {dotenv});
  }
  plumbing.launch(haiku, () => {
    logger.info('Haiku plumbing running');
  });
});
