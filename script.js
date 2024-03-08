const questions = [
    {
        question: "Quantas formações distintas tem a palavra AMEBA?",
        answers:[
            {text: "40", correct: false},
            {text: "70", correct: false},
            {text: "60", correct: true},
            {text: "20", correct: false},
            {text: "80", correct: false},
        ]
    },
    {
        question: "Se uma moeda é lançada, qual é a probabilidade do lado 'cara' ficar voltado para cima?",
        answers:[
            {text: "1/2", correct: true},
            {text: "51%", correct: false},
            {text: "3/4", correct: false},
            {text: "100%", correct: false},
            {text: "25/100", correct: false},
        ]
    },
    {
        question: "De quantas maneiras 8 pessoas podem se sentar num banco que tem apenas 3 lugares?",
        answers:[
            {text: "12", correct: false},
            {text: "vinte", correct: false},
            {text: "38", correct: false},
            {text: "3", correct: false},
            {text: "8*7*6", correct: true},
        ]
    },
    {
        question: "Qual é o número total de possibilidades de resultado no lançamento de 5 moedas?",
        answers:[
            {text: "Dez", correct: false},
            {text: "32", correct: true},
            {text: "2*6", correct: false},
            {text: "10% de 200", correct: false},
            {text: "2", correct: false},
        ]   
    }
];

const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
const next = document.querySelector('#next-btn');

let current = 0;
let score = 0;

function startScot() {
    current = 0;
    score = 0;
    next.innerHTML = "Próximo";
    showQuestion();
}

function showQuestion() {
    reset();
    let currentQuestion = questions[current];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function reset() {
    next.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        const audioCorrect = new Audio('sfx/correto.wav');
        audioCorrect.play();
    } else {
        selectedBtn.classList.add("incorrect");
        const audioIncorrect = new Audio('sfx/errado.wav');
        audioIncorrect.play();
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    // Atraso de 3 segundos antes de chamar handleNext
    setTimeout(() => {
        handleNext();
    }, 1500);
}

function showScore(){
    reset();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
    next.innerHTML = "Jogue Novamente";
    next.style.display = 'block';
}

function handleNext() {
    current++;
    if (current < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

next.addEventListener("click",()=>{
    if(current < questions.length){
        handleNext();
    }else{
        startScot();
    }
});

startScot();
