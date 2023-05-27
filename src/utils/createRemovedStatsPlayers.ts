import AllStatsPlayer from '../types/AllStatsPlayer';
import { cloneDeep } from 'lodash';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';
import getCurrentKey from './getCurrentKey';

export default function createRemovedStatsPlayers(allStatsPlayers: AllStatsPlayer[]) {
  const allStatsPlayersClone = cloneDeep(
    allStatsPlayers
  ) as ModifiedStatsPlayer[]; // have to clone so that I preserve answers and allow removal of some answers from a distinct reference object (shallow clone could  mess it up as value is object {}, deep clone to be safe). Use type assertation to convert type as compiler can't figure this out on it's own

  const removedStatsPlayers = randomStatRemover(allStatsPlayersClone);
  return removedStatsPlayers;
}

function randomStatRemover(allStatsPlayers: AllStatsPlayer[]) {
  const allStatsPlayersClone = cloneDeep(
    allStatsPlayers
  ) as ModifiedStatsPlayer[]; // have to clone so that I preserve answers and allow removal of some answers from a distinct reference object (shallow clone could  mess it up as value is object {}, deep clone to be safe). Use type assertation to convert type (so that empty strings are valid) as compiler can't figure this out on it's own

  const removedStatsPlayers: ModifiedStatsPlayer[] = allStatsPlayersClone.map(
    (el) => {
      const currentKey = getCurrentKey(el);
      const randomStatToRemove = getRandomStatToRemove();
      removeRandomStat(el, currentKey, randomStatToRemove);

      return el;
    }
  );
  return removedStatsPlayers;
}

function getRandomStatToRemove() {
  const statsToRemove = ['nationality', 'team'];
  const randomIndex = Math.floor(Math.random() * 2);
  const randomRemovedStat = statsToRemove[randomIndex];
  return randomRemovedStat;
}

function removeRandomStat(
  el: ModifiedStatsPlayer,
  currentKey: any,
  randomStatToRemove: string
) {
  if (el[currentKey] !== undefined) {
    // check that the player value is not undefined, better safety
    // Non-null expression You can postfix an expression with ! to tell TypeScript that you know it's not null or undefined. This works the same as an 'as' assertion.
    el[currentKey]![randomStatToRemove] = '';
    el[currentKey]!.name = ''; // always remove name
  }
}
