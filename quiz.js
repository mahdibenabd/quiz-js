let score = 0;
let currentQuestionIndex = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const questionNumberElement = document.getElementById('question-number');

function displayQuestion() {
  fetch('quizData.json')
    .then(response => response.json())
    .then(quizData => {
      const q = quizData[currentQuestionIndex];
      questionElement.textContent = q.question;
      optionsElement.innerHTML = '';
      q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsElement.appendChild(button);
      });
      questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} sur ${quizData.length}`;
    })
    .catch(error => console.error('Erreur lors du chargement des données du quiz:', error));
}

function checkAnswer(index) {
  fetch('quizData.json')
    .then(response => response.json())
    .then(quizData => {
      const q = quizData[currentQuestionIndex];
      if (index === q.answer) {
        score++;
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        displayQuestion();
      } else {
        endQuiz(quizData.length);
      }
    })
    .catch(error => console.error('Erreur lors du chargement des données du quiz:', error));
}

function endQuiz(quizDataLength) {
    let message;
    let messageColor;
    if (score < 10) {
        message = "Désolé, vous n'avez pas réussi le quiz.";
        messageColor = "red";
    } else {
        message = "Félicitations, vous avez réussi le quiz!";
        messageColor = "green";
    }
    questionElement.innerHTML = `
        <p>Vous avez terminé le quiz! Votre score est de ${score}/${quizDataLength}.</p>
        <p style="color: ${messageColor};">${message}</p>
    `;
    optionsElement.innerHTML = '';
    questionNumberElement.textContent = '';
  }

displayQuestion();
