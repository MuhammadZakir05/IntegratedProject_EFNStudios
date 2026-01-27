const CONFIG = {
    // 1. YOUR RESTDB URL (Check your RestDB Settings -> General -> URL)
    // It usually looks like: https://defn-1234.restdb.io/rest/gamestate
    DB_URL: 'https://defngame-345c.restdb.io/rest/gamestate', 
    
    // 2. PASTE YOUR API KEY HERE (From the Screenshot)
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
            return data.length > 0 ? data[0] : null; 
        } catch (error) {
            console.error("DB Error:", error);
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
        if (!currentData) return;

        let newBal = currentData.balance + cost;
        let newTxn = {
            title: title,
            date: new Date().toLocaleTimeString(),
            amount: cost,
            type: cost > 0 ? "income" : "expense"
        };

        let txns = currentData.transactions || [];
        txns.unshift(newTxn);

        await this.updateData(currentData._id, newBal, txns);
    }
};