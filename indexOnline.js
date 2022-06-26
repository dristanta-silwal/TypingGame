var QUOTESTORE = [
    {
        quote: "The purpose of our lives is to be happy. Life is what happens when you're busy making other plans."
    }, {
        quote: "Life is what happens when you're busy making other plans. Get busy living or get busy dying."
    }, {
        quote: "Get busy living or get busy dying. You only live once, but if you do it right, once is enough."
    }, {
        quote: "You only live once, but if you do it right, once is enough. Many of life's failures are people who did not realize how close they were to success when they gave up."
    }, {
        quote: "Many of life's failures are people who did not realize how close they were to success when they gave up. If you want to live a happy life, tie it to a goal, not to people or things."
    }, {
        quote: "If you want to live a happy life, tie it to a goal, not to people or things. Imagination will often carry us to worlds that never were. But without it we go nowhere."
    }, {
        quote: "Never let the fear of striking out keep you from playing the game. Money and success don't change people; they merely amplify what is already there."
    }, {
        quote: "Money and success don't change people; they merely amplify what is already there. Knowledge without justice ought to be called cunning rather than wisdom."
    }, {
        quote: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with the results of other people's thinking."
    }, {
        quote: "If life were predictable it would cease to be life, and be without flavor. You are important enough to ask and you are blessed enough to receive back."
    }, {
        quote: "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it."
    }, {
        quote: "The least of things with a meaning is worth more in life than the greatest of things without it."
    }, {
        quote: "Obstacles are those things you see when you take your eyes off the goal. Every man is a volume if you know how to read him."
    }, {
        quote: "The biggest adventure you can ever take is to live the life of your dreams. Friendship without self-interest is one of the rare and beautiful things of life."
    }, {
        quote: "For it was not into my ear you whispered, but into my heart. It was not my lips you kissed, but my soul."
    }, {
        quote: "To give oneself earnestly to the duties due to men, and, while respecting spiritual beings, to keep aloof from them, may be called wisdom."
    }, {
        quote: "All men have a sweetness in their life. That is what helps them go on. It is towards that they turn when they feel too worn out."
    }, {
        quote: "We can change our lives. We can do, have, and be exactly what we wish. History will be kind to me for I intend to write it."
    }, {
        quote: "You cannot step twice into the same river, for other waters are continually flowing in. In skating over thin ice our safety is in our speed."
    }, {
        quote: "In romance, we feel the need to zoom in and expound on our partner's foibles in intimate detail; in friendship, we tend to do the opposite, avoiding confrontation through fear, lethargy or both."
    }, {
        quote: "Your attitude, not your aptitude, will determine your altitude. Wisdom is the reward you get for a lifetime of listening when you'd have preferred to talk."
    }, {
        quote: "No party has a monopoly on wisdom. No democracy works without compromise. But when Governor Romney and his allies in Congress tell us we can somehow lower our deficit by spending trillions more on new tax breaks for the wealthy - well, you do the math. I refuse to go along with that. And as long as I'm President, I never will."
    }, {
        quote: "The heart has its reasons which reason knows not of. His lack of education is more than compensated for by his keenly developed moral bankruptcy."
    }, {
        quote: "We are what our thoughts have made us; so take care about what you think. Words are secondary. Thoughts live; they travel far."
    }, {
        quote: "Ignorant men don't know what good they hold in their hands until they've flung it away. The doors of wisdom are never shut."
    }, {
        quote: "Do not wait; the time will never be 'just right.' Start where you stand, and work with whatever tools you may have at your command, and better tools will be found as you go along."
    }, {
        quote: "Every great dream begins with a dreamer. Always remember, you have within you the strength, the patience, and the passion to reach for the stars to change the world."
    }, {
        quote: "When we feel love and kindness toward others, it not only makes others feel loved and cared for, but it helps us also to develop inner happiness and peace."
    }, {
        quote: "Your talent is God's gift to you. What you do with it is your gift back to God."
    }
]

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * QUOTESTORE.length);
    return QUOTESTORE[randomIndex].quote;
}


const quoteDisplayEL = document.getElementById('quote-display');
const quoteInputEL = document.getElementById('quote-input');
const timerEL = document.getElementById('timer');
const speedEl = document.getElementById('t-speed');
const historyEl = document.getElementById('t-history');

let letter = 0;

function renderNewQuote() {
    const quote = getRandomQuote();
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