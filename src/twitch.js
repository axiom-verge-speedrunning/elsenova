import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';
import { TWITCH_GAME_ID } from './constants';

dotenvConfig();

const HEADERS = { 'Client-ID': process.env.TWITCH_CLIENT_ID };

class TwitchAPI {
  static async getStreams() {
    return axios.get('https://api.twitch.tv/helix/streams', {
      params: {
        game_id: TWITCH_GAME_ID,
      },
      headers: HEADERS,
    });
  }
}

export default TwitchAPI;
