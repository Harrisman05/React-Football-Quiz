import { useEffect, useRef, useState } from 'react';
import example_json from './assets/example_json';
import PlayerStats from './types/PlayerStats';
import AllStatsPlayer from './types/AllStatsPlayer';
import ModifiedStatsPlayer from './types/ModifiedStatsPlayer';
import removeAbbrevName from './utils/removeAbbrevName';
import UserAnswers from './types/UserAnswers';
import extractAllStats from './utils/extractAllStats';
import createRemovedStatsPlayers from './utils/createRemovedStatsPlayers';
import updateUserAnswers from './utils/updateUserAnswers';
import checkUserAnswers from './utils/checkUserAnswers';
import QuizField from './components/QuizField';
import { cloneDeep } from 'lodash';
import one_player from './assets/one_player';
import getOriginalStatRemove from './utils/getOriginalStatRemove';
import QuizHeader from './components/QuizHeader';
import convertArrayObjsToArrayMaps from './utils/convertArrayObjsToArrayMaps';

function App() {
  const [allStatsPlayers, setallStatsPlayers] = useState<AllStatsPlayer[]>([]);
  const [statsRemove, setStatsRemove] = useState<ModifiedStatsPlayer[]>([]);
  const [originalStatsRemove, setOriginalStatRemove] = useState<
    ModifiedStatsPlayer[]
  >([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(new Map());

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    const userAnswers = updateUserAnswers(e);
    setUserAnswers(userAnswers);
  }

  function handleCheckAnswers() {
    const updateRemovedStats = checkUserAnswers(
      allStatsPlayers,
      statsRemove,
      userAnswers
    );
    setStatsRemove(updateRemovedStats);
  }

  useEffect(() => {
    if (userAnswers) {
      handleCheckAnswers();
    }
    console.log(userAnswers);
  }, [userAnswers]);

  /* Run using API --------------------------------------------------------------------------------- */

  // useEffect(() => {
  //   const getData = async () => {
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-key': import.meta.env.VITE_API_KEY,
  //       },
  //     };

  //     const season = 2016;
  //     const response = await fetch(
  //       `https://v3.football.api-sports.io/players/topscorers?league=39&season=${season}`,
  //       options
  //     );

  //     const body = await response.text();
  //     const data = JSON.parse(body);

  //     console.log(data);

  //     const allStatsPlayer: AllStatsPlayer[] = data['response'].map(
  //       // player array
  //       (el: PlayerStats, index: number) => {
  //         const playerMap = new Map();
  //         return playerMap.set(el.player.id, {
  //           name: removeAbbrevName(el.player.name),
  //           firstname: el.player.firstname,
  //           lastname: el.player.lastname,
  //           nationality: el.player.nationality,
  //           team: el.statistics[0].team.name,
  //           ranking: index + 1, // index object comes in order, so use index to calculate ranking
  //           goals: el.statistics[0].goals.total,
  //         });
  //       }
  //     );

  //     console.log(allStatsPlayer);

  //     setallStatsPlayers(allStatsPlayer);
  //     // Maps are not valid JSON, so convert each map into object first before stringifying
  //     const stringifiedMap = JSON.stringify(
  //       allStatsPlayers.map((map) => Object.fromEntries(map))
  //     );
  //     localStorage.setItem('allStatsPlayers', JSON.stringify(stringifiedMap));
  //   };
  //   // getData();
  // }, []); 

  /* Run using API ^^^-------------------------------------------------------------------------------*/

  /* Run using local data -------------------------------------------------------------------------- */

  const allStatsPlayersVar: AllStatsPlayer[] = extractAllStats(
    example_json['response']
  );
  console.log(allStatsPlayersVar);

  useEffect(() => {

    const storedAllStatsPlayers = localStorage.getItem('allStatsPlayers');
    if (storedAllStatsPlayers) {
      const parsedAllStatsPlayers = JSON.parse(storedAllStatsPlayers);
      const convertedAllStatsPlayer = convertArrayObjsToArrayMaps(parsedAllStatsPlayers);
      setallStatsPlayers(convertedAllStatsPlayer);
    } else {
      setallStatsPlayers(allStatsPlayersVar);
      // Maps are not valid JSON, so convert each map into object first before stringifying
      const stringifiedAllStatsPlayer = JSON.stringify(
        allStatsPlayersVar.map((map) => Object.fromEntries(map))
      );
      console.log('set local storage');
      localStorage.setItem('allStatsPlayers', stringifiedAllStatsPlayer);
    }
  }, []);

  // set removedStatsPlayer after setting allStatsPlayers
  useEffect(() => {
    const removedStatsPlayers = createRemovedStatsPlayers(allStatsPlayers);
    setStatsRemove(removedStatsPlayers);
    const stringifiedremovedStatsPlayers = JSON.stringify(
      removedStatsPlayers.map((map) => Object.fromEntries(map))
    );
    localStorage.setItem('removedStatsPlayer', stringifiedremovedStatsPlayers);
  }, [allStatsPlayers]);

  useEffect(() => {
    // using setState is kinda async, so need to log out update inside a useEffect
    console.log(statsRemove);
    if (originalStatsRemove.length === 0) {
      // if original is already set, don't set it again
      const originalStatRemoveClone = cloneDeep(
        statsRemove
      ) as ModifiedStatsPlayer[];
      setOriginalStatRemove(originalStatRemoveClone);
      const stringifiedOriginalStatRemove = JSON.stringify(
        originalStatRemoveClone.map((map) => Object.fromEntries(map))
      );
      localStorage.setItem('originalStatRemove', stringifiedOriginalStatRemove);
    }
  }, [statsRemove]);

  useEffect(() => {
    // using setState is kinda async, so need to log out update inside a useEffect
    console.log(originalStatsRemove);
  }, [originalStatsRemove]);

  /* Run using local data ^^^ -------------------------------------------------------------------------- */

  return (
    <div className='App'>
      <div className='bg-red-600 flex-col w-fit'>
        <QuizHeader />
        <form onSubmit={handleFormSubmit}>
          {statsRemove.map((player: ModifiedStatsPlayer) => {
            const currentPlayerStats = [...player.entries()][0]; // extracting id and data out of each map object
            const [id, stats] = currentPlayerStats; // extracting id and data out of each map object
            const originalStats = getOriginalStatRemove(
              originalStatsRemove,
              id
            ); // use weird reduce method to get the stats object out of map using id

            return (
              <div key={id.toString()} className='flex'>
                <div className='text-center w-16 p-1'>{stats.ranking}</div>
                <QuizField
                  currentPlayerStats={currentPlayerStats}
                  originalStats={originalStats}
                  statsKey={'name'}
                />
                <QuizField
                  currentPlayerStats={currentPlayerStats}
                  originalStats={originalStats}
                  statsKey={'nationality'}
                />
                <QuizField
                  currentPlayerStats={currentPlayerStats}
                  originalStats={originalStats}
                  statsKey={'team'}
                />
                <div className='text-center w-16 p-1'>{stats.goals}</div>
              </div>
            );
          })}
          <div className='flex justify-center p-2'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
