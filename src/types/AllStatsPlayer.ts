export default interface AllStatsPlayer {
  [id: string]: {
    [key: string]: string | number
    name: string;
    firstname: string;
    lastname: string;
    nationality: string;
    team: string;
    ranking: number;
    goals: number;
  };
}
