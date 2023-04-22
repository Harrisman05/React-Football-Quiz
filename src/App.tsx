import { useEffect, useState } from 'react';
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

      const allPlayers: Player[] = data['response'].map(
        (el: PlayerStats, index: number) => ({
          name: removeAbbrevName(el.player.name),
          firstname: el.player.firstname,
          lastname: el.player.lastname,
          nationality: el.player.nationality,
          team: el.statistics[0].team.name,
          ranking: index + 1, // index object comes in order, so use index to calculate ranking
          goals: el.statistics[0].goals.total,
        })
      );

      console.log(allPlayers);
    };
    // getData();
  }, []);

  const allPlayers: Player[] = example_json['response'].map(
    (el: PlayerStats, index: number) => ({
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
  }, []);

  function statRemover(players: Player[]) {

    const playersClone: Player[] = JSON.parse(JSON.stringify(players));

    const quizPlayers: QuizPlayer[] = playersClone.map((el) => {
      const statsToRemove = ['nationality', 'team', 'goals'];
      const randomIndex = Math.floor(Math.random() * 3);
      const randomKey = statsToRemove[randomIndex];
      el[randomKey] = ''; // keys are never by default, have to assign them type in interface to prevent never bug. have to set key type to any, a bit loose...
      el.name = ''; // always remove name
      return el;
    });
    return quizPlayers;
  }

  const quizPlayers = statRemover(allPlayers);

  console.log(statRemover(allPlayers));
  console.log(allPlayers);

  return (
    <div className='App'>
      <button onClick={() => setStatRemove(quizPlayers)}>see data</button>
      <div className='bg-red-600 flex-col gap-8'>
        {statRemove.map((player, i) => {
          return (
            <div key={i} className='flex gap-8'>
              <div className='w-4 flex items-center'>{player.ranking}</div>
              <div className='w-1/4 flex items-center'>{player.name}</div>
              <div className='w-1/4 flex items-center'>
                {player.nationality}
              </div>
              <div className='w-1/4 flex items-center'>{player.team}</div>
              <div className='w-4 flex items-center'>{player.goals}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
