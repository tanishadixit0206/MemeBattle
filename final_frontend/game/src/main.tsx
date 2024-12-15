import { Devvit } from '@devvit/public-api';
import { GamePage } from './pages/GamePage.js';
// import { App } from './components/App.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
});

Devvit.addCustomPostType({
  name: 'Name',
  render: GamePage,
});

export default Devvit;