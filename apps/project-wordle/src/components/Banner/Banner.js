export default function Banner({
  hasWon,
  hasLost,
  guessNum,
  answer,
}) {
  const hasWonBanner = (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong>{guessNum} guesses</strong>.
      </p>
    </div>
  );

  const hasLostBanner = (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );

  return (
    <div className="banner">
      {hasWon && hasWonBanner}
      {hasLost && hasLostBanner}
    </div>
  );
}
