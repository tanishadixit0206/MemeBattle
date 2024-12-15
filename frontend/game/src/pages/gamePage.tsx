import { Devvit, useForm, useState, useChannel } from "@devvit/public-api";
import { PlayerTile } from "../components/Playertile.js";
import { MemeTile } from "../components/MemeTile.js";
import { ChatMessage, MsgType, RealtimeMessage, UserRecord, UserStatus } from "../types.js";
import { joined_users } from "../../constants.js";
import VotingForm from "../components/VotingForm.js";
import { User } from "../../types.js";
import { Timer } from "../components/Timer.js";

export const GamePage = (context: Devvit.Context): JSX.Element => {

  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<string[]>([]);
  const [votingOn, setVotingOn] = useState<boolean>(false);
  const [me, setMe] = useState<UserRecord | null>(null);
  const [log, setLog] = useState<RealtimeMessage[]>([]);
  const [userList, setUserList] = useState<Record<string, UserRecord>>({});

  const addLog = (msg: RealtimeMessage) => {
    setLog(prev => [msg, ...prev].slice(0, 20));
  };

  // Chat message form
  const updateVotes = (joined_users_array:User[]) =>{
    for (let index = 0; index < joined_users_array.length; index++) {
      console.log("idhar hai hum")
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
          label: 'Enter message...',
        },
      ],
    },
    async (values) => {
      if (!me || typeof values.text !== 'string' || !values.text.trim()) return;
      
      const message: ChatMessage = {
        type: MsgType.Message,
        user: me,
        message: values.text.trim(),
      };
      
      addLog(message);
      await channel.send(message);
    }
  );

  // Realtime channel setup
  const channel = useChannel<RealtimeMessage>({
    name: 'chat',
    onMessage: (msg) => {
      // Ignore own messages that we've already added to the log
      if (!me || (msg.user.id === me.id && msg.user.session === me.session)) {
        return;
      }

      if (msg.type === MsgType.Presence) {
        if (!userList[msg.user.id]) {
          addLog({
            type: MsgType.Presence,
            user: msg.user,
            status: UserStatus.Joined,
          });
        }
        setUserList(prev => ({ ...prev, [msg.user.id]: msg.user }));
      } else if (msg.type === MsgType.Message) {
        addLog(msg);
      }
    },
    onSubscribed: async () => {
      // Initialize user when channel is subscribed
      const user = await context.reddit.getCurrentUser();
      if (!user) return;
      
      const userRecord = {
        id: user.id,
        session: Date.now().toString(),
        name: user.username,
      };
      
      setMe(userRecord);
      setUserList(prev => ({ ...prev, [userRecord.id]: userRecord }));
      
      await channel.send({
        type: MsgType.Presence,
        user: userRecord,
        status: UserStatus.Joined,
      });
    },
    onUnsubscribed: async () => {
      if (!me) return;
      await channel.send({
        type: MsgType.Presence,
        user: me,
        status: UserStatus.Left,
      });
    }
  });

  // Subscribe to channel immediately
  channel.subscribe();

  // Render chat messages
  const chatHistory = log.map((msg, index) => (
    msg.type === MsgType.Message ? (
      <hstack 
        key={`msg-${index}`}
        alignment="middle start" 
        width="90%" 
        border="thin" 
        borderColor="#FFB22C" 
        cornerRadius="medium" 
        padding="medium"
      >
        <text weight="bold">{msg.user.name}: </text>
        <text>{msg.message}</text>
      </hstack>
    ) : (
      <text key={`status-${index}`} color="#888">
        {msg.user.name} has {msg.status === UserStatus.Left ? 'left' : 'joined'}
      </text>
    )
  ));

  const votingDone = ()=>{
    setVotingOn(false)
    //! logic of fetching new meme and resetting the game is to be written here
  }

  function time_is_up(){
    setLoading(true)
    //! logic of fetching new meme and resetting the game is to be written here
  }


  return (
    <zstack height="100%" width="100%" backgroundColor="#FEF3E2" alignment="top center">
      <vstack height="100%" width="100%">
        <hstack padding="xsmall" backgroundColor="#FA4032" width="100%" height="12%" alignment="middle center">
          <text weight="bold" size="xxlarge" color="white">MEMEWAR</text>
        </hstack>
        <hstack width="100%" height="88%" padding="medium">
          <vstack width="25.5%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D" padding="small">
            {joined_users.map((value, index) => (
              <PlayerTile username={value.username} url={value.profileUrl} votes={value.votes}/>
            ))}
          </vstack>
          <spacer width="3%" />
          <vstack padding="small" width="38%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D">
            {loading ? <text height="88%">Meme is Loading ...</text>:<MemeTile />}
            <spacer width="1%"></spacer>
            <hstack alignment="middle center" width="100%" height="10%" cornerRadius="large" backgroundColor="#FA4032">
              <Timer context={context} time_is_up = {time_is_up} />
            </hstack>
          </vstack>
          <spacer width="3%" />
          <vstack width="31.5%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D" >
            {votingOn ? <VotingForm updateUsers={updateVotes} votingClosed={votingDone} users={joined_users}/>
            :<vstack  height="100%" alignment="bottom center" padding="small">
            {chatHistory}
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
  );
};