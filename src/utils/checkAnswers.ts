import AllStatPlayerReduce from '../types/AllStatPlayerReduce';
import AllStatsPlayer from '../types/AllStatsPlayer';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';
import UserAnswers from '../types/UserAnswers';

export default function checkAnswers(
  allStatsPlayers: AllStatsPlayer[],
  statRemove: ModifiedStatsPlayer[],
  userAnswers: UserAnswers
) {
  console.log(allStatsPlayers);

  for (let player of statRemove) {
    // extract keys to start extracting players from all the map
    const keyIterator = player.keys();
    const key = Number(keyIterator.next().value);
    console.log(key);

    // Using key, extract data of player for user answers, removed stats and all stats
    const userAnswerPlayer = userAnswers.get(key);
    const removedStatPlayer = player.get(key);

    // This is a bit messy, can't figure out how to ensure a map with key is found to prevent the undefined type being possible
    const allStatPlayer = allStatsPlayers.reduce(
      (acc: AllStatPlayerReduce | undefined, el: AllStatsPlayer) => {
        if (el.get(key)) {
          acc = el.get(key);
        }
        return acc;
      },
      undefined
    );

    // Logs

    console.log(removedStatPlayer);
    console.log(userAnswerPlayer);
    console.log(allStatsPlayers);
    console.log(allStatPlayer);
    console.log(userAnswerPlayer?.hasOwnProperty('nationality'));
    console.log(userAnswerPlayer?.hasOwnProperty('team'));
    console.log(userAnswerPlayer?.hasOwnProperty('goals'));

    // Check logic, if user has provided an answer, check their answer against all the stats. If correct, update removeStatPlayer and conditionally render the answer

    if (userAnswerPlayer?.hasOwnProperty('name')) {
      console.log('found name');
      if (allStatPlayer!.name === userAnswerPlayer.name) {
        console.log('match');
        removedStatPlayer!.name = userAnswerPlayer.name;
      }
    }

    if (userAnswerPlayer?.hasOwnProperty('nationality')) {
      console.log('found nationality');
      if (allStatPlayer!.nationality === userAnswerPlayer.nationality) {
        console.log('match');
        removedStatPlayer!.nationality = userAnswerPlayer.nationality;
      }
    }

    if (userAnswerPlayer?.hasOwnProperty('team')) {
      console.log('found team');
      if (allStatPlayer!.team === userAnswerPlayer.team) {
        console.log('match');
        removedStatPlayer!.team = userAnswerPlayer.team;
      }
    }
  }

  return [...statRemove];
}
