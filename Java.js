// questions
const questions = [
   { 
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["a. <js>", "b. <javascript>", "c. <scripting>", "d. <script>"],
    answer: "d. <script>"
   },
   {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
    answer: "c. quotes"
   },
   {
    question: "Arrays in JavaScript can be used to store _____.",
    choices: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
    answer: "b. other arrays"
   },
   {
    question: "Commonly used data types DO NOT include:",
    choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
    answer: "c. alerts"
   },
   {
    question: "How do you create a function in JavaScript",
    choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
    answer: "b. function myFunction()"
   },
   {
    question: "How do you call a function named myFunction?",
    choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
    answer: "c. myFunctions()"
   },
   {
    question: "To see if two variables are equal in an if / else statement you would use ____.",
    choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
    answer: "b. =="
   },
   {
    question: "The first index of an array is ____.",
    choices: ["a. 0", "b. 1", "c. 8", "d. any"],
    answer: "a. 0"
   },
   {
    question: "How to write an IF statement in JavaScript?",
    choices: ["a. if i == 5 then", "b. if i = 5 then", "c. if(i == 5)", "d. if i = 5"],
    answer: "c. if(i == 5)"
   },
   {
    question: "How do you add a comment in a JavaScript?",
    choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. 'This is a comment", "d. * This is a comment *"],
    answer: "a. //This is a comment"
   },
   {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["a. onclick", "b. onchange", "c. onmouseover", "d. onmouseclick"],
    answer: "a. onclick"
   }
];

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("TimeLeft");
var timeUp = document.getElementById("timeup");
// <----------------------------------------------------------->
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("startQuiz-btn");
// <------------------------------------------------------------>
var questionsQ = document.getElementById("Qdiv");
var qTitle = document.getElementById("Qtitle");
var opA = document.getElementById("btn0");
var opB = document.getElementById("btn1");
var opC = document.getElementById("btn2");
var opD = document.getElementById("btn3");
var answercheck = document.getElementById("answerCheck");

var Summary = document.getElementById("summary");
var subName = document.getElementById("subNameBtn");
var nameInput = document.getElementById("nameInput");
var everthing = document.getElementById("allOther");

var highScoreSec = document.getElementById("highScoreSec");
var finalScore = document.getElementById("finalScore");
var goBackBtn = document.getElementById("goBack");
var clearHS = document.getElementById("clearHighScore");
var lisHS = document.getElementById("listOfScores");

var correct = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// Functions
var totalTime = 120;
function newQuiz(){
    questionIndex = 0;
    totalTime = 119;
    timeLeft.textContent = totalTime;
    nameInput.textContent = "";

    startDiv.style.display = "none";
    questionsQ.style.display = "block";
    timer.style.display = "block";
    timeUp.style.display = "none";

        var startTimer = setInterval(function(){
            totalTime--;
            timeLeft.textContent = totalTime;
            if(totalTime <=0) {
                clearInterval(startTimer);
                if (questionIndex < questions.length -1){
                    gameOver();
                }
            }
        },1000);
        showQuiz();
}

function showQuiz(){
    nextQ();
}

function nextQ(){
    qTitle.textContent = questionsQ[questionIndex].question;
    opA.textContent = questions[questionIndex].choices[0];
    opB.textContent = questions[questionIndex].choices[1];
    opC.textContent = questions[questionIndex].choices[2];
    opD.textContent = questions[questionIndex].choices[3];
}

function checkAn(answer) {
    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answercheck.style.display = "block";

    if(questions[questionIndex].answer === questions[questionIndex].choices[answer]){
        correct++;
        answercheck.textContent = "Correct!";
    }else {
        totalTime -=10;
        timeLeft.textContent = totalTime;
        answercheck.textContent = "Wrong! Right answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    if (questionIndex < questions.length){
        nextQ();
    } else{
        gameOver();
    }
}

function chooseA() {checkAn(0); }
function chooseB() {checkAn(1); }
function chooseC() {checkAn(2); }
function chooseD() {checkAn(3); }

function gameOver(){
    Summary.style.display = "block";
    questionsQ .style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timeUp.style.display = "block";

    finalScore.textContent = correct;
}

function storeHS (event){
    event.preventDefault();
    if (nameInput.value === ""){
        alert("Enter your name!");
        return;
    }
    startDiv.style.display = "none";
    timer.style.display = "none";
    timeUp.style.display = "none";
    Summary.style.display = "none";
    highScoreSec.style.display = "block";
     
    var savedHS = localStorage.getItem("high Scores");
    var scoresArray;

    if(savedHS === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHS)
    }

    var userScore = {
        Name: nameInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoreArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoreArrayString);
    showHS();
}

var i = 0;
function showHS(){
    startDiv.style.display = "none";
    timer.style.display = "none";
    questionsQ.style.display = "none";
    timeUp.style.display = "none";
    Summary.style.display = "none";
    highScoreSec.style.display = "block";

    var savedHS = localStorage.getItem("high scores");
    if (savedHS === null){
        return;
    }
    console.log(savedHS);

    var storedHS = JSON.parse(savedHS);

    for (; i < storedHS.length; i++){
        var newHS = document.createElement("p");
        newHS.innerHTML = storeHS[i].Name + ":" + storeHS[i].score;
        lisHS.appendChild(newHS);
    }
}

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});