// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';
import { LandingPage } from './pages/LandingPage.js';
import { VotingPage } from './pages/VotingPage.js';
import { GamePage } from './pages/GamePage.js';
import { ResultsPage } from './pages/ResultsPage.js';


Devvit.configure({
  redditAPI: true,
  http:true
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'My devvit post',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});


Devvit.addCustomPostType({
  name: 'Name',
  render: context => {
    const { useState } = context;
    const [page, setPage] = useState('home');

    let currentPage;
    switch (page) {
      case 'home':
        currentPage = <LandingPage setPage={setPage} />;
        break;
      case 'voting':
        currentPage = <VotingPage setPage={setPage} />;
        break;
      case 'game':
        currentPage = <GamePage setPage={setPage} />;
        break;
      case 'results':
        currentPage = <ResultsPage setPage={setPage} />;
        break;
      default:
        currentPage = <LandingPage setPage={setPage} />;
    }

    return (
      <blocks>
        {currentPage}
      </blocks>
    )
  }
})

export default Devvit;
