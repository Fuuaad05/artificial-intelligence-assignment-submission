const secretCode = ['red', 'blue', 'green', 'yellow'];
const rows = document.querySelectorAll('.row');
document.querySelector('.solved').style.display = 'none';

// Function to reveal pegs and dots for a single row
function revealRow(rowIndex) {
  const row = rows[rowIndex];
  const pegs = row.querySelectorAll('.peg');
  const feedback = row.querySelector('.feedback');

  const guess = Array.from(pegs).map(peg => {
    if (peg.classList.contains('red')) return 'red';
    if (peg.classList.contains('blue')) return 'blue';
    if (peg.classList.contains('green')) return 'green';
    if (peg.classList.contains('yellow')) return 'yellow';
  });

  // Check black dots
  let blackDots = 0;
  const secretCopy = [...secretCode];
  const guessCopy = [...guess];

  for (let i = 0; i < guessCopy.length; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      blackDots++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  // Reveal pegs one by one
  pegs.forEach((peg, i) => {
    setTimeout(() => {
      peg.style.opacity = 1;
      peg.style.transform = 'scale(1)';
    }, i * 200);
  });

  // Reveal dots after pegs
  setTimeout(() => {
    for (let i = 0; i < blackDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      feedback.appendChild(dot);
    }

    if (blackDots === secretCode.length) {
      document.querySelector('.solved').style.display = 'block';
    }
  }, pegs.length * 200 + 200);
}

// Reveal all rows sequentially
rows.forEach((row, index) => {
  setTimeout(() => {
    revealRow(index);
  }, index * 1500);
});