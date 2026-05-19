import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [presidents] = useState([
    { id: 1, name: 'Florentino Pérez', year: 2000 },
    { id: 2, name: 'Joan Laporta', year: 2003 },
  ]);

  const [teams] = useState([
    {
      id: 1,
      name: 'Real Madrid',
      city: 'Madrid',
      stadium: 'Santiago Bernabéu',
      capacity: 81000,
      yearOfFundation: 1902,
      presidentId: 1,
    },
    {
      id: 2,
      name: 'FC Barcelona',
      city: 'Barcelona',
      stadium: 'Camp Nou',
      capacity: 99000,
      yearOfFundation: 1899,
      presidentId: 2,
    },
  ]);

  const [players] = useState([
    { id: 1, name: 'Vinícius Jr', position: 'Extremo', teamId: 1 },
    { id: 2, name: 'Pedri', position: 'Volante', teamId: 2 },
  ]);

  const [games] = useState([
    { id: 1, date: '2026-05-15', localGoals: 2, awayGoals: 1 },
  ]);

  const [goals] = useState([
    {
      id: 1,
      name: 'Gol 1',
      description: 'Remate de pierna derecha',
      playerId: 1,
      gameId: 1,
    },
  ]);

  const [teamGame] = useState([
    { id: 1, teamId: 1, gameId: 1 },
    { id: 2, teamId: 2, gameId: 1 },
  ]);

  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id ?? null);

  const teamsWithRelations = useMemo(
    () =>
      teams.map((team) => {
        const president = presidents.find((item) => item.id === team.presidentId);
        const featuredPlayer = players.find((item) => item.teamId === team.id);

        return {
          ...team,
          president,
          featuredPlayer,
        };
      }),
    [teams, presidents, players]
  );

  const gamesWithRelations = useMemo(
    () =>
      games.map((game) => {
        const relatedTeams = teamGame
          .filter((item) => item.gameId === game.id)
          .map((item) => teams.find((team) => team.id === item.teamId));

        const relatedGoals = goals
          .filter((goal) => goal.gameId === game.id)
          .map((goal) => ({
            ...goal,
            player: players.find((player) => player.id === goal.playerId),
          }));

        return {
          ...game,
          localTeam: relatedTeams[0],
          awayTeam: relatedTeams[1],
          relatedGoals,
        };
      }),
    [games, teamGame, teams, goals, players]
  );

  const teamViewRows = useMemo(
    () =>
      teamsWithRelations.map((team) => ({
        team: team.name,
        stadium: team.stadium,
        president: team.president?.name ?? 'Sin presidente',
        featuredPlayer: team.featuredPlayer?.name ?? 'Sin jugador',
        position: team.featuredPlayer?.position ?? 'Sin posición',
      })),
    [teamsWithRelations]
  );

  const gameViewRows = useMemo(
    () =>
      gamesWithRelations.flatMap((game) =>
        game.relatedGoals.map((goal) => ({
          date: game.date,
          localGoals: game.localGoals,
          awayGoals: game.awayGoals,
          goalName: goal.name,
          goalDetail: goal.description,
          scorer: goal.player?.name ?? 'Sin jugador',
        }))
      ),
    [gamesWithRelations]
  );

  const selectedTeam = teamsWithRelations.find((team) => team.id === selectedTeamId);

  return (
    <div className="league-app">
      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">React + Vite + modelo MySQL</span>
          <h1>Panel visual de la liga</h1>
          <p>
            Esta app toma la misma estructura del archivo SQL y la representa
            en una interfaz clara con presidentes, equipos, jugadores,
            partidos, goles y consultas relacionadas.
          </p>
        </div>

        <div className="hero-score">
          <span className="score-label">Partido cargado</span>
          <strong>
            {gamesWithRelations[0].localTeam?.name} {gamesWithRelations[0].localGoals} -{' '}
            {gamesWithRelations[0].awayGoals} {gamesWithRelations[0].awayTeam?.name}
          </strong>
          <span>{gamesWithRelations[0].date}</span>
        </div>
      </header>

      <main className="page-shell">
        <section className="summary-grid">
          <article className="metric-card">
            <span className="metric-label">Presidentes</span>
            <strong>{presidents.length}</strong>
            <p>Tabla `presidents` enlazada con `teams`.</p>
          </article>

          <article className="metric-card">
            <span className="metric-label">Equipos</span>
            <strong>{teams.length}</strong>
            <p>Con ciudad, estadio, capacidad y año de fundación.</p>
          </article>

          <article className="metric-card">
            <span className="metric-label">Jugadores</span>
            <strong>{players.length}</strong>
            <p>Cada jugador pertenece a un equipo por `team_id`.</p>
          </article>

          <article className="metric-card">
            <span className="metric-label">Goles</span>
            <strong>{goals.length}</strong>
            <p>Relacionados con jugador y partido.</p>
          </article>
        </section>

        <section className="panel">
          <div className="section-heading">
            <span className="eyebrow">Modelo relacional</span>
            <h2>Estructura equivalente al MySQL</h2>
          </div>

          <div className="schema-grid">
            <article className="schema-card">
              <h3>presidents</h3>
              <ul>
                <li>`id`</li>
                <li>`name`</li>
                <li>`year`</li>
              </ul>
            </article>

            <article className="schema-card">
              <h3>teams</h3>
              <ul>
                <li>`id`</li>
                <li>`name`, `city`, `stadium`</li>
                <li>`capacity`, `year_of_fundation`</li>
                <li>`president_id`</li>
              </ul>
            </article>

            <article className="schema-card">
              <h3>players</h3>
              <ul>
                <li>`id`</li>
                <li>`name`</li>
                <li>`position`</li>
                <li>`team_id`</li>
              </ul>
            </article>

            <article className="schema-card">
              <h3>games y goals</h3>
              <ul>
                <li>`games`: fecha y marcador</li>
                <li>`goals`: nombre, descripción</li>
                <li>FK a `player_id` y `game_id`</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <span className="eyebrow">Datos insertados</span>
            <h2>Equipos y relaciones principales</h2>
          </div>

          <div className="team-selector">
            <label htmlFor="team-select">Equipo seleccionado:</label>
            <select
              id="team-select"
              value={selectedTeamId ?? ''}
              onChange={(event) => setSelectedTeamId(Number(event.target.value))}
            >
              {teamsWithRelations.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {selectedTeam && (
            <div className="selected-team-card">
              <h3>{selectedTeam.name}</h3>
              <p>{selectedTeam.city} · {selectedTeam.stadium}</p>
              <p>Presidente: {selectedTeam.president?.name}</p>
              <p>Jugador estrella: {selectedTeam.featuredPlayer?.name}</p>
            </div>
          )}

          <div className="club-grid">
            {teamsWithRelations.map((team) => (
              <article key={team.id} className="club-card">
                <div className="club-top">
                  <span className="club-city">{team.city}</span>
                  <h3>{team.name}</h3>
                  <p>{team.stadium}</p>
                </div>

                <dl className="club-meta">
                  <div>
                    <dt>Presidente</dt>
                    <dd>{team.president?.name}</dd>
                  </div>
                  <div>
                    <dt>Desde</dt>
                    <dd>{team.president?.year}</dd>
                  </div>
                  <div>
                    <dt>Capacidad</dt>
                    <dd>{team.capacity.toLocaleString('es-CO')}</dd>
                  </div>
                  <div>
                    <dt>Jugador</dt>
                    <dd>
                      {team.featuredPlayer?.name} · {team.featuredPlayer?.position}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <span className="eyebrow">Visualización SQL</span>
            <h2>Consulta de equipos, presidente y jugador estrella</h2>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Equipo</th>
                  <th>Estadio</th>
                  <th>Presidente</th>
                  <th>Jugador estrella</th>
                  <th>Posición</th>
                </tr>
              </thead>
              <tbody>
                {teamViewRows.map((row) => (
                  <tr key={row.team}>
                    <td>{row.team}</td>
                    <td>{row.stadium}</td>
                    <td>{row.president}</td>
                    <td>{row.featuredPlayer}</td>
                    <td>{row.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <span className="eyebrow">Partidos y goles</span>
            <h2>Consulta de marcador y anotaciones</h2>
          </div>

          <div className="match-grid">
            {gamesWithRelations.map((game) => (
              <article key={game.id} className="match-card">
                <div className="match-scoreboard">
                  <div>
                    <span>Local</span>
                    <strong>{game.localTeam?.name}</strong>
                  </div>
                  <div className="score-pill">
                    {game.localGoals} - {game.awayGoals}
                  </div>
                  <div>
                    <span>Visitante</span>
                    <strong>{game.awayTeam?.name}</strong>
                  </div>
                </div>
                <p className="match-date">{game.date}</p>
              </article>
            ))}
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Fecha partido</th>
                  <th>Goles local</th>
                  <th>Goles visitante</th>
                  <th>Anotación</th>
                  <th>Detalle del gol</th>
                  <th>Jugador</th>
                </tr>
              </thead>
              <tbody>
                {gameViewRows.map((row) => (
                  <tr key={`${row.date}-${row.goalName}`}>
                    <td>{row.date}</td>
                    <td>{row.localGoals}</td>
                    <td>{row.awayGoals}</td>
                    <td>{row.goalName}</td>
                    <td>{row.goalDetail}</td>
                    <td>{row.scorer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
