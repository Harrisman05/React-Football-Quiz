import AllStatsPlayer from '../types/AllStatsPlayer';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';

export default function getOriginalStatRemove(originalStatsRemove: ModifiedStatsPlayer[], id: number) {
    const originalStats = originalStatsRemove.reduce(
        (acc: any, el: AllStatsPlayer) => {  // can't figure out how to not have any here without undefined
          console.log(el);
          if (el.get(id)) {
            acc = el.get(id);
          }
          return acc;
        },
        ''
      );
    return originalStats
}