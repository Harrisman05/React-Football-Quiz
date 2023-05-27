import AllStatsPlayer from '../types/AllStatsPlayer';
import ModifiedStatsPlayer from '../types/ModifiedStatsPlayer';

export default function setDataToLocalStorage(key: string, data: AllStatsPlayer[] | ModifiedStatsPlayer[]) {
    const stringifiedData = JSON.stringify(
      data.map((map) => Object.fromEntries(map))
    );
    localStorage.setItem(key, stringifiedData);
  };  


