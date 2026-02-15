const scenarios = [
    {
        id: "telegram_scam",
        title: "Telegram Impersonation",
        type: "chat",
        briefing: {
            situation: "A contact using your friend's name messages you urgently asking for help.",
            tip: "Always verify identity through a second channel."
        },
        content: {
            body: `<div class="chat-bubble left">Hey! Long time no see.</div><div class="chat-bubble left">I'm in a bind. Can you transfer $300? I'll pay you back tmrw! 🙏</div>`,
            cost: 300
        },
        options: [
            { text: "Sure, sending $300", type: "wrong" },
            { text: "Call me first", type: "correct" },
            { text: "New phone who dis?", type: "troll" }
        ]
    },
    {
        id: "job_scam",
        title: "Job Offer Scam",
        type: "email",
        briefing: {
            situation: "You receive a job offer requiring a $100 fee for 'onboarding'.",
            tip: "Legitimate employers never ask for money upfront."
        },
        content: {
            sender: "TechCorp HR",
            subject: "Job Offer: Remote Admin",
            body: `<p>We are pleased to offer you the role.</p><p>Please make a <b style="color:#ef4444">$100 payment</b> for your laptop.</p>`,
            cost: 100
        },
        options: [
            { text: "Pay $100 Fee", type: "wrong" },
            { text: "Report Scam", type: "correct" },
            { text: "Do you hire cats?", type: "troll" }
        ]
    },
    {
        id: "phishing_scam",
        title: "Bank Phishing",
        type: "web",
        briefing: {
            situation: "You get an SMS saying your account is suspended.",
            tip: "Banks never send login links via SMS."
        },
        content: {
            body: `<div style="text-align:center; padding:20px; border:1px solid #ef4444; border-radius:10px;"><h3 style="color:#ef4444">Action Required</h3><p>Click to verify identity.</p><button style="background:#ef4444; color:white; padding:10px; border:none;">VERIFY NOW</button></div>`,
            cost: 1200
        },
        options: [
            { text: "Click Link", type: "wrong" },
            { text: "Ignore", type: "correct" },
            { text: "I use a toaster", type: "troll" }
        ]
    }
];