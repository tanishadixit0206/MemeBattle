import { Devvit, Context, useState } from "@devvit/public-api";
import {  User_Details } from "../utils/types.js";
import { updateUserVotes } from "../redis/reddisFunctions.js";

export const VotingForm = (props: { users: User_Details[] }, context: Context): JSX.Element => {
  const [selection, setSelection] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const totalVotes = props.users.reduce((acc, user) => acc + user.points, 0);

  const leader = props.users.reduce((max, user) => 
    user.points > max.points ? user : max, 
    props.users[0]
  );

  const VotingScreen = (
    <vstack padding='medium' alignment='start'>
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
    <vstack alignment='start' padding='medium'>
      {props.users.map((user) => {
        const percentage = totalVotes > 0 
          ? Math.round((user.points / totalVotes) * 100) 
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
            <zstack alignment='middle' padding='small'>
              <text weight='bold'>{user.points}</text>
              <hstack>
                <spacer width='20px' />
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
                  ? { ...user, votes: user.points + 5} 
                  : user
              );
              // updateUserVotes(props,context)
            
              setHasVoted(true);
            }}
          >
            Vote
          </button>
        )}

      </hstack>
      <spacer size="small" />
    </vstack>
  );

  const Footer_2 = () => (
    <vstack>
      <hstack gap='small' alignment='middle' padding='medium' height='32px'>
        {hasVoted && (
          <button
            appearance='primary'
            size='small'
            disabled={!selection}
            onPress={() => {
            }}
          >
            Next Meme 
          </button>
        )}

      </hstack>
      <spacer size="small" />
    </vstack>
  );

  return (
    <vstack height='100%'>
      <Header />
      {hasVoted ? ResultsScreen : VotingScreen}
      {!hasVoted ? <Footer/>:<Footer_2/>}
    </vstack>
  );
};

export default VotingForm;