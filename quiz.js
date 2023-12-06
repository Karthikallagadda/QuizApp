/* // quiz.js

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdWmpe9xANSj0MTEljovC5J0EhHMCSWHI",
    authDomain: "quizapp-d0651.firebaseapp.com",
    projectId: "quizapp-d0651",
    storageBucket: "quizapp-d0651.appspot.com",
    messagingSenderId: "254196819491",
    appId: "1:254196819491:web:e0e06f9532426600feb396"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const database = app.database();

// Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        correctAnswer: "Paris"
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let userScore = 0;
let quizStarted = false;

// Function to set quiz data
function setQuizData(data) {
    quizData.length = 0;
    Array.prototype.push.apply(quizData, data);
}

// Function to load the next question
function loadNextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const startQuizButton = document.getElementById("start-quiz-button");

    if (!quizStarted) {
        // Hide the start quiz button
        startQuizButton.style.display = "none";

        // Display the question
        questionContainer.textContent = quizData[currentQuestionIndex].question;

        // Display options
        optionsContainer.innerHTML = "";
        quizData[currentQuestionIndex].options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.onclick = function () {
                selectOption(option, quizData[currentQuestionIndex].correctAnswer);
            };
            optionsContainer.appendChild(optionButton);
        });

        quizStarted = true;
    } else if (currentQuestionIndex < quizData.length - 1) {
        // Move to the next question
        currentQuestionIndex++;

        // Display the question after a brief delay
        setTimeout(function () {
            // Display the question
            questionContainer.textContent = quizData[currentQuestionIndex].question;

            // Display options
            optionsContainer.innerHTML = "";
            quizData[currentQuestionIndex].options.forEach((option, index) => {
                const optionButton = document.createElement("button");
                optionButton.textContent = option;
                optionButton.onclick = function () {
                    selectOption(option, quizData[currentQuestionIndex].correctAnswer);
                };
                optionsContainer.appendChild(optionButton);
            });
        }, 1000); // Adjust the delay as needed
    } else {
        // Quiz completed, display score
        displayScore();
    }
}


// Function to handle option selection
function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        // Correct answer, increment score
        userScore++;
    }

    // Move to the next question
    currentQuestionIndex++;
    loadNextQuestion();
}

// Function to start the quiz
function startQuiz() {
    loadNextQuestion();
}

// Function to display the final score
function displayScore() {
    const quizContainer = document.getElementById("quiz-container");
    const scoreContainer = document.getElementById("score-container");
    const userScoreElement = document.getElementById("user-score");

    // Hide quiz container
    quizContainer.style.display = "none";

    // Display score container
    scoreContainer.style.display = "block";

    // Display user's score
    userScoreElement.textContent = `${userScore}/${quizData.length}`;

    // Save the user's score to Firebase
    saveScoreToFirebase(userScore);
}

// Function to save the score to Firebase
function saveScoreToFirebase(score) {
    const user = auth.currentUser;
    const databaseRef = database.ref();

    // Save the score to the database
    const userScoreData = {
        score: score,
        timestamp: Date.now()
    };

    databaseRef.child('users/' + user.uid + '/scores').push(userScoreData);
}
 */


// quiz.js

/* // Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdWmpe9xANSj0MTEljovC5J0EhHMCSWHI",
    authDomain: "quizapp-d0651.firebaseapp.com",
    projectId: "quizapp-d0651",
    storageBucket: "quizapp-d0651.appspot.com",
    messagingSenderId: "254196819491",
    appId: "1:254196819491:web:e0e06f9532426600feb396"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const database = app.database();

// Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        correctAnswer: "Paris"
    },

    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: "Tokyo"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Iron", "Silver"],
        correctAnswer: "Oxygen"
    },
    {
        question: "In which year did World War II end?",
        options: ["1942", "1945", "1950", "1960"],
        correctAnswer: "1945"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the currency of Australia?",
        options: ["Dollar", "Euro", "Pound", "Yen"],
        correctAnswer: "Dollar"
    },
    {
        question: "Which continent is known as the 'Land of the Rising Sun'?",
        options: ["Europe", "Asia", "North America", "Australia"],
        correctAnswer: "Asia"
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let userScore = 0;

// Function to load the next question
function loadNextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question
        questionContainer.textContent = currentQuestion.question;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.onclick = function () {
                selectOption(option, currentQuestion.correctAnswer);
            };
            optionsContainer.appendChild(optionButton);
        });
    } else {
        // Quiz completed, display score
        displayScore();
    }
}

// Function to handle option selection
function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        // Correct answer, increment score
        userScore++;
    }

    // Move to the next question
    currentQuestionIndex++;
    loadNextQuestion();
}

// Function to submit the answer
function submitAnswer() {
    loadNextQuestion();
}

// Function to display the final score
function displayScore() {
    const quizContainer = document.getElementById("quiz-container");
    const scoreContainer = document.getElementById("score-container");
    const userScoreElement = document.getElementById("user-score");

    // Hide quiz container
    quizContainer.style.display = "none";

    // Display score container
    scoreContainer.style.display = "block";

    // Display user's score
    userScoreElement.textContent = `${userScore}/${quizData.length}`;

    // Save the user's score to Firebase
    saveScoreToFirebase(userScore);
}

// Function to save the score to Firebase
function saveScoreToFirebase(score) {
    const user = auth.currentUser;
    const databaseRef = database.ref();

    // Save the score to the database
    const userScoreData = {
        score: score,
        timestamp: Date.now()
    };

    databaseRef.child('users/' + user.uid + '/scores').push(userScoreData);
}




// quiz.js

 */

/* 
const firebaseConfig = {
    apiKey: "AIzaSyBdWmpe9xANSj0MTEljovC5J0EhHMCSWHI",
    authDomain: "quizapp-d0651.firebaseapp.com",
    projectId: "quizapp-d0651",
    storageBucket: "quizapp-d0651.appspot.com",
    messagingSenderId: "254196819491",
    appId: "1:254196819491:web:e0e06f9532426600feb396"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const database = app.database();

// Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: "Tokyo"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Iron", "Silver"],
        correctAnswer: "Oxygen"
    },
    {
        question: "In which year did World War II end?",
        options: ["1942", "1945", "1950", "1960"],
        correctAnswer: "1945"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the currency of Australia?",
        options: ["Dollar", "Euro", "Pound", "Yen"],
        correctAnswer: "Dollar"
    },
    {
        question: "Which continent is known as the 'Land of the Rising Sun'?",
        options: ["Europe", "Asia", "North America", "Australia"],
        correctAnswer: "Asia"
    },

    // Add more questions here
];

let currentQuestionIndex = 0;
let userScore = 0;

// Function to load the next question
function loadNextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question
        questionContainer.textContent = currentQuestion.question;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.onclick = function () {
                selectOption(option, currentQuestion.correctAnswer);
            };
            optionsContainer.appendChild(optionButton);
        });
    } else {
        // Quiz completed, display score
        displayScore();
    }
}

// Function to handle option selection
function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        // Correct answer, increment score
        userScore++;
    }

    // Move to the next question
    currentQuestionIndex++;
    loadNextQuestion();
}

// Function to submit the answer
function submitAnswer() {
    loadNextQuestion();
}

// Function to display the final score
function displayScore() {
    const quizContainer = document.getElementById("quiz-container");
    const scoreContainer = document.getElementById("score-container");
    const userScoreElement = document.getElementById("user-score");

    // Hide quiz container
    quizContainer.style.display = "none";

    // Display score container
    scoreContainer.style.display = "block";

    // Display user's score
    userScoreElement.textContent = `${userScore}/${quizData.length}`;

    // Save the user's score to Firebase
    saveScoreToFirebase(userScore);
}

// Function to save the score to Firebase
function saveScoreToFirebase(score) {
    const user = auth.currentUser;
    const databaseRef = database.ref();

    // Save the score to the database
    const userScoreData = {
        score: score,
        timestamp: Date.now()
    };

    databaseRef.child('users/' + user.uid + '/scores').push(userScoreData);
}

 */


