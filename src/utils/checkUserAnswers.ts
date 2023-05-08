import AllStatPlayerReduce from '../types/AllStatPlayerReduce';
import AllStatsPlayer from '../types/AllStatsPlayer';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';
import UserAnswers from '../types/UserAnswers';
import getCurrentKey from './getCurrentKey';
import RemovedStatPlayer from '../types/removedStatPlayer';
import UserAnswerPlayer from '../types/userAnswerPlayer';

export default function checkUserAnswers(
  allStatsPlayers: AllStatsPlayer[],
  statRemove: ModifiedStatsPlayer[],
  userAnswers: UserAnswers
) 
{
  for (let player of statRemove) {
    // extract keys to use to start extracting players from all the maps
    const currentKey = getCurrentKey(player);

    // Using key, extract data of player for user answers, removed stats and all stats
    const userAnswerPlayer: UserAnswerPlayer | undefined =
      userAnswers.get(currentKey);
    const removedStatPlayer: RemovedStatPlayer | undefined =
      player.get(currentKey);
    const allStatPlayer = getAllStatPlayer(allStatsPlayers, currentKey);

    debugLogs(allStatPlayer, removedStatPlayer, userAnswerPlayer);

    // Check logic, if user has provided an answer, check their answer against all the stats. If correct, update removeStatPlayer and conditionally render the answer
    checkNameAnswer(allStatPlayer, removedStatPlayer, userAnswerPlayer);
    checkNationalityAnswer(allStatPlayer, removedStatPlayer, userAnswerPlayer);
    checkTeamAnswer(allStatPlayer, removedStatPlayer, userAnswerPlayer);
  }
  return [...statRemove];
}

function getAllStatPlayer(
  allStatsPlayers: AllStatsPlayer[],
  currentKey: number
) {
  // This is a bit messy, can't figure out how to ensure a map with key is found to prevent the undefined type being possible
  return allStatsPlayers.reduce(
    (acc: AllStatPlayerReduce | undefined, el: AllStatsPlayer) => {
      if (el.get(currentKey)) {
        acc = el.get(currentKey);
      }
      return acc;
    },
    undefined
  );
}

function debugLogs(
  allStatPlayer: AllStatPlayerReduce | undefined,
  removedStatPlayer: RemovedStatPlayer | undefined,
  userAnswerPlayer: UserAnswerPlayer | undefined
) {
  // Logs
  console.log(allStatPlayer);
  console.log(removedStatPlayer);
  console.log(userAnswerPlayer);
  console.log(userAnswerPlayer?.hasOwnProperty('nationality'));
  console.log(userAnswerPlayer?.hasOwnProperty('team'));
  console.log(userAnswerPlayer?.hasOwnProperty('goals'));
}

function checkNameAnswer(
  allStatPlayer: AllStatPlayerReduce | undefined,
  removedStatPlayer: RemovedStatPlayer | undefined,
  userAnswerPlayer: UserAnswerPlayer | undefined
) {
  if (userAnswerPlayer?.hasOwnProperty('name')) {
    console.log('found name');
    if (allStatPlayer!.name === userAnswerPlayer.name) {
      console.log('match');
      removedStatPlayer!.name = userAnswerPlayer.name;
    }
  }
}

function checkNationalityAnswer(
  allStatPlayer: AllStatPlayerReduce | undefined,
  removedStatPlayer: RemovedStatPlayer | undefined,
  userAnswerPlayer: UserAnswerPlayer | undefined
) {
  if (userAnswerPlayer?.hasOwnProperty('nationality')) {
    console.log('found nationality');
    if (allStatPlayer!.nationality === userAnswerPlayer.nationality) {
      console.log('match');
      removedStatPlayer!.nationality = userAnswerPlayer.nationality;
    }
  }
}

function checkTeamAnswer(
  allStatPlayer: AllStatPlayerReduce | undefined,
  removedStatPlayer: RemovedStatPlayer | undefined,
  userAnswerPlayer: UserAnswerPlayer | undefined
) {
  if (userAnswerPlayer?.hasOwnProperty('team')) {
    console.log('found team');
    if (allStatPlayer!.team === userAnswerPlayer.team) {
      console.log('match');
      removedStatPlayer!.team = userAnswerPlayer.team;
    }
  }
}
