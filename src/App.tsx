import { useEffect, useState } from 'react';
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

function App() {
  const [allStatsPlayers, setallStatsPlayers] = useState<AllStatsPlayer[]>([]);
  const [statRemove, setStatRemove] = useState<ModifiedStatsPlayer[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(new Map());

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    const userAnswers = updateUserAnswers(e);
    setUserAnswers(userAnswers);
  }

  function handleCheckAnswers() {
    const updatedRemovedStats = checkUserAnswers(allStatsPlayer, statRemove, userAnswers);
    setStatRemove(updatedRemovedStats);
  }

  /* Run using API --------------------------------------------------------------------------------- */

  useEffect(() => {
    const getData = async () => {
      var options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        },
      };

      const season = 2016;
      const response = await fetch(
        `https://v3.football.api-sports.io/players/topscorers?league=39&season=${season}`,
        options
      );

      const body = await response.text();
      const data = JSON.parse(body);

      console.log(data);

      const allStatsPlayer: AllStatsPlayer[] = data['response'].map(
        // player array
        (el: PlayerStats, index: number) => {
          const playerMap = new Map();
          return playerMap.set(el.player.id, {
            name: removeAbbrevName(el.player.name),
            firstname: el.player.firstname,
            lastname: el.player.lastname,
            nationality: el.player.nationality,
            team: el.statistics[0].team.name,
            ranking: index + 1, // index object comes in order, so use index to calculate ranking
            goals: el.statistics[0].goals.total,
          });
        }
      );

      console.log(allStatsPlayer);

      setallStatsPlayers(allStatsPlayer);
      // Maps are not valid JSON, so convert each map into object first before stringifying
      const stringifiedMap = JSON.stringify(
        allStatsPlayers.map((map) => Object.fromEntries(map))
      );
      localStorage.setItem('allStatsPlayers', JSON.stringify(stringifiedMap));
    };
    // getData();
  }, []);

  /* Run using API ^^^-------------------------------------------------------------------------------*/

  /* Run using local data -------------------------------------------------------------------------- */

  const allStatsPlayer: AllStatsPlayer[] = extractAllStats(example_json['response']);
  console.log(allStatsPlayer);

  useEffect(() => {
    setallStatsPlayers(allStatsPlayer);
    // Maps are not valid JSON, so convert each map into object first before stringifying
    const stringifiedMap = JSON.stringify(
      allStatsPlayers.map((map) => Object.fromEntries(map))
    );
    localStorage.setItem('allStatsPlayers', JSON.stringify(stringifiedMap));
  }, []);

  /* Run using local data ^^^ -------------------------------------------------------------------------- */

  // Create array of players with removed stats
  const removedStatsPlayers = createRemovedStatsPlayers(allStatsPlayers);

  console.log(removedStatsPlayers);
  console.log(allStatsPlayers);

  // useEffect which monitors if userAnswers state changes, and if it does, invokes handleCheckAnswers function
  useEffect(() => {
    if (userAnswers) {
      handleCheckAnswers();
    }
    console.log(userAnswers);
  }, [userAnswers]);

  useEffect(() => {
    // using setState is kinda async, so need to log out update inside a useEffect
    console.log(statRemove);
  }, [statRemove]);

  return (
    <div className='App'>
      <button onClick={() => setStatRemove(removedStatsPlayers)}>
        Remove stats
      </button>
      <div className='bg-red-600 flex-col'>
        <form onSubmit={handleFormSubmit}>
          {statRemove.map((player: ModifiedStatsPlayer) => {
            const [id, stats] = [...player.entries()][0]; // extracting id and data out of each map object
            return (
              <div key={id.toString()} className='flex gap-8'>
                <div className='w-40 flex items-center'>{stats.ranking}</div>
                {stats.name === '' ? (
                  <input name={`name-${id}`} className='w-40 bg-slate-400' />
                ) : (
                  <div className='w-40 flex items-center border-s-blue-900'>
                    {stats.name}
                  </div>
                )}
                {stats.nationality === '' ? (
                  <input name={`nationality-${id}`} className='w-40' />
                ) : (
                  <div className='w-40 flex items-center'>
                    {stats.nationality}
                  </div>
                )}
                {stats.team === '' ? (
                  <input name={`team-${id}`} className='w-40' />
                ) : (
                  <div className='w-40 flex items-center'>{stats.team}</div>
                )}
                {stats.goals === 0 ? (
                  <input name={`goals-${id}`} className='w-40' />
                ) : (
                  <div className='w-40 flex items-center'>{stats.goals}</div>
                )}
              </div>
            );
          })}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}
export default App;
