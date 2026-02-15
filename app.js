// --- RESTDB CONFIGURATION ---
const CONFIG = {
    DB_URL: 'https://defngame-345c.restdb.io/rest/gamestate', 
    API_KEY: '69786cc753d66e164e1956c2' 
};

const DB = {
    headers: { 
        'Content-Type': 'application/json', 
        'x-apikey': CONFIG.API_KEY, 
        'cache-control': 'no-cache' 
    },

    // A. LOGIN: Fetch from DB -> Save to LocalStorage
    login: async function(username, password) {
        // Query DB for user
        let q = JSON.stringify({ username: username, password: password });
        try {
            let res = await fetch(`${CONFIG.DB_URL}?q=${q}`, { headers: this.headers });
            let users = await res.json();
            
            if(users.length > 0) {
                // Save user data to LocalStorage so the rest of the app works fast
                let user = users[0];
                // Map DB fields to App fields if needed
                user.fullName = user.fullname; 
                localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            }
        } catch(e) { console.error("Login Error:", e); }
        return false;
    },

    // B. SIGNUP: Create in DB -> Save to LocalStorage
    signup: async function(fullname, email, username, password) {
        // 1. Check if exists
        let q = JSON.stringify({ $or: [{username: username}, {email: email}] });
        let check = await fetch(`${CONFIG.DB_URL}?q=${q}`, { headers: this.headers });
        let existing = await check.json();
        
        if(existing.length > 0) return { success: false, message: "Username or Email already taken." };

        // 2. Create User Object
        let newUser = {
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            balance: 5000,
            history: [],
            badges: []
        };

        // 3. Post to DB
        let res = await fetch(CONFIG.DB_URL, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(newUser)
        });

        if(res.ok) {
            let createdUser = await res.json();
            createdUser.fullName = createdUser.fullname; // Compatibility
            localStorage.setItem('currentUser', JSON.stringify(createdUser));
            return { success: true };
        }
        return { success: false, message: "Database Connection Error" };
    },

    // C. SYNC: Push LocalStorage changes to DB
    pushUpdate: async function() {
        let user = getCurrentUser();
        if(!user || !user._id) return;

        // We update specific fields: history, badges, balance
        let payload = {
            history: user.history || [],
            badges: user.badges || [],
            balance: user.balance || 5000
        };

        try {
            await fetch(`${CONFIG.DB_URL}/${user._id}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(payload)
            });
            console.log("Cloud Sync Complete");
        } catch(e) { console.error("Sync Failed", e); }
    },
    
    // D. RESET: Wipe Account
    resetAccount: async function() {
        let user = getCurrentUser();
        if(!user || !user._id) return;
        
        await fetch(`${CONFIG.DB_URL}/${user._id}`, {
            method: 'PATCH', headers: this.headers,
            body: JSON.stringify({ history: [], badges: [], balance: 5000 })
        });
        
        // Update Local
        user.history = []; user.badges = []; user.balance = 5000;
        setCurrentUser(user);
    }
};

// Utility functions for localStorage management
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getAchievements() {
    return JSON.parse(localStorage.getItem('achievements') || '{}');
}

function saveAchievements(achievements) {
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

function getCompletedScenarios() {
    return JSON.parse(localStorage.getItem('completedScenarios') || '[]');
}

function saveCompletedScenarios(scenarios) {
    localStorage.setItem('completedScenarios', JSON.stringify(scenarios));
}

// --- NEW: Function to save the specific result (Win/Loss) ---
function saveScenarioResult(scenarioId, choice) {
    let results = JSON.parse(localStorage.getItem('scenarioResults') || '{}');
    results[scenarioId] = choice; // Saves 'agree', 'disagree', or 'troll'
    localStorage.setItem('scenarioResults', JSON.stringify(results));
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
        setTimeout(() => element.classList.add('hidden'), 3000);
    }
}

// Show success message
function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
        setTimeout(() => element.classList.add('hidden'), 3000);
    }
}

// Password strength checker
function checkPasswordStrength(password, strengthBars, strengthText) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    const strengthTexts = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthClasses = ['', 'active', 'active fair', 'active good', 'active strong'];

    strengthBars.forEach((bar, index) => {
        bar.className = 'strength-bar';
        if (index < strength) {
            bar.classList.add(...strengthClasses[strength].split(' '));
        }
    });

    if (strengthText) {
        strengthText.textContent = strength > 0 ? `Password strength: ${strengthTexts[strength]}` : '';
    }
}

// Unlock achievement
function unlockAchievement(achievementId, badge) {
    const achievements = getAchievements();
    
    if (!achievements[achievementId]) {
        achievements[achievementId] = true;
        achievements[achievementId + '_date'] = new Date().toISOString();
        saveAchievements(achievements);
        
        if (badge) {
            sessionStorage.setItem('pendingBadge', JSON.stringify(badge));
        }
        
        checkForTrophy();
        return true;
    }
    return false;
}

// --- UPDATED: Now accepts 'choice' to save history ---
function completeScenario(scenarioId, choice) {
    const scenarios = getCompletedScenarios();
    
    // 1. Save the specific result (Win/Loss)
    if (choice) {
        saveScenarioResult(scenarioId, choice);
    }

    // 2. Mark as completed
    if (!scenarios.includes(scenarioId)) {
        scenarios.push(scenarioId);
        saveCompletedScenarios(scenarios);
        
        const achievements = getAchievements();
        if (!achievements.first_scenario) {
            unlockAchievement('first_scenario', {
                title: 'First Steps',
                description: 'You completed your first scenario! Keep going!',
                type: 'badge'
            });
        }
        
        checkForTrophy();
    }
}

// Check for trophy
function checkForTrophy() {
    const achievements = getAchievements();
    const scenarios = getCompletedScenarios();
    
    const allAchievementsUnlocked = 
        achievements.first_scenario &&
        achievements.scampedia_visited &&
        achievements.scam_impact_visited &&
        scenarios.length >= 3;

    if (allAchievementsUnlocked && !achievements.master_trophy) {
        unlockAchievement('master_trophy', {
            title: 'Master Protector',
            description: 'You unlocked all achievements! You are now a scam awareness expert!',
            type: 'trophy'
        });
    }
}

// Check for pending badge
function checkPendingBadge() {
    const pendingBadge = sessionStorage.getItem('pendingBadge');
    if (pendingBadge) {
        sessionStorage.removeItem('pendingBadge');
        setTimeout(() => showBadgePopup(JSON.parse(pendingBadge)), 500);
    }
}

function showBadgePopup(badge) {
    const popup = document.getElementById('badge-popup');
    if (!popup) return;
    
    const icon = document.getElementById('popup-badge-icon');
    const type = document.getElementById('popup-badge-type');
    const title = document.getElementById('popup-badge-title');
    const description = document.getElementById('popup-badge-description');

    if (badge.type === 'trophy') {
        icon.style.background = 'linear-gradient(to bottom right, #facc15, #f59e0b)';
        icon.style.boxShadow = '0 0 40px rgba(234, 179, 8, 0.6)';
        type.textContent = 'Trophy Earned!';
    } else {
        icon.style.background = 'linear-gradient(to bottom right, #3b82f6, #9333ea)';
        icon.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.6)';
        type.textContent = 'Badge Unlocked!';
    }

    title.textContent = badge.title;
    description.textContent = badge.description;

    popup.classList.remove('hidden');
    setTimeout(() => { closeBadgePopup(); }, 5000);
}

function closeBadgePopup() {
    const popup = document.getElementById('badge-popup');
    if (popup) popup.classList.add('hidden');
}

function getAchievementCount() {
    const achievements = getAchievements();
    const scenarios = getCompletedScenarios();
    return Object.keys(achievements).filter(key => achievements[key] === true).length + scenarios.length;
}

function toggleCollapsible(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.chevron-icon');
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}

function togglePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}