const scenarios = [
    {
        id: "telegram_scam",
        title: "Telegram Impersonation",
        type: "chat",
        difficulty: "Medium",
        color: "linear-gradient(135deg, #3b82f6, #06b6d4)",
        icon: "fa-paper-plane",
        briefing: {
            platform: "Telegram",
            source: "Unknown Contact",
            situation: "A contact using your friend's name messages you urgently asking for help transferring money.",
            tip: "Always verify identity through a second channel (voice call)."
        },
        content: {
            sender: "Jason (Old Friend)",
            body: `
                <div class="chat-bubble left">Hey! Long time no see.</div>
                <div class="chat-bubble left">I'm in a bind. My bank app is locked.</div>
                <div class="chat-bubble left">Can you transfer $300 to this PayNow? I'll pay you back tmrw! 🙏</div>
            `,
            cost: 300
        },
        options: [
            { text: "Sure, sending $300", type: "wrong", reply: "Sent. Please pay me back." },
            { text: "Call me first", type: "correct", reply: "I need to verify it's you. Call me." },
            { text: "New phone who dis?", type: "troll", reply: "Sorry, I don't know any Jason." }
        ]
    },
    {
        id: "job_scam",
        title: "Job Offer Scam",
        type: "email",
        difficulty: "Easy",
        color: "linear-gradient(135deg, #d946ef, #f43f5e)",
        icon: "fa-briefcase",
        briefing: {
            platform: "Email",
            source: "jobs@greencareers.com",
            situation: "You receive a job offer. They require a $100 fee for 'onboarding materials'.",
            tip: "Legitimate employers never ask for money upfront."
        },
        content: {
            sender: "TechCorp HR",
            subject: "Job Offer: Remote Admin",
            body: `
                <p>We are pleased to offer you the Remote Admin Role.</p>
                <p>To secure your position, please make a <b style="color:red">$100 processing payment</b> for your laptop.</p>
            `,
            cost: 100
        },
        options: [
            { text: "Pay $100 Fee", type: "wrong", reply: "Paying the fee now." },
            { text: "Report Scam", type: "correct", reply: "This is a scam." },
            { text: "Do you hire cats?", type: "troll", reply: "My cat needs a job." }
        ]
    },
    {
        id: "phishing_scam",
        title: "Bank Phishing",
        type: "web",
        difficulty: "Hard",
        color: "linear-gradient(135deg, #f97316, #ef4444)",
        icon: "fa-university",
        briefing: {
            platform: "SMS / Web",
            source: "DBS-Alert",
            situation: "You get an SMS saying your account is suspended with a link to verify.",
            tip: "Banks never send login links via SMS."
        },
        content: {
            sender: "Bank Alert",
            subject: "Urgent: Account Suspended",
            body: `
                <div style="text-align:center; padding:20px; border:1px solid red; border-radius:10px;">
                    <h3 style="color:red">Action Required</h3>
                    <p>Click to verify identity or lose access.</p>
                    <button style="background:red; color:white; padding:10px;">VERIFY NOW</button>
                </div>
            `,
            cost: 1200
        },
        options: [
            { text: "Click Link", type: "wrong", reply: "Logging in..." },
            { text: "Ignore", type: "correct", reply: "Deleting message." },
            { text: "Nice try", type: "troll", reply: "I use a toaster to bank." }
        ]
    }
];