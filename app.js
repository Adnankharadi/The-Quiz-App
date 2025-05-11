// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkHita44lxmLk2B2kDJmMPirsfW9EpgCs",
  authDomain: "web-developer-aef89.firebaseapp.com",
  projectId: "web-developer-aef89",
  storageBucket: "web-developer-aef89.appspot.com",
  messagingSenderId: "435493099529",
  appId: "1:435493099529:web:c0ffe0eeb7a5956c6980d8",
  measurementId: "G-63QLX14GS0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Quiz questions
const questions = [
  {
    question: "HTML Stands for",
    option1: "Hyper Text Markup Language",
    option2: "Hyper Tech Markup Language",
    option3: "Hyper Touch Markup Language",
    option4: "Hyber Text Markup Language",
    corrAnswer: "Hyper Text Markup Language",
  },
  {
    question: "CSS Stands for",
    option1: "Cascoding Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascating Style Sheets",
    option4: "Cases Style Sheets",
    corrAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which tag is used for most large heading",
    option1: "<h6>",
    option2: "<h2>",
    option3: "<h1>",
    option4: "<h7>",
    corrAnswer: "<h1>",
  },
  {
    question: "Which tag is used to make element unique",
    option1: "id",
    option2: "class",
    option3: "label",
    option4: "Name",
    corrAnswer: "id",
  },
  {
    question: "Any element assigned with id, can be get in css",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    option4: "by $ tag",
    corrAnswer: "by # tag",
  },
  {
    question: "CSS can be used with ______ methods",
    option1: "8",
    option2: "3",
    option3: "4",
    option4: "9",
    corrAnswer: "3",
  },
  {
    question: "In JS variable types are ____________",
    option1: "6",
    option2: "3",
    option3: "8",
    option4: "9",
    corrAnswer: "8",
  },
  {
    question: "In array we can use key name and value",
    option1: "True",
    option2: "False",
    option3: "None of above",
    option4: "All",
    corrAnswer: "False",
  },
  {
    question: "toFixed() is used to define length of decimal",
    option1: "True",
    option2: "False",
    option3: "None of above",
    option4: "All",
    corrAnswer: "True",
  },
  {
    question: "push() method is used to add element in the start of array",
    option1: "True",
    option2: "False",
    option3: "None of above",
    option4: "Both True/False",
    corrAnswer: "False",
  },
];

// DOM elements
const ques = document.getElementById("ques");
const opt1 = document.getElementById("opt1");
const opt2 = document.getElementById("opt2");
const opt3 = document.getElementById("opt3");
const opt4 = document.getElementById("opt4");
const btn = document.getElementById("btn");
const timer = document.getElementById("timer");

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let min = 1;
let sec = 30;

// Timer function
function startTimer() {
  const timerInterval = setInterval(function () {
    timer.innerHTML = `${min}:${sec < 10 ? '0' + sec : sec}`;
    sec--;
    
    if (sec < 0) {
      min--;
      sec = 59;
      if (min < 0) {
        clearInterval(timerInterval);
        showResult();
      }
    }
  }, 1000);
}

// Display question
function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    ques.innerText = currentQuestion.question;
    opt1.innerText = currentQuestion.option1;
    opt2.innerText = currentQuestion.option2;
    opt3.innerText = currentQuestion.option3;
    opt4.innerText = currentQuestion.option4;
  } else {
    showResult();
  }
}

// Check answer
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) return false;

  const selectedAnswer = questions[currentQuestionIndex][`option${selectedOption.value}`];
  const correctAnswer = questions[currentQuestionIndex].corrAnswer;

  if (selectedAnswer === correctAnswer) {
    score++;
  }
}

// Show result
function showResult() {
  const percentage = ((score / questions.length) * 100).toFixed(2);
  Swal.fire({
    title: "Quiz Completed!",
    html: `Your score: ${score}/${questions.length}<br>Percentage: ${percentage}%`,
    icon: "success",
    confirmButtonText: "OK"
  });
}

// Next question
function nextQuestion() {
  checkAnswer();
  
  // Clear selection
  const options = document.querySelectorAll('input[name="option"]');
  options.forEach(option => option.checked = false);
  
  btn.disabled = true;
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  displayQuestion();
  startTimer();
  
  // Enable next button when an option is selected
  const options = document.querySelectorAll('input[name="option"]');
  options.forEach(option => {
    option.addEventListener('change', () => {
      btn.disabled = false;
    });
  });
  
  // Next button click
  btn.addEventListener('click', nextQuestion);
});