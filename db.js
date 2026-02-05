// db.js - Cloud Database Logic

const CONFIG = {
    // 1. YOUR RESTDB URL
    DB_URL: 'https://defngame-345c.restdb.io/rest/gamestate', 
    
    // 2. YOUR API KEY
    API_KEY: '69786cc753d66e164e1956c2' 
};

const DB = {
    getHeaders: function() {
        return {
            'Content-Type': 'application/json',
            'x-apikey': CONFIG.API_KEY,
            'cache-control': 'no-cache'
        };
    },

    getData: async function() {
        try {
            let response = await fetch(CONFIG.DB_URL, {
                method: 'GET',
                headers: this.getHeaders()
            });
            let data = await response.json();
            // RestDB returns an array. We usually want the first item.
            // If the array is empty, we return null.
            return data.length > 0 ? data[0] : null; 
        } catch (error) {
            console.error("DB Connection Error. Check API Key.", error);
            return null;
        }
    },

    updateData: async function(recordId, newBalance, newTxns) {
        try {
            await fetch(`${CONFIG.DB_URL}/${recordId}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify({ balance: newBalance, transactions: newTxns })
            });
        } catch (error) {
            console.error("Save Error:", error);
        }
    },

    addTransaction: async function(title, cost) {
        let currentData = await this.getData();
        if (!currentData) {
            console.error("No user data found to update.");
            return;
        }

        let newBal = currentData.balance + cost;
        let newTxn = {
            title: title,
            date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            amount: cost,
            type: cost > 0 ? "income" : "expense"
        };

        let txns = currentData.transactions || [];
        txns.unshift(newTxn); // Add to top

        await this.updateData(currentData._id, newBal, txns);
    },

    resetAccount: async function() {
        let currentData = await this.getData();
        
        // If no data exists yet, we might need to handle the case where we create it first
        // But assuming you manually created one record in RestDB dashboard, this works:
        if (!currentData) {
            alert("Error: No record found in database. Please ensure you created a record in RestDB first.");
            return;
        }

        let defaultTxns = [
             { title: "Salary", date: "Today, 9:00 AM", amount: 3500, type: "income" },
             { title: "Starbucks", date: "Yesterday", amount: -7.50, type: "expense" }
        ];

        await this.updateData(currentData._id, 5000, defaultTxns);
        alert("System Reset Complete. Balance restored to $5,000.");
        window.location.href = "home.html";
    }
};