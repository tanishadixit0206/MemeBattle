import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  http:true
});
type PageProps = {
    setPage: (page: string) => void;
  }

export const LandingPage = ({ setPage }: PageProps) => (
    <vstack
      width="100%"
      height="100%"
      alignment="middle center"
      gap="large"
      backgroundColor="lightblue"
    >
      <text size="xxlarge">Landing Page</text>
      <button onPress={() => setPage('voting')}>Go to VotingPage</button>
    </vstack>
  );