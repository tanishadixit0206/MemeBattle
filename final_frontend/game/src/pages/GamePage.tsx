import { Devvit, useState } from "@devvit/public-api";


export const GamePage = (context:Devvit.Context):JSX.Element =>{

  const [voting_session,setVoting_session] = useState<boolean>(false)
  const [is_creator_setIs_creator] = useState<boolean>(false)
  const [messages,setMessages] = useState<string[]>([])

  return(<>
    
  
  </>)
}