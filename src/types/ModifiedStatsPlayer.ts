import AllStatsPlayer from './AllStatsPlayer';

// inherit the map methods and the base values  from AllStatsPlayer
export default interface ModifiedStatsPlayer extends AllStatsPlayer {
  [key: number]: {
    name: string | '';
    nationality: string | '';
    team: string | '';
  };
}
