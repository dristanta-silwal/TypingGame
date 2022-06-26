
const RANDOM_QUOTE_URL = 'http://api.quotable.io/random';


const quoteDisplayEL = document.getElementById('quote-display');
const quoteInputEL = document.getElementById('quote-input');
const timerEL = document.getElementById('timer');
const speedEl = document.getElementById('t-speed');
const historyEl = document.getElementById('t-history');

let letter = 0;

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    // console.log(quote);
    quoteDisplayEL.innerText = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayEL.appendChild(characterSpan);
    });
    quoteInputEL.value = null;
    if(letter){
        historyEl.innerText = `Your previous speed: ${Math.floor((letter*60) / (5*getTimertime()))} wpm`;
    }
    startTimer();
    letter = 0;
}

let startTime;
function startTimer() {
    timerEL.innerText = 0;
    speedEl.innerText = '0 wpm';
    startTime = new Date();
    setInterval(() => {
        speedEl.innerText = `${Math.floor((letter*60) / (5*getTimertime()))} wpm`;
        timerEL.innerText = getTimertime();
    }, 1000);
}

function getTimertime() {
    return Math.floor((new Date() - startTime) /1000)
}

renderNewQuote()


quoteInputEL.addEventListener('input', () => {
    const arrayQuote = quoteDisplayEL.querySelectorAll('span');
    const arrayValue = quoteInputEL.value.split('');

    let correct = true;
    arrayQuote.forEach((char, index) => {
        const character = arrayValue[index];
        if(character == null){
            char.classList.remove('correct');
            char.classList.remove('incorrect');
            correct = false;
        } else if (character === char.innerText) {
            char.classList.add('correct');
            char.classList.remove('incorrect');
            letter = arrayValue.length;
            // console.log(letter);
        } else{
            char.classList.add('incorrect');
            char.classList.remove('correct');
            correct = false;
        }
        
    });

    if(correct) {
        renderNewQuote();
    }
});