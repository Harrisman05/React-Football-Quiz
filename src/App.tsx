import { ReactEventHandler, useEffect, useState } from 'react';
import example_json from './assets/example_json';
import PlayerStats from './types/PlayerStats';
import AllStatsPlayer from './types/AllStatsPlayer';
import ModifiedStatsPlayer from './types/ModifiedStatsPlayer';
import QuizPlayer from './types/QuizPlayer';
import removeAbbrevName from './utils/removeAbbrevName';
import randomStatRemove from './utils/randomStatRemove';
import UserAnswers from './types/UserAnswers';
import { cloneDeep } from 'lodash';


function App() {
  const [scorers, setScorers] = useState<AllStatsPlayer[]>([]);
  const [statRemove, setStatRemove] = useState<ModifiedStatsPlayer[]>([]);
  const [userAnswers, setUserAnswers] = useState<Map<any, any>>(new Map());

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
      // console.log(data);
    };
    // getData();
  }, []);

  let allStatsPlayer: AllStatsPlayer[] = example_json['response'].map(
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

  useEffect(() => {
    setScorers(allStatsPlayer);
    localStorage.setItem('allStatsPlayers', JSON.stringify(allStatsPlayer));
  }, []);

  function statRemover(allStatsPlayers: AllStatsPlayer[]) {
    const allStatsPlayersClone = cloneDeep(allStatsPlayers) as ModifiedStatsPlayer[] // have to clone so that I preserve answers and allow removal of some answers from a distinct reference object (shallow clone could  mess it up as value is object {}, deep clone to be safe). Use type assertation to convert type as compiler can't figure this out on it's own

    const removedStatsPlayers: ModifiedStatsPlayer[] = allStatsPlayersClone.map( // now switching type to allow empty string literals 
      (el) => {
        const keyIterator = el.keys(); // had to extend AllStatsPlayer interface to Map to allow use of keys()
        const key = keyIterator.next().value;
        console.log(key);

        const statsToRemove = ['nationality', 'team']; // could be randomiser function
        const randomIndex = Math.floor(Math.random() * 2);
        const randomKey = statsToRemove[randomIndex];

        if (el.get(key) !== undefined) {
          // check that the player value is not undefined, better safety
          // Non-null expression You can postfix an expression with ! to tell TypeScript that you know it's not null or undefined. This works the same as an 'as' assertion.
          el.get(key)![randomKey] = '';
          el.get(key)!.name = ''; // always remove name
        }
        return el;
      }
    );
    return removedStatsPlayers;
  }
  const removedStatsPlayers = statRemover(allStatsPlayer)

  console.log(removedStatsPlayers);
  console.log(allStatsPlayer);

  function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userAnswersMap: UserAnswers = new Map();

    for (const [nameId, value] of formData.entries()) {
      console.log(nameId, value);
      const [name, idStr] = nameId.split('-');
      const id = Number(idStr); // values coming from form are always strings, convert to number to avoid type errors
      console.log(id, name, value);

      if (!userAnswersMap.has(id)) {
        // set id as a key on the user answer map if it doesn't exist
        userAnswersMap.set(id, {
          [name]: value,
        });
      } else {
        const answerObject = userAnswersMap.get(id);
        const updatedAnswerObject = {
          ...answerObject,
          [name]: value,
        };
        userAnswersMap.set(id, updatedAnswerObject);
      }
    }

    console.log(userAnswersMap);
    setUserAnswers(userAnswersMap);
  }

  useEffect(() => {
    if (userAnswers) {
      checkAnswers();
    }
  }, [userAnswers]);

  function checkAnswers() {
    console.log(scorers);
    const statRemoveClone = [...statRemove];
    console.log(statRemoveClone);

    for (let player of statRemoveClone) {
      const keyIterator = player.keys();
      const key = Number(keyIterator.next().value);
      console.log(key);
      console.log(player.get(key));
      console.log(userAnswers.get(key));
      console.log(scorers);

      const scorersCheck = scorers.reduce((acc: any, item: any) => {
        if (item.get(key)) {
          acc = item.get(key);
        }
        return acc;
      }, null);
      console.log(scorersCheck);

      console.log(userAnswers.get(key).hasOwnProperty('nationality'));
      console.log(userAnswers.get(key).hasOwnProperty('team'));
      console.log(userAnswers.get(key).hasOwnProperty('goals'));

      if (userAnswers.get(key).hasOwnProperty('nationality')) {
        console.log('found nationality');
        console.log(userAnswers.get(key).nationality);
        if (scorersCheck.nationality === userAnswers.get(key).nationality) {
          console.log('match');
          player.get(key)!.nationality = userAnswers.get(key).nationality;
        }
      }

      if (userAnswers.get(key).hasOwnProperty('team')) {
        console.log('found team');
        if (scorersCheck.team === userAnswers.get(key).team) {
          console.log('match');
          player.get(key)!.team = userAnswers.get(key).team;
        }
      }

      if (userAnswers.get(key).hasOwnProperty('goals')) {
        console.log('found goals');
        if (scorersCheck.goals === Number(userAnswers.get(key).goals)) {
          console.log('match');
          player.get(key)!.goals = Number(userAnswers.get(key).goals);
        }
      }
    }

    setStatRemove(statRemoveClone);
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
        <form onSubmit={handleSubmit}>
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
