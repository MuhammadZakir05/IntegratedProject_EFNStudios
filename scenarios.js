const scenarios = [
    {
        id: 1,
        sender: "Prince Abba",
        message: "Greetings! I need help moving $5M from my royal account.",
        followUp: "I just need a small transfer fee of $500 to unlock the funds. Can I trust you?",
        options: [
            {
                text: "Sounds like a scam.",
                type: "correct",
                reply: "I wasn't born yesterday. Blocked.",
                botResponse: "You will regret this! I am royalty!"
            },
            {
                text: "Sure, here is $500!",
                type: "wrong",
                reply: "Sure, take my money!",
                botResponse: "Excellent. Processing transfer...",
                cost: -500
            },
            {
                text: "Send me a selfie.",
                type: "troll",
                reply: "Send me a selfie holding a spoon on your head.",
                botResponse: "How dare you mock the prince?!"
            }
        ]
    },
    {
        id: 2,
        sender: "Job Recruiter",
        message: "Hi! Earn $800/day working from home! No experience needed.",
        followUp: "Just pay $1,000 for the training laptop to start.",
        options: [
            {
                text: "Reported.",
                type: "correct",
                reply: "No legit job asks for money first.",
                botResponse: "(User has blocked you)"
            },
            {
                text: "I want the job!",
                type: "wrong",
                reply: "I'll pay the $1,000 fee.",
                botResponse: "Great! Send it via PayNow.",
                cost: -1000
            },
            {
                text: "Do you hire cats?",
                type: "troll",
                reply: "My cat is looking for a job. He is very polite.",
                botResponse: "Stop wasting my time."
            }
        ]
    },
    {
        id: 3,
        sender: "Tech Support",
        message: "ALERT: Virus Detected! Microsoft needs to clean your PC.",
        followUp: "Download our 'Anti-Virus' software for $300 immediately.",
        options: [
            {
                text: "I use a Toaster.",
                type: "troll",
                reply: "But I'm running Windows 95 on a toaster.",
                botResponse: "What? Is this a joke?"
            },
            {
                text: "Fake Alert.",
                type: "correct",
                reply: "Microsoft never calls people.",
                botResponse: "..."
            },
            {
                text: "Fix it please!",
                type: "wrong",
                reply: "I'm downloading it now. Taking $300.",
                botResponse: "Access granted. Files encrypted.",
                cost: -300
            }
        ]
    }
];