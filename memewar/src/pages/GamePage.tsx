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
    <vstack height="100%" alignment="center" gap="medium" backgroundColor='#FC9E4F'>
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
      {/* just for right now , later will be removed and only come after the game is over */}
      <button onPress={() => setPage('results')}>Results Page</button>

      <button onPress={() => setPage('home')}>Go back to Home</button>
    </vstack>
  );
};

export default Devvit;