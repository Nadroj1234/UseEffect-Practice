import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Competition from "./Competition";

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
      <h2 className="text-center mb-4 text-light">MLS Scores</h2>

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

export default DisplayTeam;
