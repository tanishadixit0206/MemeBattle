import { Devvit, useState } from "@devvit/public-api";


interface User {
  username : string;
  url : string;
  votes: number;
}


export const MemeTile =  (props:any):JSX.Element =>{
  return(<>
    <vstack width="100%" height="100%" border="thick" borderColor="#FFB22C" cornerRadius="medium" backgroundColor="white"></vstack>
  </>)
} 