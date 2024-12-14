export type MemeTileProps = {
  voting_session:boolean;
  memeUrl:string
}

export type User = {
  userId: string;
  username: string;
  role: 'CREATOR' | 'JURY';
  points: number;
  wins: number;
  timestamp: number;
}