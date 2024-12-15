import { Devvit, Participant, useForm, useState } from "@devvit/public-api";
import VotingForm from "../components/VotingForm.js";
import { mockUsers } from "../utils/constants.js";
import { MemeTile } from "../components/MemeTile.js";
import { ParticipantsPanel } from "../components/ParticipantsPanel.js";
import { ParticipantsDetails, PlayerDetails, RoomState } from "../utils/types.js";
import { fetchRoomState, setCurrentCreatorinRedis } from "../redis/reddisFunctions.js";
import { fetchMeme } from "../apis/memeFunctions.js";


export const GamePage = (context:Devvit.Context):JSX.Element =>{

  const [sessionOn,setSessionOn] = useState<boolean>(false)
  const[trial,setTrial] = useState<number>(0)
  const [messages,setMessages] = useState<string[]>([])
  const [votingFormDisplayed,setVotingFormDisplayed] = useState<boolean>(false)
  const [memeUrl,setMemeUrl] = useState<string>('')
  const [room,setRoom] = useState<RoomState | null>(null) 
  const [playersFetched, setPlayersFetched] = useState<boolean>(false)
  const [playerDetails,setPlayerDetails] = useState<PlayerDetails[]|null>(null)
  const [currentCreator,setCurrentCreator] = useState<string|null>(null)

  function extractPlayersFromRoomState(roomState: RoomState): PlayerDetails[] {
    return Object.entries(roomState.participants).map(([userId, participant]) => ({
      username: participant.username,
      role: participant.role,
      points: participant.points,
      wins: participant.wins,
      timestamp: participant.timestamp
    }));
  }

  function assignCreator(){
    if(playerDetails){
      if(trial != 0 && trial === 4){
        setTrial(trial + 1)
      }
      setCurrentCreator(playerDetails[trial].username)
      setCurrentCreatorinRedis(context,playerDetails[trial].username)
    }
  }

  async function sessionStart(roomID:string){
    const room_1 = await fetchRoomState(context,roomID)
    setRoom(room_1)
    if(room){
      const players = extractPlayersFromRoomState(room)
      setPlayerDetails(players)
      setPlayersFetched(true)
      const url_1 = await fetchMeme()
      setMemeUrl(url_1)
      assignCreator()
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
          {playersFetched ? <ParticipantsPanel context={context} players={playerDetails} />:<text>Fetching pplayers' details ...</text>}
          <spacer width="3%" />
          <vstack padding="small" width="38%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D">
            {memeUrl?<MemeTile memeUrl={memeUrl} />:null}
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