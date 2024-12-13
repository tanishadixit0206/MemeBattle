import { Devvit } from '@devvit/public-api';
import { ResultCard } from '../components/ResultCard.js';

Devvit.configure({
  redditAPI: true,
  http: true,
});

type ResultsPageProps = {
  setPage: (page: string) => void;
};

export const ResultsPage = ({ setPage }: ResultsPageProps) => {
  const resultData = [
    { rank: 1, name: "emvee", votes: 128 },
    { rank: 2, name: "satoshi", votes: 112 },
    { rank: 3, name: "rhapsody", votes: 95 },
    { rank: 4, name: "phoenix", votes: 78 },
    { rank: 5, name: "crown", votes: 65 },
    { rank: 6, name: "turtle", votes: 52 },
  ];

  return (
    <vstack
      height="100%"
      width="100%"
      alignment="center"
      gap="small"
      backgroundColor="#FC9E4F"
    >
      
      <vstack
        backgroundColor="#FF521B"
        width="100%"
        height="15%"
        alignment="middle center"
      >
        <text alignment="center" weight="bold" color="black" size="xlarge">
          RESULTS !!
        </text>
      </vstack>

      
      <vstack width="100%" height="65%" alignment="center" gap="small">
        <hstack width="100%" height="45%" gap="small" alignment="center">
          {resultData.slice(0, 3).map((result) => (
            <vstack width="30%" alignment="center">
              <ResultCard
                rank={result.rank}
                name={result.name}
                votes={result.votes}
              />
            </vstack>
          ))}
        </hstack>

        <hstack width="100%" height="45%" gap="small" alignment="center">
          {resultData.slice(3, 6).map((result) => (
            <vstack width="30%" alignment="center">
              <ResultCard
                rank={result.rank}
                name={result.name}
                votes={result.votes}
              />
            </vstack>
          ))}
        </hstack>
      </vstack>

      
      <vstack width="100%" alignment="center" gap="small">
        <text color="black" weight="bold" size="large">
          Share with your Memers !!!
        </text>

        <button onPress={() => setPage('home')} appearance="destructive">
          Play Again
        </button>
      </vstack>
    </vstack>
  );
};

export default Devvit;