// quiz.js

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdWmpe9xANSj0MTEljovC5J0EhHMCSWHI",
    authDomain: "quizapp-d0651.firebaseapp.com",
    projectId: "quizapp-d0651",
    storageBucket: "quizapp-d0651.appspot.com",
    messagingSenderId: "254196819491",
    appId: "1:254196819491:web:e0e06f9532426600feb396"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const database = app.database();function setQuizData(quizData) {
    // Code to dynamically create elements for questions based on quizData
    // For example, using a loop to create <h1> elements for each question
    quizData.forEach((questionObj, index) => {
        const questionContainer = document.getElementById('question-container');
        const questionElement = document.createElement('h2');
        questionElement.textContent = `${index + 1}. ${questionObj.question}`;
        questionContainer.appendChild(questionElement);
    });
    
    
}


// Quiz Data
const quizData = [
    


    

    {
        
        question: "1.What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        correctAnswer: "Paris"
       
        },
    {
        question: "2.Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "3.What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "4.Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "5.What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: "Tokyo"
    },
    {
        question: "6.Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Iron", "Silver"],
        correctAnswer: "Oxygen"
    },
    {
        question: "7.In which year did World War II end?",
        options: ["1942", "1945", "1950", "1960"],
        correctAnswer: "1945"
    },
    {
        question: "8.Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "9.What is the currency of Australia?",
        options: ["Dollar", "Euro", "Pound", "Yen"],
        correctAnswer: "Dollar"
    },
    {
        question: "10.Which continent is known as the 'Land of the Rising Sun'?",
        options: ["Europe", "Asia", "North America", "Australia"],
        correctAnswer: "Asia"
    },
    // Add more questions here
];

let currentQuestionIndex = -1;
let userScore = 0;

// ... (your existing code)

// Function to load the next question
// Function to load the next question
// Function to load the next question or end the quiz
/* function loadNextQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");
    const endQuizButton = document.getElementById("end-quiz-button");

    // Enable the "Previous Question" button
    previousQuestionButton.style.display = "block";

    // Save the selected answer before moving to the next question
    saveSelectedAnswer();

    // Move to the next question
    currentQuestionIndex++;

    // Display the next question or finish the quiz
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;
            optionInput.disabled = currentQuestion.selectedAnswer ? true : false; // Disable if answer already selected

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Display the "Next Question" button
        nextQuestionButton.style.display = "block";
        endQuizButton.style.display = "block"; // Hide "End Quiz" button
    } else {
        // Quiz completed, display "End Quiz" button and hide "Next Question" button
        nextQuestionButton.style.display = "none"; // Hide "Next Question" button
        endQuizButton.style.display = "block";
    }
} */

// ... (your existing code)
// ... (your existing code)

// Set the initial timer value (in seconds)
let timer = 500;
let timerInterval;

// Function to reset the timer
function resetTimer() {
    // Set the timer back to its initial value
    timer = 500;

    // Clear any existing timer interval
    clearInterval(timerInterval);

    // Display the initial timer value
    updateTimerDisplay();
}

// Function to update and display the timer
/* function updateTimerDisplay() {
    // Get the timer display element
    const timerDisplay = document.getElementById("timer");

    // Display the timer value
    timerDisplay.textContent = `Time Remaining: ${timer}s`;
} */
// ... (your existing code)

// Function to update and display the timer
function updateTimerDisplay() {
    // Get the timer display element
    const timerDisplay = document.getElementById("timer");

    // Check if the timer is greater than 0
    if (timer > 0) {
        // Display the timer value
        timerDisplay.textContent = `Time Remaining: ${timer}s`;
    } else {
        // Hide the timer when it reaches 0
        timerDisplay.style.display = "none";
    }
}

// ... (your existing code)


// Function to decrement the timer and check if it reached 0
function decrementTimer() {
    // Decrement the timer
    timer--;

    // Update and display the timer
    updateTimerDisplay();

    // Check if the timer reached 0
    if (timer === 0) {
        // Automatically end the quiz when the timer reaches 0
        endQuiz();
    }
}


