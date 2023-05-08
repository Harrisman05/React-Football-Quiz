const one_player: any = {
    get: 'players/topscorers',
    parameters: {
      league: '39',
      season: '2010',
    },
    errors: [],
    results: 20,
    paging: {
      current: 0,
      total: 1,
    },
    response: [
      {
        player: {
          id: 113639,
          name: 'Dimitar Ivanov Berbatov',
          firstname: 'Dimitar',
          lastname: 'Ivanov Berbatov',
          age: 37,
          birth: {
            date: '1981-01-30',
            place: 'Blagoevgrad',
            country: 'Bulgaria',
          },
          nationality: 'Bulgaria',
          height: '188 cm',
          weight: '79 kg',
          injured: false,
          photo: 'https://media-2.api-sports.io/football/players/113639.png',
        },
        statistics: [
          {
            team: {
              id: 33,
              name: 'Manchester United',
              logo: 'https://media-3.api-sports.io/football/teams/33.png',
            },
            league: {
              id: 39,
              name: 'Premier League',
              country: 'England',
              logo: 'https://media-3.api-sports.io/football/leagues/39.png',
              flag: 'https://media-3.api-sports.io/flags/gb.svg',
              season: 2010,
            },
            games: {
              appearences: 32,
              lineups: 24,
              minutes: 2210,
              number: null,
              position: 'Attacker',
              rating: null,
              captain: false,
            },
            substitutes: {
              in: 8,
              out: 9,
              bench: 10,
            },
            shots: {
              total: null,
              on: null,
            },
            goals: {
              total: 20,
              conceded: null,
              assists: null,
              saves: null,
            },
            passes: {
              total: null,
              key: null,
              accuracy: null,
            },
            tackles: {
              total: null,
              blocks: null,
              interceptions: null,
            },
            duels: {
              total: null,
              won: null,
            },
            dribbles: {
              attempts: null,
              success: null,
              past: null,
            },
            fouls: {
              drawn: null,
              committed: null,
            },
            cards: {
              yellow: 1,
              yellowred: 0,
              red: 0,
            },
            penalty: {
              won: null,
              commited: null,
              scored: null,
              missed: null,
              saved: null,
            },
          },
        ],
      }
    ]
}

export default one_player