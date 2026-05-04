import { useEffect, useState } from "react";

function SearchUSers() {
  const link =
    "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=";
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (date === "") return;
    fetch(link + date.split("-").join(""))
      .then((res) => res.json())
      .then((results) => {
        setResults(results);
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
        <div>{JSON.stringify(results, 2)}</div>
      </div>
    </>
  );
}

export default SearchUSers;
