import { Devvit } from '@devvit/public-api';
import { GamePage } from './pages/gamePage.js';
// import { App } from './components/App.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
  realtime:true,
});

Devvit.addCustomPostType({
  name: 'Name',
  render: GamePage,
});

Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Add my yo^_^yo post',
  onPress: async (_, context) => {
    const currentSubreddit = await context.reddit.getCurrentSubreddit();
    await context.reddit.submitPost({
      title: 'Tanisha\'s post',
      subredditName: currentSubreddit.name,
      preview: (
        <vstack>
          <text>Loading...</text>
        </vstack>
      ),
    });
    context.ui.showToast(`Submitted custom post to ${currentSubreddit.name}`);
  },
});

export default Devvit;