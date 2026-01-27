// Navigation Logic
function goToLogin() {
    switchScreen('page-landing', 'page-login');
}

function handleLogin(e) {
    e.preventDefault();
    // In real app, check password here
    switchScreen('page-login', 'page-game');
}

function goBack(targetId) {
    // Hide current, Show target
    const current = document.querySelector('.screen.active');
    current.classList.remove('active');
    current.classList.add('hidden');
    
    document.getElementById(targetId).classList.remove('hidden');
    document.getElementById(targetId).classList.add('active');
}

function switchScreen(fromId, toId) {
    document.getElementById(fromId).classList.remove('active');
    document.getElementById(fromId).classList.add('hidden'); // Slide out
    
    document.getElementById(toId).classList.remove('hidden');
    document.getElementById(toId).classList.add('active'); // Slide in
}

// Simple Game Start
function startGame() {
    const chat = document.getElementById('chat-window');
    chat.innerHTML += `<div class="msg system">Connecting to target...</div>`;
    // Add your scenarios logic here
}