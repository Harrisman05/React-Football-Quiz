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
  const [allStatsPlayers, setScorers] = useState<AllStatsPlayer[]>([]);
  const [statRemove, setStatRemove] = useState<ModifiedStatsPlayer[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(new Map());

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
    const allStatsPlayersClone = cloneDeep(
      allStatsPlayers
    ) as ModifiedStatsPlayer[]; // have to clone so that I preserve answers and allow removal of some answers from a distinct reference object (shallow clone could  mess it up as value is object {}, deep clone to be safe). Use type assertation to convert type as compiler can't figure this out on it's own

    const removedStatsPlayers: ModifiedStatsPlayer[] = allStatsPlayersClone.map(
      // now switching type to allow empty string literals
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
  const removedStatsPlayers = statRemover(allStatsPlayer);

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

    console.log(typeof userAnswersMap);
    setUserAnswers(userAnswersMap);
  }

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
      const allStatPlayer = allStatsPlayers.reduce((acc: any, item: any) => {
        if (item.get(key)) {
          acc = item.get(key);
        }
        return acc;
      }, null);

      console.log(removedStatPlayer);
      console.log(userAnswerPlayer);
      console.log(allStatsPlayers);
      console.log(allStatPlayer);

      // extract player from allStatsPlayer map using current key iteration

      console.log(userAnswerPlayer?.hasOwnProperty('nationality'));
      console.log(userAnswerPlayer?.hasOwnProperty('team'));
      console.log(userAnswerPlayer?.hasOwnProperty('goals'));

      if (
        userAnswerPlayer?.hasOwnProperty('nationality') &&
        userAnswerPlayer.nationality !== undefined
      ) {
        console.log('found nationality');
        console.log(userAnswerPlayer.nationality);
        if (allStatPlayer.nationality === userAnswerPlayer.nationality) {
          console.log('match');
          removedStatPlayer!.nationality = userAnswerPlayer.nationality;
        }
      }

      if (
        userAnswerPlayer?.hasOwnProperty('team') &&
        userAnswerPlayer.team !== undefined
      ) {
        console.log('found team');
        if (allStatPlayer.team === userAnswerPlayer.team) {
          console.log('match');
          removedStatPlayer!.team = userAnswerPlayer.team;
        }
      }

      if (
        userAnswerPlayer?.hasOwnProperty('goals') &&
        Number(userAnswerPlayer.goals) !== undefined
      ) {
        console.log('found goals');
        if (allStatPlayer.goals === Number(userAnswerPlayer.goals)) {
          console.log('match');
          removedStatPlayer!.goals = Number(userAnswerPlayer.goals);
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
