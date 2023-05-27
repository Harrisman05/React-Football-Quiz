import AllStatsPlayer from '../types/AllStatsPlayer';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';

export default function getOriginalStatRemove(originalStatsRemove: ModifiedStatsPlayer[], id: string) {
    const originalStats = originalStatsRemove.reduce(
        (acc: any, el: AllStatsPlayer) => {  // can't figure out how to not have any here without undefined
          console.log(el);
          if (el[id]) {
            acc = el[id];
          }
          return acc;
        },
        ''
      );
    return originalStats
}