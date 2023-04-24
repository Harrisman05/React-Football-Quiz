export default interface AllStatsPlayer
  extends Map<
    number,
    {
      [key: string]: string | number // this allows me to access the map values with either string or number (for ranking/goals)
      name: string;
      firstname: string;
      lastname: string;
      nationality: string;
      team: string;
      ranking: number;
      goals: number;
    }
  > {}
