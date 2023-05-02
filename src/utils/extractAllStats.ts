import AllStatsPlayer from '../types/AllStatsPlayer';
import PlayerStats from '../types/PlayerStats';
import removeAbbrevName from './removeAbbrevName';

export default function extractAllStats(jsonData: any): AllStatsPlayer[] {
  // TO-DO -- add typing for API data + zod validation
  const allStatsPlayer: AllStatsPlayer[] = jsonData.map(
    // player array
    (el: PlayerStats, index: number) => {
      const playerMap = new Map();
      return playerMap.set(el.player.id, {
        name: removeAbbrevName(el.player.name),
        firstname: el.player.firstname,
        lastname: el.player.lastname,
        nationality: el.player.nationality,
        team: el.statistics[0].team.name,
        ranking: index + 1, // index object comes in order, so use index to calculate ranking
        goals: el.statistics[0].goals.total,
      });
    }
  );
  return allStatsPlayer;
}
