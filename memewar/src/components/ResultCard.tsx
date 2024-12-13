import { Devvit } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
  http: true
});

type ResultCardProps = {
    rank: number;
    name: string;
    votes: number;
}

export const ResultCard = ({rank, name, votes} : ResultCardProps) => {
    return (
        <hstack 
            width="80%" 
            height="50px" 
            backgroundColor='#EDD382' 
            alignment="middle center"
            cornerRadius="medium"
            padding="small"
        >
            <text color='black' weight='bold'>{rank}. {name} - {votes} votes</text>
        </hstack>
    )
}