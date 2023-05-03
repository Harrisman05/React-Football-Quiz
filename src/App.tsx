import { ReactEventHandler, useEffect, useState } from 'react';
import example_json from './assets/example_json';
import PlayerStats from './types/PlayerStats';
import AllStatsPlayer from './types/AllStatsPlayer';
import AllStatPlayerReduce from './types/AllStatPlayerReduce';
import ModifiedStatsPlayer from './types/ModifiedStatsPlayer';
import removeAbbrevName from './utils/removeAbbrevName';
import UserAnswers from './types/UserAnswers';
import extractAllStats from './utils/extractAllStats';
import createRemovedStatsPlayers from './utils/createRemovedStatsPlayers';
import handleSubmit from './utils/handleSubmit';

function App() {
  const [allStatsPlayers, setallStatsPlayers] = useState<AllStatsPlayer[]>([]);
  const [statRemove, setStatRemove] = useState<ModifiedStatsPlayer[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(new Map());

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    const userAnswers = handleSubmit(e);
    setUserAnswers(userAnswers);
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

  useEffect(() => {
    if (userAnswers) {
      checkAnswers();
    }
  }, [userAnswers]);

  function checkAnswers() {
    console.log(allStatsPlayers);

    for (let player of statRemove) {
      // extract keys to start extracting players from all the map
      const keyIterator = player.keys();
      const key = Number(keyIterator.next().value);
      console.log(key);

      // Using key, extract data of player for user answers, removed stats and all stats
      const userAnswerPlayer = userAnswers.get(key);
      const removedStatPlayer = player.get(key);

      // This is a bit messy, can't figure out how to ensure a map with key is found to prevent the undefined type being possible
      const allStatPlayer = allStatsPlayers.reduce(
        (acc: AllStatPlayerReduce | undefined, el: AllStatsPlayer) => {
          if (el.get(key)) {
            acc = el.get(key);
          }
          return acc;
        },
        undefined
      );

      // Logs

      console.log(removedStatPlayer);
      console.log(userAnswerPlayer);
      console.log(allStatsPlayers);
      console.log(allStatPlayer);
      console.log(userAnswerPlayer?.hasOwnProperty('nationality'));
      console.log(userAnswerPlayer?.hasOwnProperty('team'));
      console.log(userAnswerPlayer?.hasOwnProperty('goals'));

      // Check logic, if user has provided an answer, check their answer against all the stats. If correct, update removeStatPlayer and conditionally render the answer

      if (userAnswerPlayer?.hasOwnProperty('name')) {
        console.log('found name');
        if (allStatPlayer!.name === userAnswerPlayer.name) {
          console.log('match');
          removedStatPlayer!.name = userAnswerPlayer.name;
        }
      }

      if (userAnswerPlayer?.hasOwnProperty('nationality')) {
        console.log('found nationality');
        if (allStatPlayer!.nationality === userAnswerPlayer.nationality) {
          console.log('match');
          removedStatPlayer!.nationality = userAnswerPlayer.nationality;
        }
      }

      if (userAnswerPlayer?.hasOwnProperty('team')) {
        console.log('found team');
        if (allStatPlayer!.team === userAnswerPlayer.team) {
          console.log('match');
          removedStatPlayer!.team = userAnswerPlayer.team;
        }
      }
    }

    setStatRemove([...statRemove]); // updating statRemove to fill in gaps if answer is right. No need to clone deep as original state doesn't need to be preserved
  }

  useEffect(() => {
    // using setState is kinda async, so need to log out update inside a useEffect
    console.log(statRemove);
  }, [statRemove]);

  useEffect(() => {
    // using setState is kinda async, so need to log out update inside a useEffect
    console.log(userAnswers);
  }, [userAnswers]);

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
