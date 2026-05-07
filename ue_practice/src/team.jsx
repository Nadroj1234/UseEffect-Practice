function Team({ name, logo, score, isWinner }) {
  return (
    <div>
      <img src={logo} alt={name} style={{ width: 70 }} />

      <p className={`mb-0 ${isWinner ? "text-success fw-bold" : ""}`}>{name}</p>

      <strong>{score}</strong>
    </div>
  );
}

export default Team;
