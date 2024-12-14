import { Context, Devvit, useInterval, useState } from "@devvit/public-api";

export const Timer = (props:{context:Devvit.Context,time_is_up:()=>void}):JSX.Element =>{

const[time_int,setTime_int] = useState<number>(30)
const [time,setTime] = useState<string>("30")

async function seeTimer(context:Devvit.Context) {
  var time_is_up = await context.redis.get('time')
  if(time_is_up === 'reset'){
    resetTimer()
  }
}

function updateTimer(){
  seeTimer(props.context)
  setTime_int(time_int - 1)
  setTime(time_int.toString())
  if(time_int===0){
    resetTimer()
    props.time_is_up()
  }
}

function startTimer(){
  useInterval(updateTimer,1000).start()
}

function stopTimer(){
  useInterval(updateTimer,1000).start()
}


const resetTimer = ()=>{
  setTime_int(30)
  setTime("30")
}

 return(<>
  <hstack>
    <text color="white" weight="bold" size="large">Timer : {time}</text>
    </hstack>
 </>)
}