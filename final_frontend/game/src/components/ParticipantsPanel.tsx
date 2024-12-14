import { Devvit } from "@devvit/public-api";
import { mockUsers } from "../utils/constants.js";
import { PlayerTile } from "./PlayerTile.js";


export function ParticipantsPanel(context:Devvit.Context){
  return(<vstack width="25.5%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D" padding="small">
    {mockUsers.map((value)=>{
      return(<PlayerTile context={context} username={value.username} url={value.username} points = {value.points}/>)
    })}
  </vstack>)
}