// --- DOM ELEMENTS ---
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const lossScreen = document.getElementById('loss-screen');
const notification = document.getElementById('notification-banner');
const chatWindow = document.getElementById('chat-window');

// --- 1. STARTUP SEQUENCE ---
window.onload = function() {
    // Wait 2 seconds, then show notification
    setTimeout(() => {
        notification.classList.remove('hidden-banner');
        playSound('ping'); // Optional: Add a sound later
    }, 2000);
};

// --- 2. NAVIGATION ---
function launchChat() {
    // Hide notification first
    notification.classList.add('hidden-banner');
    
    // Slide screens
    homeScreen.classList.remove('active');
    homeScreen.classList.add('hidden'); // Move Home Left
    
    // Reset Chat Position just in case
    gameScreen.style.transform = "translateX(100%)"; 
    
    setTimeout(() => {
        gameScreen.classList.remove('hidden');
        gameScreen.classList.add('active');
    }, 100);
}

function goHome() {
    // Reset everything
    lossScreen.classList.remove('active');
    lossScreen.classList.add('hidden');
    
    gameScreen.classList.remove('active');
    gameScreen.classList.add('hidden');
    
    homeScreen.classList.remove('hidden');
    homeScreen.classList.add('active');
    
    // Reset chat content (remove player messages)
    // Optional: Clear appended messages
}

// --- 3. GAMEPLAY LOGIC ---
function reply(choice) {
    // 1. Show Player Message
    const text = choice === 'risky' ? "Sounds risky..." : 
                 choice === 'help' ? "Sure, I'll help!" : 
                 "Send me your crown!";
                 
    const bubble = document.createElement('div');
    bubble.className = "player-msg";
    bubble.innerText = text;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // 2. Logic
    setTimeout(() => {
        if (choice === 'help') {
            // LOSE STATE
            showLossScreen();
        } else if (choice === 'risky') {
            // SCAMMER PERSISTS
            addScammerMsg("No risk my friend! Just a small transfer fee of $500.");
        } else {
            // TROLL SUCCESS (Optional: You can make a win screen here)
            addScammerMsg("Do not joke with royalty!");
        }
    }, 1000);
}

function addScammerMsg(text) {
    const group = document.createElement('div');
    group.className = 'message-group';
    group.innerHTML = `
        <div class="avatar">👑</div>
        <div class="message">${text}</div>
    `;
    chatWindow.appendChild(group);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showLossScreen() {
    // Instant switch to loss overlay
    lossScreen.classList.remove('hidden');
    lossScreen.classList.add('active');
}

function playSound(name) {
    console.log("Playing sound: " + name);
}