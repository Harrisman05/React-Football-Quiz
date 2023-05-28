import AllStatsPlayer from './AllStatsPlayer';

// inherit the map methods and the base values from AllStatsPlayer

// Could create separate nested object type, pros and cons to this approach to reduce duplication
export default interface ModifiedStatsPlayer extends AllStatsPlayer {
  [id: string]: {
    [key: string]: string | number
    name: string | '';
    firstname: string;
    lastname: string;
    nationality: string | '';
    team: string | '';
    ranking: number;
    goals: number;
}
}