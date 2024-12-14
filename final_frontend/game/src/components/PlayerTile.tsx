import { Devvit } from "@devvit/public-api";


export function PlayerTile(props:{context:Devvit.Context,url:string,username:string,points:number}) {
  return (
    <hstack alignment="middle center" width="100%" height="12%" border="thin" borderColor="#FFB22C" cornerRadius="medium" padding="medium">
      <text weight="bold" color="black" onPress={() => {props.context.ui.navigateTo(props.url)}} >{props.username}</text>
      <spacer width="2%"></spacer>
      <text weight="bold" color="black">{props.points}</text>
    </hstack>
  )
} 