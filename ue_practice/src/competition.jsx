import Team from "./Team";

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

export default Competition;