// Function to start the timer
function startTimer() {
    // Clear any existing intervals before starting a new one
    clearInterval(timerInterval);

    // Set an interval to decrement the timer every second
    timerInterval = setInterval(() => {
        decrementTimer();

        // Check if all questions have been answered
        if (currentQuestionIndex === quizData.length) {
            // Stop the timer interval when the quiz is completed
            clearInterval(timerInterval);
        }
    }, 1000);
}

// ... (your existing code)

// Function to update and display the timer
function updateTimerDisplay() {
    // Get the timer display element
    const timerDisplay = document.getElementById("timer");

    // Check if the timer is greater than 0
    if (timer > 0) {
        // Display the timer value
        timerDisplay.textContent = `Time Remaining: ${timer}s`;
    } else {
        // Hide the timer when it reaches 0
        timerDisplay.style.display = "none";

        // If all questions are answered, end the quiz
        if (currentQuestionIndex === quizData.length) {
            endQuiz();
        }
    }
}


// ... (your existing code)

/* // Function to load the next question
function loadNextQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");
    const endQuizButton = document.getElementById("end-quiz-button");

    // Save the selected answer before moving to the next question
    saveSelectedAnswer();

    // Move to the next question
    currentQuestionIndex++;

    // Display the next question or finish the quiz
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;

            // Check if the option is the previously selected answer
            if (currentQuestion.selectedAnswer === option) {
                optionInput.checked = true;
            }

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Display the "Next Question" button
        nextQuestionButton.style.display = "block";

        // Start the timer for the next question (or continue if already started)
        startTimer();
    } else {
        // Quiz completed, hide "Next Question" button and display "End Quiz" button
        // nextQuestionButton.style.display = "none";
        endQuizButton.style.display = "block";
    }

    // Enable the "Previous Question" button
    previousQuestionButton.style.display = "block";
}


// Function to end the quiz and display the score
function endQuiz() {
    saveSelectedAnswer();  // Save the answer for the last question
    displayScore();  // Call the displayScore function here
}


// Function to load the previous question
function loadPreviousQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");

    // Save the selected answer before moving to the previous question
    saveSelectedAnswer();

    // Move to the previous question
    currentQuestionIndex--;

    // Enable the "Next Question" button
    nextQuestionButton.style.display = "block";

    // Display the previous question or hide the "Previous Question" button if it's the first question
    if (currentQuestionIndex >= -1) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;

            // Check if the option is the previously selected answer
            if (currentQuestion.selectedAnswer === option) {
                optionInput.checked = true;
            }

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Hide the "Previous Question" button if it's the first question
        if (currentQuestionIndex === -1) {
            previousQuestionButton.style.display = "none";
        }
    }
}

// Function to save the selected answer
function saveSelectedAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        // Save the selected answer to the current question
        const currentQuestion = quizData[currentQuestionIndex];
        currentQuestion.selectedAnswer = selectedOption.value;
    }
     if (currentQuestion.selectedAnswer === currentQuestion.correctAnswer) {
            userScore++;
        }
} */


// Function to load the next question
/*function loadNextQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");
    const endQuizButton = document.getElementById("end-quiz-button");

    // Save the selected answer before moving to the next question
    saveSelectedAnswer();

    // Move to the next question
    currentQuestionIndex++;

    // Display the next question or finish the quiz
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;
            optionInput.disabled = currentQuestion.selectedAnswer ? true : false; // Disable if answer already selected

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Display the "Next Question" button
        nextQuestionButton.style.display = "block";

        // Start the timer for the next question (or continue if already started)
        startTimer();
    } else {
        // Quiz completed, hide "Next Question" button and display "End Quiz" button
        // nextQuestionButton.style.display = "none";
        endQuizButton.style.display = "block";
    }

    // Enable the "Previous Question" button
    previousQuestionButton.style.display = "block";
}

// Function to end the quiz and display the score
/* function endQuiz() {
    // Save the selected answer for the last question
    saveSelectedAnswer();

    // Display the final score
    displayScore();

    clearInterval(timerInterval);
    timer = 0; // Set timer to 0
    // updateTimerDisplay();
} */
/*function endQuiz() {
    // Save the selected answer for the last question
    saveSelectedAnswer();

    // Display the final score
    displayScore();

    clearInterval(timerInterval);
    // Do not set timer to 0 here
    // updateTimerDisplay();
}*/
// Define a variable to track whether the quiz has been completed
let quizCompleted = false;

