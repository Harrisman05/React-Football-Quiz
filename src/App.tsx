import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import example_json from './assets/example_json'

function App() {
  const [scorers, setScorers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      var options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        },
      };

      const season = 2010;
      const response = await fetch(
        `https://v3.football.api-sports.io/players/topscorers?league=39&season=${season}`,
        options
      );

      const body = await response.text();
      const data = JSON.parse(body);
      console.log(data);
    };
    // getData();
  }, []);

  interface Player {
    name: string;
    goals: number;
  }
  
  interface PlayerStats {
    player: {
      name: string;
    };
    statistics: {
      goals: {
        total: number;
      };
    }[];
  }
  
  const allStats: Player[] = example_json['response'].map((el: PlayerStats) => ({
    name: el.player.name,
    goals: el.statistics[0].goals.total
  }));
  
  console.log(allStats);

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
