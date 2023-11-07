// Include this script in your HTML to use tippy.js
// <script src="https://unpkg.com/@popperjs/core@2"></script>
// <script src="https://unpkg.com/tippy.js@6"></script>

function generateQuizUI(quizData) {
  const quizContainer = document.getElementById('quiz');
  quizContainer.innerHTML = '';

  // Create the paragraph with tooltip
  const paragraphEl = document.createElement('p');
  paragraphEl.classList.add('paragraph');
  paragraphEl.setAttribute('data-tippy-content', quizData.paragraph.english);
  paragraphEl.textContent = quizData.paragraph.irish;
  quizContainer.appendChild(paragraphEl);

  // Create questions and options
  quizData.questions.forEach(question => {
    const questionEl = document.createElement('div');
    questionEl.classList.add('question');
    questionEl.innerHTML = `<p data-tippy-content="${question.english}">${question.irish}</p>`;
    const optionsList = document.createElement('ul');

    for (let optionKey in question.options) {
      const option = question.options[optionKey];
      const listItem = document.createElement('li');
      listItem.setAttribute('data-tippy-content', option.english);
      listItem.classList.add('answer-option');
      listItem.textContent = `${optionKey}. ${option.irish}`;
      //listItem.addEventListener('click', () => handleOptionClick(optionKey, question.correct));

      // Use handleAnswerClick to show feedback on click
      listItem.addEventListener('click', () => handleAnswerClick(optionKey === question.correct, listItem));

      optionsList.appendChild(listItem);
    }

    questionEl.appendChild(optionsList);
    quizContainer.appendChild(questionEl);
  });

  // Initialize tippy.js tooltips
  tippy('[data-tippy-content]', {
    placement: 'bottom',
    theme: 'light',
  });
}

function clearFeedback() {
  // Select all answer elements
  const answers = document.querySelectorAll('.answer-option');
  // Loop through the NodeList and remove feedback classes
  answers.forEach(answer => {
    answer.classList.remove('correct-answer', 'wrong-answer');
  });
}



function handleAnswerClick(isCorrect, element) {
  // Clear all previous feedback
  clearFeedback();

  if (isCorrect) {
    element.classList.add('correct-answer');
  } else {
    element.classList.add('wrong-answer');
  }
}


generateQuizUI(/* your JSON data here */);
