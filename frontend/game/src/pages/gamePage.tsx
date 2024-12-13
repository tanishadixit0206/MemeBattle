import { Devvit } from "@devvit/public-api";
import { bgImg } from "../constants.js";

export const GamePage = (context:Devvit.Context):JSX.Element =>{
  return(
    <zstack height="100%" width="100%" backgroundColor="#FEF3E2" alignment="top center">
      <vstack height="100%" width="100%">

        <hstack padding="xsmall" backgroundColor="#FA4032" width="100%" height="12%" alignment="middle center">
          {/* <spacer width="5%" /> */}
          <text weight="bold" size="xxlarge" color="white">MEMEWAR</text>
        </hstack>
        <hstack width="100%" height="88%" padding="medium">
          <vstack width="25.5%"  border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D"></vstack>
          <spacer width="3%"/>
          <vstack width="38%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D"></vstack>
          <spacer width="3%"/>
          <vstack width="31.5%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D" ></vstack>
        </hstack>

      </vstack>
    </zstack>
  )
}