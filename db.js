const CONFIG = {
    DB_URL: 'https://defngame-345c.restdb.io/rest/gamestate', 
    API_KEY: '69786cc753d66e164e1956c2' 
};

const DB = {
    headers: { 'Content-Type': 'application/json', 'x-apikey': CONFIG.API_KEY, 'cache-control': 'no-cache' },

    // 1. GET USER
    getUser: async function() {
        let id = localStorage.getItem('defn_uid');
        if(!id) return null;
        try {
            let res = await fetch(`${CONFIG.DB_URL}/${id}`, { headers: this.headers });
            if(res.ok) return await res.json();
        } catch(e) { console.error(e); }
        return null;
    },

    // 2. LOGIN
    login: async function(u, p) {
        let res = await fetch(CONFIG.DB_URL, { headers: this.headers });
        let users = await res.json();
        let user = users.find(x => x.username === u && x.password === p);
        if(user) {
            localStorage.setItem('defn_uid', user._id);
            window.location.href = 'home.html';
            return true;
        }
        return false;
    },

    // 3. SAVE PROGRESS & UNLOCK BADGE
    saveProgress: async function(cost, levelId, status) {
        let user = await this.getUser();
        if(!user) return;

        let newBal = user.balance - cost;
        let newHistory = user.history || [];
        let newBadges = user.badges || [];

        // Add to history
        newHistory.unshift({
            levelId: levelId, status: status, cost: cost, date: new Date().toLocaleDateString()
        });

        // --- BADGE LOGIC: CHECK FOR 3 WINS ---
        if(status === 'passed') {
            // Count unique passed levels
            let uniqueWins = new Set(newHistory.filter(h => h.status === 'passed').map(h => h.levelId));
            
            // If they have 3 wins and don't have the badge yet...
            if(uniqueWins.size >= 3 && !newBadges.includes('badge_3d_shield')) {
                newBadges.push('badge_3d_shield');
                alert("🏆 ACHIEVEMENT UNLOCKED: 3D CYBER SHIELD!\nGo to your Profile to view it.");
            }
        }

        // Save to DB
        await fetch(`${CONFIG.DB_URL}/${user._id}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({ 
                balance: newBal, 
                history: newHistory,
                badges: newBadges
            })
        });
    },

    // 4. REPAIR ACCOUNT
    repairAccount: async function() {
        let user = await this.getUser();
        if(!user) return;
        await fetch(`${CONFIG.DB_URL}/${user._id}`, {
            method: 'PATCH', headers: this.headers,
            body: JSON.stringify({ balance: 5000, startBalance: 5000, history: [], badges: [] })
        });
        alert("Reset Complete.");
        window.location.reload();
    },

    logout: function() {
        localStorage.removeItem('defn_uid');
        window.location.href = 'index.html';
    }
};