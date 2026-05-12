import { Routes, Route, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import TeamInfo from "./TeamInfo";

function DisplayTeam() {
  const link =
    "http://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard?dates=";

  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (date === "") return;

    fetch(link + date.split("-").join(""))
      .then((res) => res.json())
      .then((data) => {
        const games = [];

        for (let e of data.events) {
          const competitors = e.competitions[0].competitors;

          const team1 = competitors[0];
          const team2 = competitors[1];

          const team1Score = Number(team1.score);
          const team2Score = Number(team2.score);

          let winnerName = "";

          if (team1Score > team2Score) {
            winnerName = team1.team.name;
          } else if (team2Score > team1Score) {
            winnerName = team2.team.name;
          } else {
            winnerName = "Draw";
          }

          games.push({
            event: e.name,

            team1: team1.team.name,
            team1Logo: team1.team.logo,
            team1Score,

            team2: team2.team.name,
            team2Logo: team2.team.logo,
            team2Score,

            winner: winnerName,
          });
        }

        setResults(games);
      })
      .catch((err) => console.error(err));
  }, [date]);

  return (
    <div className="container py-4">
      <h2 className="main_header text-center mb-4">MLS Scores</h2>

      <div className="d-flex justify-content-center mb-4">
        <input
          type="date"
          className="form-control bg-dark text-light border-secondary"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="row">
        {results.map((game, index) => (
          <Competition key={index} game={game} />
        ))}
      </div>
    </div>
  );
}

function Competition({ game }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-lg h-100 bg-dark text-light">
        <div className="card-body text-center">
          <h5 className="card-title">{game.event}</h5>

          <div className="d-flex justify-content-around align-items-center my-3">
            <Team
              name={game.team1}
              logo={game.team1Logo}
              score={game.team1Score}
              isWinner={game.winner === game.team1}
            />

            <span className="fs-4 fw-bold">VS</span>

            <Team
              name={game.team2}
              logo={game.team2Logo}
              score={game.team2Score}
              isWinner={game.winner === game.team2}
            />
          </div>

          <div className="mt-3">
            <span className="badge bg-success">
              {game.winner === "Draw" ? "Draw" : `Winner: ${game.winner}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Team({ name, logo, score, isWinner }) {
  return (
    <div>
      <img src={logo} alt={name} style={{ width: 70 }} />

      <p
        className={`mb-0 ${isWinner ? "text-success fw-bold" : ""}`}
        to="/TeamInfo"
      >
        {name}
      </p>

      <strong>{score}</strong>
    </div>
  );
}

export default DisplayTeam;
