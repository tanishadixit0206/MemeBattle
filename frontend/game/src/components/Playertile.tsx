import { Context, Devvit,  } from "@devvit/public-api";


interface User {
  username : string;
  url : string;
  votes: number;
}

export const PlayerTile =  (props:User,context:Context):JSX.Element =>{
  return(<>
    <hstack alignment="middle center" width="100%" height="12%" border="thin" borderColor="#FFB22C" cornerRadius="medium" padding="medium">
      <text weight="bold" color="black" onPress={()=>{context.ui.navigateTo(props.url)}} >{props.username}</text>
      <spacer width="2%"></spacer>
      <text weight="bold" color="black">{props.votes}</text>
    </hstack>
    <spacer width="2%"></spacer>
  </>)
} 