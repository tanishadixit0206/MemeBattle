import { Devvit } from "@devvit/public-api"

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