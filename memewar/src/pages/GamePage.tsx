import { Devvit } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  http: true
});

type GamePageProps = {
  setPage: (page: string) => void;
}

export const GamePage = ({ setPage }: GamePageProps) => {
  return (
    <vstack height="100%" alignment="center" gap="medium">
      <text>Hello war page</text>
      
      <hstack width="100%" height="80%" gap="large" alignment="center">
        {/* Left Section */}
        <vstack width="50%" height="100%" alignment="center" gap="medium">
          <image url="cat.jpg" imageWidth={100} imageHeight={100} />
          
        </vstack>

        {/* Right Section */}
        <vstack width="50%" height="100%" alignment="center" gap="medium">
          <image url="chillguy.jpg" imageWidth={100} imageHeight={100} />
          {/* add form for input */}
        </vstack>
      </hstack>

      <button onPress={() => setPage('home')}>Go to LandingPage</button>
    </vstack>
  );
};

export default Devvit;