import { ReactEventHandler, useEffect, useState } from 'react';
import example_json from './assets/example_json';
import PlayerStats from './types/PlayerStats';
import Player from './types/Player';
import QuizPlayer from './types/QuizPlayer';
import removeAbbrevName from './utils/removeAbbrevName';
import randomStatRemove from './utils/randomStatRemove';

function App() {
  const [scorers, setScorers] = useState<Player[]>([]);
  const [statRemove, setStatRemove] = useState<QuizPlayer[]>([]);

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

  const allPlayers: Player[] = example_json['response'].map(
    (el: PlayerStats, index: number) => ({
      id: el.player.id,
      name: removeAbbrevName(el.player.name),
      firstname: el.player.firstname,
      lastname: el.player.lastname,
      nationality: el.player.nationality,
      team: el.statistics[0].team.name,
      ranking: index + 1, // index object comes in order, so use index to calculate ranking
      goals: el.statistics[0].goals.total,
    })
  );

  useEffect(() => {
    setScorers(allPlayers);
    localStorage.setItem('players', JSON.stringify(allPlayers));
  }, []);

  function statRemover(players: Player[]) {
    const playersClone: Player[] = JSON.parse(JSON.stringify(players));

    const quizPlayers: QuizPlayer[] = playersClone.map((el) => {
      const statsToRemove = ['nationality', 'team', 'goals'];
      const randomIndex = Math.floor(Math.random() * 3);
      const randomKey = statsToRemove[randomIndex];
      el[randomKey] = typeof el[randomKey] === 'string' ? '' : 0; // value needs to be 0 if goals is randomised
      el.name = ''; // always remove name
      return el;
    });
    return quizPlayers;
  }

  const quizPlayers = statRemover(allPlayers);

  console.log(statRemover(allPlayers));
  console.log(allPlayers);

  function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(formData);
    for (const [nameId, value] of formData.entries()) {
      const [name, id] = nameId.split('-')
      console.log(id, name, value);
    }
  }

  return (
    <div className='App'>
      <button onClick={() => setStatRemove(quizPlayers)}>see data</button>
      <div className='bg-red-600 flex-col'>
        <form onSubmit={handleSubmit}>
          {statRemove.map((player, i) => {
            return (
              <div key={player.id} className='flex gap-8'>
                {player.name === '' ? (
                  <div>
                    <input name={`name_input-${player.id}`} className='w-40 bg-slate-400' />
                  </div>
                ) : (
                  <div className='w-40 flex items-center border-s-blue-900'>
                    {player.name}
                  </div>
                )}
                {player.nationality === '' ? (
                  <input name={`nationality_input-${player.id}`} className='w-40' />
                ) : (
                  <div className='w-40 flex items-center'>
                    {player.nationality}
                  </div>
                )}

                {player.team === '' ? (
                  <input name={`team_input-${player.id}`} className='w-40' />
                ) : (
                  <div className='w-40 flex items-center'>{player.team}</div>
                )}

                {player.goals === 0 ? (
                  <input name={`goals_input-${player.id}`} className='w-40' />
                ) : (
                  <div className='w-40 flex items-center'>{player.goals}</div>
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
