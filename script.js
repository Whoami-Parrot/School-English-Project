const facts = {
    0: { answer: true, reason: "Frog legs (cuisses de grenouille) are a traditional, albeit not daily, delicacy in French cuisine, particularly in eastern France." },
    1: { answer: true, reason: "It is generally true that tipping is not customary in China and can be considered rude, embarrassing, or akin to giving charity." },
    2: { answer: false, reason: "New laws effective October 1, 2024, make it mandatory for all bird keepers to register with the APHA, but a restrictive 'wild animal' license is not required." },
    3: { answer: false, reason: "Guinea pigs are social animals and need company, which is why it is actually illegal in Switzerland to own just one." },
    4: { answer: false, reason: "While handshakes are common in business, a traditional greeting among close friends and family in the Netherlands is three kisses on alternating cheeks." },
    5: { answer: true, reason: "The unicorn is the official national animal of Scotland, symbolizing strength and untamed power in Celtic mythology." },
    6: { answer: false, reason: "In Sweden, it is generally considered impolite to enter a home while wearing outdoor shoes. Standard etiquette is to remove them." },
    7: { answer: false, reason: "While Danes love ice cream and consume it year-round, it is not a standard or frequent breakfast food." },
    8: { answer: true, reason: "In Portugal, the name 'Lucifer' is legally prohibited for use on newborns." },
    9: { answer: true, reason: "Most Austrians will stand and wait for the 'little green man' (Ampelmännchen) to appear, even if the street is empty." }
};

let userAnswers = {};

function checkAnswer(factId, answer, element) {
    userAnswers[factId] = answer;
    const buttons = element.parentElement.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

function showResults() {
    const totalFacts = Object.keys(facts).length;
    const answeredCount = Object.keys(userAnswers).length;

    if (answeredCount < totalFacts) {
        document.getElementById('score-display').innerText = `Please answer all questions first! (${answeredCount}/${totalFacts})`;
        return;
    }

    let score = 0;
    let resultsHTML = '';

    for (let id in facts) {
        const isCorrect = userAnswers[id] === facts[id].answer;
        if (isCorrect) score++;

        const factTitle = document.querySelectorAll('.fact h2')[id].innerText;

        resultsHTML += `
            <div class="result-item ${isCorrect ? 'correct' : 'wrong'}">
                <h3>${factTitle}</h3>
                <div class="user-answer ${isCorrect ? 'correct' : 'wrong'}">
                    Your answer: ${userAnswers[id] ? 'True' : 'False'} ${isCorrect ? '✓' : '✗'}
                </div>
                <div class="explanation">
                    <strong>Reason:</strong> ${facts[id].reason}
                </div>
            </div>
        `;
    }

    const display = document.getElementById('score-display');
    display.innerText = `You got ${score} out of ${totalFacts} correct!`;

    // Append the detailed results
    const resultsContainer = document.querySelector('.results');
    let breakdown = document.getElementById('results-breakdown');

    if (!breakdown) {
        breakdown = document.createElement('div');
        breakdown.id = 'results-breakdown';
        resultsContainer.appendChild(breakdown);
    }

    breakdown.innerHTML = resultsHTML;

    if (score === totalFacts) {
        display.style.color = '#4ade80';
    } else if (score >= totalFacts / 2) {
        display.style.color = '#facc15';
    } else {
        display.style.color = '#f87171';
    }
}
