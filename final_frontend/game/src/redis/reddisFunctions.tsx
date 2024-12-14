import { Devvit } from "@devvit/public-api"
import { RoomState } from "../utils/types.js";

export const UsertoMemeforSession = async (context: Devvit.Context, username: string, memeurl: string) => {
  const existingMemesJson = await context.redis.hGet('memes', username);
  const existingMemes = existingMemesJson 
    ? JSON.parse(existingMemesJson) 
    : [];
  const updatedMemes = [...existingMemes, memeurl];
  await context.redis.hSet('memes', {
    [username]: JSON.stringify(updatedMemes)
  });
};


export async function fetchRoomState(context:Devvit.Context, roomId: string): Promise<RoomState | null> {
  try {
    const participantsJson = await context.redis.get(`room:${roomId}:participants`);
    
    if (!participantsJson) {
      return null;
    }
    const participants = JSON.parse(participantsJson);

    return {
      id: roomId,
      participants
    };
  } catch (error) {
    console.error('Error fetching room state:', error);
    return null;
  }
}



export async function updateUserVotes(
  roomId: string, 
  userId: string,
  context:Devvit.Context,
  upvote:boolean
): Promise<boolean> {
  try {
    const roomState = await fetchRoomState(context,roomId);
    
    if (!roomState) {
      throw new Error('Room not found');
    }
    if (roomState.participants[userId] && upvote) {
      roomState.participants[userId].points += 5;
      
      await context.redis.set(
        `room:${roomId}:participants`, 
        JSON.stringify(roomState.participants)
      );

      return true;
    }
    else if (roomState.participants[userId] && !upvote) {
      roomState.participants[userId].points -= 5;
      
      await context.redis.set(
        `room:${roomId}:participants`, 
        JSON.stringify(roomState.participants)
      );

      return true;
    }
    

    return false;
  } catch (error) {
    console.error('Error updating user votes:', error);
    return false;
  }
}

export async function fetchUserDetails(
  roomId: string, 
  userId: string,
  context:Devvit.Context
): Promise<{ username: string; points: number } | null> {
  try {
    const roomState = await fetchRoomState(context,roomId);
    
    if (roomState && roomState.participants[userId]) {
      const { username, points } = roomState.participants[userId];
      return { username, points };
    }

    return null;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}
