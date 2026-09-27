let playerGold = 0;
let playerStreak = 0;
let currentGender = 'boy';
let correctAnswer = 0;

function initGame() {
const container = document.getElementById('game-container');
container.innerHTML = <div class="setup-box"> <h2>👤 Choose Character</h2> <div class="select-grid"> <button class="select-btn" onclick="startGame('boy')">👦 Boy</button> <button class="select-btn" onclick="startGame('girl')">👧 Girl</button> </div> </div>;
}

function startGame(gender) {
currentGender = gender;
document.getElementById('hud').classList.remove('hidden');
renderMathBoard();
}

function renderMathBoard() {
const container = document.getElementById('game-container');
let avatarSVG = getAvatarSVG(currentGender);

container.innerHTML = `
    <div class="math-board">
        <div id="mathQuestion" style="font-size:36px; font-weight:bold; margin-bottom:15px;"></div>
        <div style="display:flex; justify-content:center; align-items:center;">
            <input type="number" id="mathInput" class="math-input" placeholder="?" inputmode="numeric">
            <button onclick="checkMath()" class="math-btn">Go</button>
        </div>
        <div id="mathFeedback" style="font-size:20px; margin-top:10px; font-weight:bold; min-height:25px;"></div>
    </div>
    <div class="avatar-container">
        ${avatarSVG}
    </div>
`;
generateMath();
}

function getAvatarSVG(gender) {
const color = gender === 'boy' ? '#3b82f6' : '#ec4899';
const hair = gender === 'boy'
? '<path d="M 30 30 Q 50 10 70 30 Q 65 20 50 18 Q 35 20 30 30 Z" fill="#1e293b" />'
: '<path d="M 28 32 Q 50 5 72 32 Q 65 50 50 45 Q 35 50 28 32 Z" fill="#78350f" />';

return `
    <svg viewBox="0 0 100 120" width="100%" height="100%">
        <rect x="35" y="60" width="30" height="40" rx="8" fill="${color}" />
        <circle cx="50" cy="35" r="20" fill="#fde047" />
        ${hair}
        <circle cx="43" cy="33" r="3" fill="#1e293b" />
        <circle cx="57" cy="33" r="3" fill="#1e293b" />
        <path d="M 44 42 Q 50 48 56 42" stroke="#1e293b" stroke-width="2.5" fill="none" stroke-linecap="round" />
    </svg>
`;
}

function generateMath() {
const num1 = Math.floor(Math.random() * 10) + 1;
const num2 = Math.floor(Math.random() * 10) + 1;
correctAnswer = num1 + num2;
document.getElementById('mathQuestion').innerText = num1 + ' + ' + num2 + ' = ?';
document.getElementById('mathInput').value = '';
document.getElementById('mathFeedback').innerText = '';
document.getElementById('mathInput').focus();
}

function checkMath() {
const inputVal = parseInt(document.getElementById('mathInput').value);
const feedback = document.getElementById('mathFeedback');

if (inputVal === correctAnswer) {
    feedback.style.color = '#10b981';
    feedback.innerText = '🌟 Correct!';
    playerGold += 10;
    playerStreak += 1;
    document.getElementById('hudGold').innerText = playerGold;
    document.getElementById('hudStreak').innerText = playerStreak;
    setTimeout(generateMath, 1500);
} else {
    feedback.style.color = '#ef4444';
    feedback.innerText = '❌ Try again!';
    playerStreak = 0;
    document.getElementById('hudStreak').innerText = playerStreak;
}
}

window.onload = initGame;