// Function to load the next question
function loadNextQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");
    const endQuizButton = document.getElementById("end-quiz-button");

    // Save the selected answer before moving to the next question
    saveSelectedAnswer();

    // Move to the next question
    currentQuestionIndex++;

    // Display the next question or finish the quiz
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        /* optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;
            optionInput.disabled = currentQuestion.selectedAnswer ? true : false; // Disable if answer already selected

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        }); */
        optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = "answer";
        optionInput.value = option;
        optionInput.checked = currentQuestion.selectedAnswer === option; // Check if this option was previously selected

        const optionLabel = document.createElement("label");
        optionLabel.textContent = option;

        optionsContainer.appendChild(optionInput);
        optionsContainer.appendChild(optionLabel);
        optionsContainer.appendChild(document.createElement("br"));
    });

        // Display the "Next Question" button
        nextQuestionButton.style.display = "block";

        // Start the timer for the next question (or continue if already started)
        startTimer();
    } else {
        // Quiz completed, hide "Next Question" button and display "End Quiz" button
        nextQuestionButton.style.display = "none";
        endQuizButton.style.display = "block";
        quizCompleted = true;

        // Disable the timer after completing the quiz
        clearInterval(timerInterval);
    }

    // Enable the "Previous Question" button
    previousQuestionButton.style.display = "block";
}

// Function to end the quiz and display the score
function endQuiz() {
    saveSelectedAnswer();  // Save the answer for the last question
    displayScore();  // Call the displayScore function here

    // Disable the timer after completing the quiz (additional check for safety)
    if (!quizCompleted) {
        clearInterval(timerInterval);
        quizCompleted = true;
    }
    const timerDisplay = document.getElementById("timer");
    timerDisplay.style.display = "none";
}




/* function loadNextQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");
    const endQuizButton = document.getElementById("end-quiz-button");

    // Save the selected answer before moving to the next question
    saveSelectedAnswer();

    // Move to the next question
    currentQuestionIndex++;

    // Display the next question or finish the quiz
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;
            optionInput.disabled = currentQuestion.selectedAnswer ? true : false; // Disable if answer already selected

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Display the "Next Question" button
        nextQuestionButton.style.display = "block";
    } else {
        // Quiz completed, hide "Next Question" button and display "End Quiz" button
        // nextQuestionButton.style.display = "none";
        endQuizButton.style.display = "block";
    }

    // Enable the "Previous Question" button
    previousQuestionButton.style.display = "block";
}
 */


// Function to end the quiz and display the score
/* function endQuiz() {
    saveSelectedAnswer();  // Save the answer for the last question
    displayScore();  // Call the displayScore function here
} */

// Function to load the previous question
/* function loadPreviousQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");

    // Move to the previous question
    currentQuestionIndex--;

    // Enable the "Next Question" button
    nextQuestionButton.style.display = "block";

    // Display the previous question or hide the "Previous Question" button if it's the first question
    if (currentQuestionIndex >= -1) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;
            optionInput.disabled = currentQuestion.selectedAnswer ? true : false; // Disable if answer already selected

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Hide the "Previous Question" button if it's the first question
        if (currentQuestionIndex === -1) {
            previousQuestionButton.style.display = "none";
        }
    }
}

// Function to save the selected answer
function saveSelectedAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        // Save the selected answer to a variable, database, or any storage mechanism
        // For example, you can store it in an array
        const currentQuestion = quizData[currentQuestionIndex];
        currentQuestion.selectedAnswer = selectedOption.value;

        // Check if the selected answer is correct and update the user's score
        if (currentQuestion.selectedAnswer === currentQuestion.correctAnswer) {
            userScore++;
        }
    }
} */

