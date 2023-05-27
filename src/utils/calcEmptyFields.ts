import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';
import RemovedStatPlayer from '../types/removedStatPlayer';
import getCurrentKey from './getCurrentKey';

export default function calcEmptyFields(statsRemove: ModifiedStatsPlayer[]): number {
  console.log(statsRemove);

  const allEmptyFields = statsRemove.reduce((acc: number, player) => {
    console.log(player);
    const currentKey = getCurrentKey(player);
    console.log(currentKey);
    console.log(player.get(currentKey));
    const currentPlayerStats = player.get(currentKey) as RemovedStatPlayer; // type asserted to prevent overload method in Object.entries

    const currentPlayerValues = Object.values(currentPlayerStats);
    console.log(currentPlayerValues);

    const currentPlayerEmptyFields = currentPlayerValues.reduce((acc: any, el: string | number) => {
        console.log(el)
        if (el === '') {
            return acc += 1
        }
        return acc
    }, 0);
    console.log(currentPlayerEmptyFields);
    acc += currentPlayerEmptyFields
    return acc;
  }, 0)

  console.log(allEmptyFields);
  return allEmptyFields;  
}
