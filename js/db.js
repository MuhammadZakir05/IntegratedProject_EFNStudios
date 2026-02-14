// db.js - Fault Tolerant Database
const CONFIG = {
    DB_URL: 'https://defngame-345c.restdb.io/rest/gamestate', 
    API_KEY: '69786cc753d66e164e1956c2' 
};

const DB = {
    headers: { 'Content-Type': 'application/json', 'x-apikey': CONFIG.API_KEY, 'cache-control': 'no-cache' },

    // --- SMART LOADER ---
    toggleLoading: function(show) {
        let loader = document.getElementById('global-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'global-loader';
            loader.className = 'loader-overlay hidden';
            loader.innerHTML = '<div class="spinner"></div>';
            (document.getElementById('app-frame') || document.body).appendChild(loader);
        }
        
        if(show) {
            loader.classList.remove('hidden');
            // SAFETY: Kill loader after 3 seconds no matter what
            setTimeout(() => loader.classList.add('hidden'), 3000); 
        } else {
            loader.classList.add('hidden');
        }
    },

    getUser: async function() {
        let id = localStorage.getItem('defn_uid');
        if(!id) return null; // No ID = No Load

        this.toggleLoading(true);
        try {
            let res = await fetch(`${CONFIG.DB_URL}/${id}`, { headers: this.headers });
            this.toggleLoading(false);
            if(res.ok) return await res.json();
            
            // If ID is invalid (user deleted), logout
            this.logout();
            return null;
        } catch(e) { 
            this.toggleLoading(false); 
            return null; 
        }
    },

    login: async function(u, p) {
        this.toggleLoading(true);
        try {
            let res = await fetch(CONFIG.DB_URL, { headers: this.headers });
            let users = await res.json();
            let user = users.find(x => x.username === u && x.password === p);
            
            this.toggleLoading(false);
            if(user) {
                localStorage.setItem('defn_uid', user._id);
                window.location.href = 'home.html';
                return true;
            }
            return false;
        } catch(e) { 
            this.toggleLoading(false); 
            return false; 
        }
    },

    signup: async function(fname, email, u, p) {
        this.toggleLoading(true);
        try {
            // Check duplicates
            let checkRes = await fetch(CONFIG.DB_URL, { headers: this.headers });
            let users = await checkRes.json();
            if(users.find(x => x.username === u)) {
                this.toggleLoading(false);
                return "exists";
            }

            // Create User
            let newUser = { 
                fullname: fname, email: email, username: u, password: p, 
                balance: 5000, startBalance: 5000, history: [], badges: [] 
            };
            
            let createRes = await fetch(CONFIG.DB_URL, { method: 'POST', headers: this.headers, body: JSON.stringify(newUser) });
            this.toggleLoading(false);
            
            if(createRes.ok) return "success";
            return "error";
        } catch(e) {
            this.toggleLoading(false);
            return "error";
        }
    },

    saveProgress: async function(cost, levelId, status) {
        let user = await this.getUser(); // This handles loading logic
        if(!user) return;

        this.toggleLoading(true);
        let newBal = user.balance - cost;
        let newHistory = user.history || [];
        
        newHistory.push({
            levelId: levelId, status: status, cost: cost, date: new Date().toLocaleDateString()
        });

        await fetch(`${CONFIG.DB_URL}/${user._id}`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({ balance: newBal, history: newHistory })
        });
        this.toggleLoading(false);
    },

    logout: function() {
        localStorage.removeItem('defn_uid');
        window.location.href = 'index.html';
    }
};