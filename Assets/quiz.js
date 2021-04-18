// select all elements
var win = document.querySelector(".win");
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// The init function is called when the page loads 
function init() {
    getWins();
    getlosses();
}

// Questions
let questions = [
    {
        question: "What does HTML stand for?",
        choiceA: "Hypertext Markup Language",
        choiceB: "Hyper Technical Machine Language",
        choiceC: "Hyper Text Machine Language",
        correct: "A"
    }, {
        question: "What does CSS stand for?",
        choiceA: "Color and style sheets",
        choiceB: "Cascading style sheets",
        choiceC: "Certain Style Sorting",
        correct: "B"
    }, {
        question: "What does JS stand for?",
        choiceA: "JavaSource",
        choiceB: "JSON",
        choiceC: "JavaScript",
        correct: "C"
    }, {
        question: "Which HTML tag makes the largest heading",
        choiceA: "h2",
        choiceB: "h6",
        choiceC: "h1",
        correct: "C"
    }, {
        question: "In JavaScript the x === y statement means:",
        choiceA: "Both are equal values",
        choiceB: "Both are equal values and data type",
        choiceC: "Both are the same number",
        correct: "B"
    }, {
        question: "What symbol do you use for 'not equal to' in JS",
        choiceA: "!=",
        choiceB: "x=",
        choiceC: "/>",
        correct: "A"
    }
];

// variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // 60s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    startTimer();
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// Countdown Timer
(function () {
    var sec = 60;
    function startTimer() {
        console.log('timer suppose to go')
        var timer = setInterval(function () {
            sec--;
            document.getElementById('timerDisplay').innerHTML = '00:' + sec;
            if (sec < 0) {
                clearInterval(timer);
                alert("Time is up!")
            }
        }, 1000);
    }
    document.getElementById('incorrect').addEventListener('click', function () {
        sec -= 10;
        document.getElementById('timerDisplay').innerHTML = '00:' + sec;
    });
    startTimer();
})();

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
    alert("CORRECT! NICE JOB");
}

// answer is Wrong
function answerIsWrong() {
    score -= 10;
    console.log(score - 10);
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    alert("SORRY, WRONG ANSWER");
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";


    function setWins() {
        win.textContent = winCounter;
        localStorage.setItem("answerIsCorrect", winCounter);
    }

    function setLosses() {
        lose.textContent = loseCounter;
        localStorage.setItem("answerIsWrong", loseCounter);
    }


    function getWins() {
        var storedWins = localStorage.getItem("winCount");
        if (storedWins === null) {
            winCounter = 0;
        } else {
            winCounter = storedWins;
        }
        win.textContent = winCounter;
    }

    function getlosses() {
        var storedLosses = localStorage.getItem("loseCount");
        if (storedLosses === null) {
            loseCounter = 0;
        } else {
            loseCounter = storedLosses;
        }
        lose.textContent = loseCounter;
    }

    function checkWin() {
        if (chosenWord === blanksLetters.join("")) {
            isWin = true;
        }
    }
}

init();



















