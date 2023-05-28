import AllStatsPlayer from '../types/AllStatsPlayer';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';
import RemovedStatPlayerProps from '../types/RemovedStatPlayerProps';

export default function getOriginalStatRemove(originalStatsRemove: ModifiedStatsPlayer[], id: string) {
    const originalStats = originalStatsRemove.reduce(
        (acc: RemovedStatPlayerProps | '', el: AllStatsPlayer) => { // have to use empty string to initilaise the accumulator
          console.log(el);
          if (el[id]) {
            acc = el[id];
          }
          return acc;
        },
        ''
      );
    return originalStats as RemovedStatPlayerProps; // assert type so App.tsx doesn't think there an empty string being returned
}