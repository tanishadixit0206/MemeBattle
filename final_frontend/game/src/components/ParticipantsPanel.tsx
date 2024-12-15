import { Devvit } from "@devvit/public-api";
import { PlayerTile } from "./PlayerTile.js";
import { PlayerDetails } from "../utils/types.js";


export function ParticipantsPanel(props:{context:Devvit.Context,players:PlayerDetails[] | null}){
  return(<vstack width="25.5%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D" padding="small">
    {props.players?.map((value,index)=>{
      return(<PlayerTile context={props.context} username={value.username} url={value.username} points = {value.points}/>)
    })}
  </vstack>)
}