// Function to load the previous question
function loadPreviousQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");

    // Move to the previous question
    currentQuestionIndex--;

    // Enable the "Next Question" button
    nextQuestionButton.style.display = "block";

    // Display the previous question or hide the "Previous Question" button if it's the first question
    if (currentQuestionIndex >= 0) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
       /*  optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            
            optionInput.name = "answer";
            optionInput.value = option;
            optionInput.checked = currentQuestion.selectedAnswer === option; // Check if this option was previously selected

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        }); */
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;
            optionInput.checked = currentQuestion.selectedAnswer === option; // Check if this option was previously selected
    
            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;
    
            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });
    }

    // Hide the "Previous Question" button if it's the first question
    if (currentQuestionIndex === 0) {
        previousQuestionButton.style.display = "none";
    }
}

/* // Function to save the selected answer
function saveSelectedAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        // Save the selected answer to a variable, database, or any storage mechanism
        // For example, you can store it in an array
        const currentQuestion = quizData[currentQuestionIndex];
        currentQuestion.selectedAnswer = selectedOption.value;

        // Check if the selected answer is correct and update the user's score
        if (currentQuestion.selectedAnswer === currentQuestion.correctAnswer) {
            userScore++;
        }
    }
}  */
/* function saveSelectedAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const currentQuestion = quizData[currentQuestionIndex];
        currentQuestion.selectedAnswer = selectedOption.value;

        // Check if the selected answer is correct and update the user's score
        if (currentQuestion.selectedAnswer === currentQuestion.correctAnswer) {
            userScore++;
        }

        // Log the current score
        console.log("Current Score:", userScore);
    }
} */
function saveSelectedAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Check if the selected answer is different from the previous one
        if (currentQuestion.selectedAnswer !== selectedOption.value) {
            const previousSelectedAnswer = currentQuestion.selectedAnswer;
            currentQuestion.selectedAnswer = selectedOption.value;

            // Calculate the score based on the selected answer
            if (currentQuestion.selectedAnswer === currentQuestion.correctAnswer) {
                userScore++;
            } else if (previousSelectedAnswer === currentQuestion.correctAnswer) {
                // Decrement the score if the previous answer was correct and now changed to a wrong one
                userScore--;
            }

            // Log the current score
            console.log("Current Score:", userScore);
        }
    }
}






// ... (your existing code)


// Function to display the final score
function displayScore() {
    const quizContainer = document.getElementById("quiz-container");
    const scoreContainer = document.getElementById("score-container");
    const userScoreElement = document.getElementById("user-score");

    // Log the final score (check the console for this log)
    console.log("Final Score:", userScore);

    // Hide quiz container
    quizContainer.style.display = "none";

    // Display score container
    scoreContainer.style.display = "block";

    // Display user's score
    userScoreElement.textContent = `Your Score: ${userScore}/${quizData.length}`;
    retrieveHighestScore().then((highestScore) => {
        const highestScoreElement = document.getElementById("highest-score-value");
        highestScoreElement.textContent = highestScore || "N/A"; // Display "N/A" if no highest score
        highestScoreElement.parentElement.style.display = "block"; // Display the highest score element
    });

    // Save the user's score to Firebase or perform any other actions
    saveScoreToFirebase(userScore);
}

// ... (your existing code)


// Function to load the next question
/* function loadNextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question
        questionContainer.textContent = currentQuestion.question;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.onclick = function () {
                selectOption(option, currentQuestion.correctAnswer);
            };
            optionsContainer.appendChild(optionButton);
        });
    } else {
        // Quiz completed, display score
        displayScore();
    }
} */
// ... (your existing code)

// Function to load the next question
/* function loadNextQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.onclick = function () {
                selectOption(option, currentQuestion.correctAnswer);
            };
            optionsContainer.appendChild(optionButton);
        });
    } else {
        // Quiz completed, display score
        displayScore();
    }
} */

// ... (your existing code)

// Function to load the next question
/* function loadNextQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");

    // Enable the "Previous Question" button
    previousQuestionButton.style.display = "block";

    // Move to the next question
    currentQuestionIndex++;

    // Display the next question or finish the quiz
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Hide the "Next Question" button until an option is selected
        nextQuestionButton.style.display = "none";
    } else {
        // Quiz completed, display score
        displayScore();
    }
} */


