import { Devvit, useForm, useState } from "@devvit/public-api";
import VotingForm from "../components/VotingForm.js";
import { mockUsers } from "../utils/constants.js";
import { MemeTile } from "../components/MemeTile.js";
import { ParticipantsPanel } from "../components/ParticipantsPanel.js";
import { RoomState } from "../utils/types.js";
import { fetchRoomState } from "../redis/reddisFunctions.js";


export const GamePage = (context:Devvit.Context):JSX.Element =>{

  const [voting_session,setVoting_session] = useState<boolean>(false)
  const [is_creator, setIs_creator] = useState<boolean>(false)
  const [messages,setMessages] = useState<string[]>([])
  const [votingFormDisplayed,setVotingFormDisplayed] = useState<boolean>(false)
  const [memeUrl,setMemeUrl] = useState<string>('')
  const [room,setRoom] = useState<RoomState | null>(null) 

  async function fetchParticipants(roomID:string){
    const room = await fetchRoomState(context,roomID)
    setRoom(room)
    if(room){

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


  return(
    <zstack height="100%" width="100%" backgroundColor="#FEF3E2" alignment="top center">
      <vstack height="100%" width="100%">

        <hstack padding="xsmall" backgroundColor="#FA4032" width="100%" height="12%" alignment="middle center">
          <text weight="bold" size="xxlarge" color="white">MEMEWAR</text>
        </hstack>
        <hstack width="100%" height="88%" padding="medium">
          <ParticipantsPanel {...context} />
          <spacer width="3%" />
          <vstack padding="small" width="38%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D">
            <MemeTile voting_session={voting_session} memeUrl={memeUrl} />
          </vstack>
          <spacer width="3%" />
          <vstack width="31.5%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D" >
            {votingFormDisplayed ? <VotingForm users={mockUsers}/>
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
              <button size="small" icon="upvote-outline" appearance="success"  onPress={()=>{setVotingFormDisplayed(true)}}>Vote</button>
              <spacer width="6%" ></spacer>
              <button size="small" icon="audience" appearance="bordered"
                onPress={() => {
                  context.ui.showForm(form)
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