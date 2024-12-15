import { useState } from "@devvit/public-api";
import { MemeTileProps } from "../utils/types.js";
import { Devvit } from "@devvit/public-api";

export function MemeTile(props: MemeTileProps){
  return (<vstack padding="small" width="38%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="#FFDE4D">
    {props.memeUrl ? <vstack width="100%" height="88%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="white">
      <image
        url={props.memeUrl}
        imageWidth={250} // ? to be changed accordingly
        imageHeight={250} // ? to be changed accordingly
        description="Meme"
      />
    </vstack> : <text height="88%">Meme is Loading ...</text>}
    <spacer width="1%"></spacer>
    <hstack alignment="middle center" width="100%" height="10%" cornerRadius="large" backgroundColor="#FA4032">
      
    </hstack>
  </vstack>)
}