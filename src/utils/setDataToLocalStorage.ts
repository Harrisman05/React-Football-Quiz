import AllStatsPlayer from '../types/AllStatsPlayer';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';

export default function setDataToLocalStorage(key: string, data: AllStatsPlayer[] | ModifiedStatsPlayer[]) {
    localStorage.setItem(key, JSON.stringify(data));
  };  


