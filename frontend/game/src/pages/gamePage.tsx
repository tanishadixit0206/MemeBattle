import { Devvit, useForm, useState } from "@devvit/public-api";
import { PlayerTile } from "../components/Playertile.js";
import { MemeTile } from "../components/MemeTile.js";

export const GamePage = (context: Devvit.Context): JSX.Element => {
  const joined_users = [
    {
        "username": "technovator",
        "profileUrl": "https://example.com/users/technovator",
        "votes": 0
    },
    {
        "username": "codemaster23",
        "profileUrl": "https://example.com/users/codemaster23", 
        "votes": 0
    },
    {
        "username": "digital_nomad",
        "profileUrl": "https://example.com/users/digital_nomad",
        "votes": 0
    },
    {
        "username": "innovator_prime",
        "profileUrl": "https://example.com/users/innovator_prime",
        "votes": 0
    },
    {
        "username": "pixel_wizard",
        "profileUrl": "https://example.com/users/pixel_wizard",
        "votes": 0
    },]
  const [loading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<string[]>([]);
  const [votingOn, setVotingOn] = useState<boolean>(false);
const form = useForm(
  {
    fields: [
      {
        type: 'string',
        name: 'text',
        label: 'Enter text ...',
      },
    ],
  },
  (values) => {
    if (typeof values.text === 'string' && values.text.trim() !== '') {
      setMessages((prevMessages: any) => {
        const updatedMessages = prevMessages.length >= 5 
          ? prevMessages.slice(1) 
          : prevMessages;
        return [...updatedMessages, values.text];
      });
    }
  }
);

  return (
    <zstack height="100%" width="100%" backgroundColor="#FEF3E2" alignment="top center">
      <vstack height="100%" width="100%">

        <hstack padding="xsmall" backgroundColor="#FA4032" width="100%" height="12%" alignment="middle center">
          <text weight="bold" size="xxlarge" color="white">MEMEWAR</text>
        </hstack>
        <hstack width="100%" height="88%" padding="medium">
          <vstack width="25.5%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D" padding="small">
            {joined_users.map((value)=>{
              return(<PlayerTile username={value.username} url={value.profileUrl} votes = {value.votes}/>)
            })}
          </vstack>
          <spacer width="3%" />
          <vstack padding="small" width="38%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D">
            {loading ? <MemeTile /> : <text>Meme is Loading ...</text>}
          </vstack>
          <spacer width="3%" />
          <vstack width="31.5%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D" >
            <vstack  height="100%" alignment="bottom center" padding="small">
              {messages.map((value) => {
                return (<>
                  <hstack alignment="middle start" width="90%" height="12%" border="thin" borderColor="#FFB22C" cornerRadius="medium" padding="medium">
                    <text weight="bold" color="black" >{value}</text>
                  </hstack>
                  <spacer width="1%"></spacer>
                </>)
              })}
              <hstack width="100%" alignment="center middle" >
              <button size="small" icon="upvote-outline" appearance="success"  onPress={()=>{setVotingOn(true)}} >Vote</button>
              <spacer width="6%" ></spacer>
              <button size="small" icon="audience" appearance="bordered"
                onPress={() => {
                  context.ui.showForm(form);
                }}
              >
                Discuss
              </button>
              </hstack>
              <spacer width="2%"></spacer>
            </vstack>
          </vstack>
        </hstack>

      </vstack>
    </zstack>
  )
}