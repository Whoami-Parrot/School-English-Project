const facts = {
    0: { answer: true, reason: "Frog legs (cuisses de grenouille) are a traditional, albeit not daily, delicacy in French cuisine, particularly in eastern France." }, // France
    1: { answer: true, reason: "It is generally true that tipping is not customary in China and can be considered rude, embarrassing, or akin to giving charity." }, // China
    2: { answer: false, reason: "New laws effective October 1, 2024, make it mandatory for all bird keepers to register with the APHA, but a restrictive 'wild animal' license is not required." }, // United Kingdom
    3: { answer: false, reason: "Guinea pigs are social animals and need company, which is why it is actually illegal in Switzerland to own just one." }, // Switzerland
    4: { answer: false, reason: "While handshakes are common in business, a traditional greeting among close friends and family in the Netherlands is three kisses on alternating cheeks." }, // Nertherlands (or Holland as my book says)
    5: { answer: true, reason: "The unicorn is the official national animal of Scotland, symbolizing strength and untamed power in Celtic mythology." }, // Scotland
    6: { answer: false, reason: "In Sweden, it is generally considered impolite to enter a home while wearing outdoor shoes. Standard etiquette is to remove them." }, // Sweeden 
    7: { answer: false, reason: "While Danish love ice cream and consume it year-round, it is not a standard or frequent breakfast food." }, // Denmark
    8: { answer: true, reason: "In Portugal, the name 'Lucifer' is legally prohibited for use on newborns." }, // Portugal
    9: { answer: true, reason: "Most Austrians will stand and wait for the 'little green man' (Ampelmännchen) to appear, even if the street is empty." } // Austria
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
        document.getElementById('score-display').innerText = `Answer the questions first before you submit... (${answeredCount}/${totalFacts})`;
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
    
    // Showing the score
    const display = document.getElementById('score-display');
    display.innerText = `You got ${score} out of ${totalFacts} correct!`;

    // Adding the detailed results
    const resultsContainer = document.querySelector('.results');
    let breakdown = document.getElementById('results-breakdown');

    if (!breakdown) {
        breakdown = document.createElement('div');
        breakdown.id = 'results-breakdown';
        resultsContainer.appendChild(breakdown); 
    }

    breakdown.innerHTML = resultsHTML;

    if (score === totalFacts) {
        display.style.color = '#4ade80'; // Green
    } else if (score >= totalFacts / 2) {
        display.style.color = '#facc15'; // Yellow 
    } else {
        display.style.color = '#f87171'; // Red
    }
}
