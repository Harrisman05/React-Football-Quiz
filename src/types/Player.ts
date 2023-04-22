export default interface Player {
    name: string;
    firstname: string;
    lastname: string;
    nationality: string;
    team: string;
    ranking: number;
    goals: number;
    [key: string]: string | number;
  }