// Function to load the next question
// Function to load the next question
/* function loadNextQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");

    // Enable the "Previous Question" button
    previousQuestionButton.style.display = "block";

    // Move to the next question
    currentQuestionIndex++;

    // Display the next question or finish the quiz
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Display the "Next Question" button
        nextQuestionButton.style.display = "block";
    } else {
        // Quiz completed, display score
        displayScore();
    }
} */
/* function loadNextQuestion() {
    const optionsContainer = document.getElementById("options-container");
    const nextQuestionButton = document.getElementById("next-question-button");
    const previousQuestionButton = document.getElementById("previous-question-button");

    // Enable the "Previous Question" button
    previousQuestionButton.style.display = "block";

    // Move to the next question
    currentQuestionIndex++;

    // Display the next question or finish the quiz
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display the question number and text
        document.getElementById("question-container").innerHTML = `<p>${currentQuestion.question}</p>`;

        // Display options
        optionsContainer.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = "answer";
            optionInput.value = option;

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;

            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Display the "Next Question" button
        nextQuestionButton.style.display = "block";
    } else {
        // Quiz completed, display score
        displayScore();  // Call the displayScore function here
    }
}
 */





// ... (your existing code)

// Function to load the next question






// Function to handle option selection
// Function to handle option selection
function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        // Correct answer, increment score
        userScore++;
    }

    // Log the score (check the console for these logs)
    console.log("Current Score:", userScore);

    // Move to the next question
    currentQuestionIndex++;
    loadNextQuestion();
}

/* function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        // Correct answer, increment score
        userScore++;
    }

    // Move to the next question
    currentQuestionIndex++;
    loadNextQuestion();
} */

// Function to submit the answer
function submitAnswer() {
    // Get the selected option (you might need to adjust this based on your actual HTML structure)
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        // If an option is selected, simulate a click on the "Next Question" button
        const nextQuestionButton = document.getElementById("next-question-button");
        nextQuestionButton.click();
    } else {
        // Handle the case when no option is selected
        alert("Please select an answer before proceeding to the next question.");
    }
}

// ... (your existing code)
// ... (your existing code)

// Function to start the quiz
/* function startQuiz() {
    // Hide the "Start Quiz" button and show the question and options container
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("options-container").style.display = "block";

    // Load the first question
    loadNextQuestion();
}
 */
// ... (your existing code)

/* function startQuiz() {
    // Hide the "Start Quiz" button and show the question and options container
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("options-container").style.display = "block";

    // Load the first question
    loadNextQuestion();

    // Display the "Next Question" button
    document.getElementById("next-question-button").style.display = "block";
}
 */

// Function to start the quiz
/* function startQuiz() {
    // Hide the "Start Quiz" button and show the question and options container
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("options-container").style.display = "block";

    // Reset the question index to start from the beginning
    currentQuestionIndex = 0;

    // Load the first question
    loadNextQuestion();

    // Display the "Next Question" button
    document.getElementById("next-question-button").style.display = "block";
}
 */
// Function to start the quiz
/* function startQuiz() {
    // Hide the "Start Quiz" button and show the question and options container
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("options-container").style.display = "block";

    // Reset the question index to start from the beginning
    currentQuestionIndex = 0;

    // Load the first question
    loadNextQuestion();

    // Display the "Next Question" button
    document.getElementById("next-question-button").style.display = "block";
    // Hide the "Previous Question" button initially
    document.getElementById("previous-question-button").style.display = "none";
}
 */

// Function to start the quiz
/* function startQuiz() {
    // Hide the "Start Quiz" button and show the question and options container
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("options-container").style.display = "block";

    // Reset the question index to start from the beginning
    currentQuestionIndex = 0;

    // Load the first question
    loadNextQuestion();

    // Display the "Next Question" button
    document.getElementById("next-question-button").style.display = "block";
    // Hide the "Previous Question" button initially
    document.getElementById("previous-question-button").style.display = "none";
}

 */
