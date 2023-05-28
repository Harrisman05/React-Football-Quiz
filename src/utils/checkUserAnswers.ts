import AllStatsPlayer from '../types/AllStatsPlayer';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';
import UserAnswers from '../types/UserAnswers';
import getCurrentKey from './getCurrentKey';
import RemovedStatPlayerProps from '../types/RemovedStatPlayerProps';
import UserAnswerPlayerProps from '../types/UserAnswerPlayerProps';
import AllStatsPlayerProps from '../types/AllStatsPlayerProps';

export default function checkUserAnswers(
  allStatsPlayers: AllStatsPlayer[],
  statsRemove: ModifiedStatsPlayer[],
  userAnswers: UserAnswers
) {
  for (let player of statsRemove) {
    // extract keys to use to start extracting players from all the maps
    const currentKey = getCurrentKey(player);

    // Using key, extract data of player for user answers, removed stats and all stats
    const userAnswerPlayer: UserAnswerPlayerProps | undefined =
      userAnswers[currentKey];
    const removedStatPlayer: RemovedStatPlayerProps | undefined = player[currentKey];
    const allStatPlayer = getAllStatPlayer(allStatsPlayers, currentKey);

    debugLogs(allStatPlayer, removedStatPlayer, userAnswerPlayer);

    // Check logic, if user has provided an answer, check their answer against all the stats. If correct, update removeStatPlayer and conditionally render the answer
    checkNameAnswer(allStatPlayer, removedStatPlayer, userAnswerPlayer);
    checkNationalityAnswer(allStatPlayer, removedStatPlayer, userAnswerPlayer);
    checkTeamAnswer(allStatPlayer, removedStatPlayer, userAnswerPlayer);
  }
  return [...statsRemove];
}

function getAllStatPlayer(
  allStatsPlayers: AllStatsPlayer[],
  currentKey: string
) {
  // This is a bit messy, can't figure out how to ensure a map with key is found to prevent the undefined type being possible
  return allStatsPlayers.reduce(
    (acc: AllStatsPlayerProps | undefined, el: AllStatsPlayer) => {
      if (el[currentKey]) {
        acc = el[currentKey];
      }
      return acc;
    },
    undefined
  );
}

function debugLogs(
  allStatPlayer: AllStatsPlayerProps | undefined,
  removedStatPlayer: RemovedStatPlayerProps | undefined,
  userAnswerPlayer: UserAnswerPlayerProps | undefined
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
  allStatPlayer: AllStatsPlayerProps | undefined,
  removedStatPlayer: RemovedStatPlayerProps | undefined,
  userAnswerPlayer: UserAnswerPlayerProps | undefined
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
  allStatPlayer: AllStatsPlayerProps | undefined,
  removedStatPlayer: RemovedStatPlayerProps | undefined,
  userAnswerPlayer: UserAnswerPlayerProps | undefined
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
  allStatPlayer: AllStatsPlayerProps | undefined,
  removedStatPlayer: RemovedStatPlayerProps | undefined,
  userAnswerPlayer: UserAnswerPlayerProps | undefined
) {
  if (userAnswerPlayer?.hasOwnProperty('team')) {
    console.log('found team');
    if (allStatPlayer!.team === userAnswerPlayer.team) {
      console.log('match');
      removedStatPlayer!.team = userAnswerPlayer.team;
    }
  }
}
