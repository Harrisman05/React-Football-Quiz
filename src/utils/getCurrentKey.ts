import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';

export default function getCurrentKey(el: ModifiedStatsPlayer) {

  console.log(el)
  console.log(Object.keys(el)[0]);
  // const keyIterator = el.keys(); // had to extend AllStatsPlayer interface to Map to allow use of keys()
  // const currentKey = Number(keyIterator.next().value);
  // console.log(currentKey);
  return Object.keys(el)[0];
}