function startQuiz() {
    // Hide the "Start Quiz" button and show the question and options container
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("options-container").style.display = "block";

    // Reset the question index to start from the beginning
    currentQuestionIndex = -1;

    // Load the first question
    loadNextQuestion();

    // Display the "End Quiz" button at the start
    document.getElementById("end-quiz-button").style.display = "block";
    // Hide the "Previous Question" button initially
    document.getElementById("previous-question-button").style.display = "none";
}







// Function to handle option selection
/* function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        // Correct answer, increment score
        userScore++;
    }

    // Move to the next question
    currentQuestionIndex++;
    loadNextQuestion();
}

// Function to submit the answer
function submitAnswer() {
    loadNextQuestion();
} */

// submitAnswer


// Function to sign out the user
// Function to sign out the user and redirect to the home page
function signOut() {
    auth.signOut().then(() => {
        // User signed out
        // Redirect to the home page (index.html)
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
}









/* // Function to display the final score
function displayScore() {
    const quizContainer = document.getElementById("quiz-container");
    const scoreContainer = document.getElementById("score-container");
    const userScoreElement = document.getElementById("user-score");

    // Hide quiz container
    quizContainer.style.display = "none";

    // Display score container
    scoreContainer.style.display = "block";

    // Display user's score
    userScoreElement.textContent = `${userScore}/${quizData.length}`;

    // Save the user's score to Firebase
    saveScoreToFirebase(userScore);
} */

// Function to display the final score
/* function displayScore() {
    const quizContainer = document.getElementById("quiz-container");
    const scoreContainer = document.getElementById("score-container");
    const userScoreElement = document.getElementById("user-score");

    // Log the final score (check the console for this log)
    console.log("Final Score:", userScore);

    // Hide quiz container
    quizContainer.style.display = "none";

    // Display score container
    scoreContainer.style.display = "block";

    // Display user's score
    userScoreElement.textContent = `Your Score: ${userScore}/${quizData.length}`;

    // Save the user's score to Firebase
    saveScoreToFirebase(userScore);
} */



// Function to save the score to Firebase
/* function saveScoreToFirebase(score) {
    const user = auth.currentUser;
    const databaseRef = database.ref();

    // Save the score to the database
    const userScoreData = {
        score: score,
        timestamp: Date.now()
    };

    databaseRef.child('users/' + user.uid + '/scores').push(userScoreData);
} */

/* // Function to save the score to Firebase
function saveScoreToFirebase(score) {
    const user = auth.currentUser;
    const databaseRef = database.ref('users/' + user.uid);

    // Save the score to the database
    const userScoreData = {
        score: score,
        timestamp: Date.now()
    };

    databaseRef.child('scores').push(userScoreData);

    // Update the highest score if the current score is higher
    retrieveHighestScore().then((highestScore) => {
        if (score > (highestScore || 0)) {
            databaseRef.child('highestScore').set(score);
        }
    });
}
// Function to retrieve the highest score from Firebase
function retrieveHighestScore() {
    const user = auth.currentUser;
    const databaseRef = database.ref('users/' + user.uid);

    return databaseRef.child('highestScore').once('value').then((snapshot) => {
        return snapshot.val();
    });
}
 */
function retrieveAllScores() {
    const user = auth.currentUser;
    const databaseRef = database.ref('users/' + user.uid + '/scores');

    return databaseRef.once('value').then((snapshot) => {
        return snapshot.val() || {}; // Return an empty object if there are no scores
    });
}

// Function to retrieve the highest score from Firebase
function retrieveHighestScore() {
    return retrieveAllScores().then((scores) => {
        // Extract scores values from the object
        const scoreValues = Object.values(scores);

        // Find the maximum score
        const highestScore = Math.max(...scoreValues.map((score) => score.score));

        return highestScore;
    });
}

// Function to save the score to Firebase
function saveScoreToFirebase(score) {
    const user = auth.currentUser;
    const databaseRef = database.ref('users/' + user.uid + '/scores');

    // Save the score to the database
    const userScoreData = {
        score: score,
        timestamp: Date.now()
    };

    databaseRef.push(userScoreData);

    // Update the highest score immediately
    retrieveHighestScore().then((currentHighestScore) => {
        if (score > currentHighestScore) {
            database.ref('users/' + user.uid).update({ highestScore: score });
        }
    });
}


