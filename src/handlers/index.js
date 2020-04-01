import { config as dotenvConfig } from 'dotenv';
import routes from './routes';
import tutorials from './tutorials';
import multi from './multi';

import memeHandlers from './memes';

dotenvConfig();

const debugLog = ({ msg }) => {
  if (!process.env.DEBUG) {
    return;
  }
  console.log(`Processing ${msg.content}`);
};

const handlers = [debugLog, routes, tutorials, multi, ...memeHandlers];

export default handlers;
