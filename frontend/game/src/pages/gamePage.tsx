import { Devvit, useForm, useState } from "@devvit/public-api";
import { PlayerTile } from "../components/Playertile.js";
import { MemeTile } from "../components/MemeTile.js";
import { joined_users } from "../../constants.js";
import VotingForm from "../components/VotingForm.js";
import { User } from "../../types.js";

export const GamePage = (context: Devvit.Context): JSX.Element => {

  const [loading, setLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<string[]>([]);
  const [votingOn, setVotingOn] = useState<boolean>(false);
  // const [users,setUsers] = useState<User[]>(joined_users)/

const updateVotes = (joined_users_array:User[]) =>{
    for (let index = 0; index < joined_users_array.length; index++) {
      const element_to_be_copied = joined_users_array[index]
      joined_users[index]['votes'] = element_to_be_copied['votes']
    }
}

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

  const votingDone = ()=>{
    setVotingOn(false)
  }


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
            {votingOn ? <VotingForm updateUsers={updateVotes} votingClosed={votingDone} users={joined_users}/>
            :<vstack  height="100%" alignment="bottom center" padding="small">
              {messages.map((value) => {
                return (<>
                  <hstack alignment="middle start" width="90%" height="12%" border="thin" borderColor="#FFB22C" cornerRadius="medium" padding="medium">
                    <text weight="bold" color="black" >{value}</text>
                  </hstack>
                  <spacer width="1%"></spacer>
                </>)
              })}
              <hstack width="100%" alignment="center middle" >
              <button size="small" icon="upvote-outline" appearance="success"  onPress={()=>{setVotingOn(true);console.log("yo")}}>Vote</button>
              <spacer width="6%" ></spacer>
              <button size="small" icon="audience" appearance="bordered"
                onPress={() => {
                  console.log("yo")
                  context.ui.showForm(form);
                }}
              >
                Discuss
              </button>
              </hstack>
              <spacer width="2%"></spacer>
            </vstack>}
          </vstack>
        </hstack>

      </vstack>
    </zstack>
  )
}