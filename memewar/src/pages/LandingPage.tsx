import { Devvit, useState } from '@devvit/public-api';

type PageProps = {
  setPage: (page: string) => void;
}

export const LandingPage = ({ setPage }: PageProps) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [joinedPlayers, setJoinedPlayers] = useState(5);

  

  const onPlay = () => {
    setIsWaiting(true);
    // TODO: Implement actual room joining logic
    // This could involve calling a backend function to add the player to a room
  };

  const cancelWaiting = () => {
    setIsWaiting(false);
    setJoinedPlayers(0);
  };
  const joinRoom = () => {
    // Increment players
    const newPlayerCount = joinedPlayers + 1;
    setJoinedPlayers(newPlayerCount);

    // Check if players are full and navigate to game page
    if (newPlayerCount >= 6) {
      setPage('game');
    }
  };

  if (!isWaiting) {
    return (
      <vstack
        width="100%"
        height="100%"
        alignment="middle center"
        gap="large"
        backgroundColor='white'
      >
        <image
          imageHeight={1024}
          imageWidth={1500}
          height="50%"
          width="100%"
          url="bg.jpg"
          description="striped blue background"
          resizeMode="cover"
        />
        <text size="xxlarge" color='black'>MEMEWAR</text>
        <button appearance='destructive' onPress={onPlay}>PLAY</button>
      </vstack>
    );
  }

  return (
    <vstack
      width="100%"
      height="100%"
      gap='medium'
      alignment="middle center"
      backgroundColor='white'
    >
      <image
          imageHeight={1024}
          imageWidth={1500}
          height="50%"
          width="100%"
          url="bg.jpg"
          description="striped blue background"
          resizeMode="cover"
        />
      <text size="xlarge" color='black'>Waiting for Players</text>
      <text size="large" color='black'>
        {joinedPlayers}/6 Players Joined
      </text>
      <vstack backgroundColor='#FFD5C6' cornerRadius='full' width='80%'>
          <hstack backgroundColor='#D93A00' width={`${(joinedPlayers/6)*100}%`}>
            <spacer size='medium' shape='square' />
          </hstack>
      </vstack>
      <hstack gap='medium'>
        <button 
          appearance='secondary' 
          onPress={joinRoom}
          disabled={joinedPlayers >= 6}
        >
          Join
        </button>
        <button 
          appearance='secondary' 
          onPress={cancelWaiting}
        >
          Cancel
        </button>
      </hstack>
    </vstack>
  );
};

export default LandingPage;