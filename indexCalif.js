// script.js
const participantForm = document.getElementById('participantForm');
const ratingContainer = document.getElementById('ratingContainer');
const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];

let participants = [];
let numRounds = 0;
let currentRound = 0;
let ratings = [];

participantForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const participant1 = document.getElementById('participant1').value.trim();
  const participant2 = document.getElementById('participant2').value.trim();
  numRounds = parseInt(document.getElementById('numRounds').value);

  if (participant1 && participant2 && numRounds > 0) {
    participants = [participant1, participant2];
    createRatingForm();
  } else {
    alert('Por favor, ingresa los nombres de los participantes y el número de rimas a calificar.');
  }
});

function createRatingForm() {
  ratingContainer.innerHTML = '';

  const roundInfo = document.createElement('h3');
  roundInfo.textContent = `Rima ${currentRound + 1} de ${numRounds}`;
  ratingContainer.appendChild(roundInfo);

  participants.forEach((participant, index) => {
    const participantDiv = document.createElement('div');
    participantDiv.classList.add('participant');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = `${participant}:`;
    participantDiv.appendChild(nameLabel);

    const ratingInput = document.createElement('input');
    ratingInput.type = 'number';
    ratingInput.min = '0';
    ratingInput.max = '4';
    ratingInput.step = '0.5';
    ratingInput.required = true;
    participantDiv.appendChild(ratingInput);

    ratingContainer.appendChild(participantDiv);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = currentRound === numRounds - 1 ? 'Finalizar Calificación' : 'Siguiente Rima';
  submitButton.addEventListener('click', handleRatingSubmit);
  ratingContainer.appendChild(submitButton);
}

function handleRatingSubmit() {
  const ratingInputs = document.querySelectorAll('.participant input');
  const roundRatings = [];

  ratingInputs.forEach((input) => {
    const rating = parseFloat(input.value);
    if (rating < 0 || rating > 4 || isNaN(rating)) {
      alert('La calificación debe estar entre 0 y 4, con incrementos de 0.5.');
      return;
    }
    roundRatings.push(rating);
  });

  if (roundRatings.length === participants.length) {
    ratings.push(roundRatings);
    currentRound++;

    if (currentRound === numRounds) {
      showResults();
    } else {
      createRatingForm();
    }
  }
}

function showResults() {
  resultsTable.innerHTML = '';

  participants.forEach((participant, index) => {
    const totalRating = ratings.reduce((sum, roundRatings) => sum + roundRatings[index], 0);
    const row = document.createElement('tr');

    const participantCell = document.createElement('td');
    participantCell.textContent = participant;
    row.appendChild(participantCell);

    const ratingCell = document.createElement('td');
    ratingCell.textContent = totalRating.toFixed(1);
    row.appendChild(ratingCell);

    resultsTable.appendChild(row);
  });
}