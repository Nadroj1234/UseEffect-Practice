import { useEffect, useState } from "react";
import "./index.css";
function SearchUSers() {
  const link =
    "http://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard?dates=";
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (date === "") return;

    fetch(link + date.split("-").join(""))
      .then((res) => res.json())
      .then((data) => {
        const teams = [];
        const events_list = [];

        for (let e of data.events) {
          events_list.push(e.name[0]);
          for (let c of e.competitions) {
            for (let a of c.competitors) {
              teams.push(a.team);
            }
          }
        }

        setResults(teams, events_list);
        console.log(teams);
      })
      .catch((err) => console.error(err));
  }, [date]);

  return (
    <>
      <div>
        <h2>Find Date</h2>
        <input
          type="date"
          placeholder="Choose A Date"
          onChange={(e) => setDate(e.target.value)}
        />
        {/* <div>{JSON.stringify(results, 2)}</div> */}
        <div className="results_div">
          {results.map((team, index) => (
            <div key={index}>
              <p>{team.name}</p>
              <img src={team.logo} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchUSers;
