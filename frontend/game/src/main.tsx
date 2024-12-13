import { Devvit } from '@devvit/public-api';
import { GamePage } from './pages/gamePage.js';
// import { App } from './components/App.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
});

Devvit.addCustomPostType({
  name: 'Name',
  render: GamePage,
});

export default Devvit;