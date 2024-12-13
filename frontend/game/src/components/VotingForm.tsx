import { Devvit, Context, useState } from "@devvit/public-api";

interface User {
  username: string;
  url: string;
  votes: number;
}

export const VotingForm = (props: { users: User[] }, context: Context): JSX.Element => {
  const [selection, setSelection] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const totalVotes = props.users.reduce((acc, user) => acc + user.votes, 0);
  const leader = props.users.reduce((max, user) => 
    user.votes > max.votes ? user : max, 
    props.users[0]
  );

  const VotingScreen = (
    <vstack padding='medium' alignment='start' gap='medium' grow>
      {props.users.map((user) => (
        <hstack
          alignment='middle'
          height='28px'
          onPress={() => setSelection(user.username)}
        >
          <spacer size='xsmall' />
          <icon
            name={
              selection === user.username
                ? 'radio-button-fill'
                : 'radio-button-outline'
            }
          />
          <spacer size='small' />
          <spacer size='xsmall' />
          <text>{user.username}</text>
        </hstack>
      ))}
    </vstack>
  );

  const ResultsScreen = (
    <vstack alignment='start' gap='small' padding='medium' grow>
      {props.users.map((user) => {
        const percentage = totalVotes > 0 
          ? Math.round((user.votes / totalVotes) * 100) 
          : 0;
        return (
          <zstack width='100%'>
            <hstack
              height='100%'
              width={`${percentage}%`}
              borderColor={
                leader.username === user.username
                  ? 'rgba(255,0,0,0.2)'
                  : 'secondary-background'
              }
              cornerRadius='small'
            />
            <zstack gap='small' alignment='middle' padding='small'>
              <text weight='bold'>{user.votes}</text>
              <hstack>
                <spacer width='56px' />
                <text>{user.username}</text>
              </hstack>
            </zstack>
          </zstack>
        );
      })}
    </vstack>
  );

  const Header = () => (
    <vstack>
      <hstack height='32px' alignment='middle'>
        <spacer size='medium' />
        <text size='small' weight='bold' color='neutral-content'>
          Voting
        </text>
        <spacer size='small' />
        <text size='small' weight='bold' color='neutral-content-weak'>
          •
        </text>
        <spacer size='small' />
        <text size='small' weight='bold' color='neutral-content-weak'>
          {totalVotes} total votes
        </text>
      </hstack>
      <hstack height='1px' />
    </vstack>
  );

  const Footer = () => (
    <vstack>
      <hstack gap='small' alignment='middle' padding='medium' height='32px'>
        {!hasVoted && (
          <button
            appearance='primary'
            size='small'
            disabled={!selection}
            onPress={() => {
              const updatedUsers = props.users.map(user => 
                user.username === selection 
                  ? { ...user, votes: user.votes + 1 } 
                  : user
              );
              setHasVoted(true);
            }}
          >
            Vote
          </button>
        )}
        <text color='neutral-content-weak' size='small'>
          15 hours 11 minutes left
        </text>
      </hstack>
      <spacer size="small" />
    </vstack>
  );

  return (
    <vstack height='100%'>
      <Header />
      {hasVoted ? ResultsScreen : VotingScreen}
      <Footer />
    </vstack>
  );
};

export default VotingForm;