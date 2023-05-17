const questions = [
    {
        question: "Where Mardi-Gras takes place?", answers: [
            {text: "New Orleans", correct: true},
            {text: "New York", correct: false},
            {text: "Germany", correct: false},
            {text: "France", correct: false},
            {text: "Italy", correct: false},
        ]
    },
    {
        question: "How many days that party goes on?", answers: [
            {text: "Two Days", correct: false},
            {text: "One Day", correct: false},
            {text: "One Month", correct: true},
            {text: "Two Weeks", correct: false},
            {text: "10 Days", correct: false},
    ]
    },
    {
        question: "Who is the mayor of New Orleans?", answers: [
            {text: "LaToya Cantrell", correct: true},
            {text: "George Bush", correct: false},
            {text: "Lincon", correct: false},
            {text: "Tamar", correct: false},
            {text: "Snoop Dog", correct: false},
    ]
    },
    {
        question: "What is the most sought after thing in Mardi Gras?", answers: [
            {text: "Cloths", correct: false},
            {text: "Costumes", correct: false},
            {text: "Hats", correct: false},
            {text: "Capes", correct: false},
            {text: "Beeds", correct: true},
    ]
    },
    {
        question: "Do the float rider have to wear masks?", answers: [
            {text: "No", correct: false},
            {text: "Yes", correct: false},
            {text: "They just like the festive", correct: false},
            {text: "2 and 3 are correct", correct: true},
            {text: "All the answers are correct", correct: false},
    ]
    },
    {
        question: "What is the Smallest Animal?", answers: [
            {text: "Mouse", correct: false},
            {text: "Dog", correct: false},
            {text: "Cat", correct: false},
            {text: "Ant", correct: true},
            {text: "Shark", correct: false},
    ]
    }

];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");
/* For the Modal */
const quizzAppContainer = document.getElementById("quizAppContent");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("q-btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
/* Append the quizz */
function resetState() {
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}
nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();