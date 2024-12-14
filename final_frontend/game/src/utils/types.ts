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

export type PlayerTileData = {
  username:string;
  role : string;
  points : number;
  url :string
}

export type RoomState  = {
  id: string;
  participants: {
    [userId: string]: {
      username: string;
      role: 'CREATOR' | 'JURY';
      points: number;
      wins: number;
      timestamp: number;
    }
  };
}