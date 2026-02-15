# Scam Awareness Simulator - HTML/CSS Prototype

A complete educational web application to help users recognize and avoid common scams through interactive scenarios and comprehensive learning materials.

## Features

### 🔐 Authentication System
- **Login** - Secure login with validation
- **Sign Up** - Full registration with password strength indicator
- **Forgot Password** - Multi-step password recovery with verification code

### 🎮 Interactive Scenarios
- **Telegram Investment Scam** - Fake investment opportunity
- **Job Scam** - Too good to be true job offers
- **Bank Phishing** - Fake security alerts

### 🏆 Achievement System
- Earn badges for completing scenarios
- Unlock achievements for exploring content
- Track progress with milestones
- Earn Master Protector trophy for completing everything
- Animated badge popups with celebration effects

### 📚 Educational Content
- **Scampedia** - Comprehensive guide to scam types
- **Scam Impact** - Real-world statistics and consequences
- **Result Pages** - Detailed breakdown of scam tactics and protection tips

### 👤 Profile & Settings
- View all achievements and progress
- Track completed scenarios
- Account management
- Data export and reset options

## File Structure

```
/
├── index.html              # Landing page (redirects to login)
├── login.html              # Login page
├── signup.html             # Registration page
├── forgot-password.html    # Password recovery
├── dashboard.html          # Main dashboard
├── profile.html            # User profile & achievements
├── scenario-selection.html # Choose a scenario
├── telegram-scam.html      # Telegram scenario
├── job-scam.html          # Job scam scenario
├── bank-phishing.html     # Bank phishing scenario
├── result.html            # Scenario results
├── scampedia.html         # Educational content
├── scam-impact.html       # Statistics & impact
├── contact.html           # Contact & help
├── settings.html          # User settings
├── styles.css             # Global styles
└── app.js                 # Core JavaScript functions
```

## How to Use

1. **Open the application**: Open `index.html` in any modern web browser
2. **Create an account**: Click "Sign Up" and fill in your information
3. **Explore scenarios**: Complete interactive scam simulations
4. **Learn**: Read the Scampedia and Scam Impact pages
5. **Track progress**: View your badges and trophies in your profile

## Getting Started

### First Time Users
1. Open `login.html` or `signup.html`
2. Create a new account with:
   - Full name
   - Email address
   - Username
   - Password (minimum 8 characters)
3. You'll be automatically logged in and taken to the dashboard

### Returning Users
1. Open `login.html`
2. Enter your username and password
3. Access all features from the dashboard

## Features Walkthrough

### Dashboard
- Navigate to all sections of the app
- View quick stats (scenarios completed, achievements)
- Access your profile via the profile button (top right)

### Scenarios
1. Click "Start Scenario" from dashboard
2. Choose a scenario type
3. Read the scam attempt carefully
4. Make your choice
5. View detailed results and learn from the experience

### Achievements
Unlock badges by:
- ✅ Completing your first scenario
- ✅ Completing each scenario type
- ✅ Visiting the Scampedia
- ✅ Viewing Scam Impact statistics
- ✅ Completing all scenarios (Scenario Master milestone)
- 🏆 Unlocking all achievements (Master Protector trophy)

### Profile Page
- View your avatar and stats
- See trophy progress
- Browse all badges (locked and unlocked)
- Check milestone achievements

## Technical Details

### Technologies Used
- **HTML5** - Structure and content
- **CSS3** - Styling and animations
- **Vanilla JavaScript** - Functionality and interactivity
- **LocalStorage** - Data persistence

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with JavaScript enabled

### Data Storage
All data is stored locally in your browser using `localStorage`:
- User accounts
- Achievements
- Completed scenarios
- Current session

### No Server Required
This is a fully client-side application. No server or backend needed. Simply open the HTML files in a browser.

## Key Features Explained

### Password Reset Flow
1. Enter your email address
2. Receive a 6-digit verification code (shown in demo mode)
3. Enter the code to verify
4. Set your new password
5. Log in with new credentials

### Achievement System
- Achievements are automatically tracked
- Badge popups appear when you unlock new achievements
- All progress is saved to localStorage
- Trophy unlocks when all achievements are complete

### Scenario Results
After completing a scenario, you'll see:
- Overall result (success, scammed, or risky approach)
- Scenario breakdown
- Tactics used by the scammer
- Red flags you should watch for
- Protection tips for the future

## Demo Credentials

For testing, you can create any account. The system uses localStorage, so your data persists across sessions in the same browser.

## Tips for Best Experience

1. **Complete scenarios first** to understand common scam tactics
2. **Read the Scampedia** for comprehensive knowledge
3. **Check Scam Impact** to understand real-world consequences
4. **Try all response options** to see different outcomes
5. **Share with friends and family** to spread awareness

## Customization

You can easily customize:
- Colors in `styles.css` (search for color hex codes)
- Achievement titles and descriptions in each page's JavaScript
- Scenario content in the scenario HTML files
- Educational content in `scampedia.html` and `scam-impact.html`

## Educational Purpose

This simulator is designed for:
- **Awareness training** - Learn to spot scam red flags
- **Safe practice** - Experience scams in a controlled environment
- **Education** - Understand psychology behind scams
- **Prevention** - Develop critical thinking about online interactions

## Support & Help

Visit the Contact page within the app to:
- Report bugs or issues
- Suggest new scenarios
- Get help with scam-related questions
- Access external resources

## Privacy & Security

- All data stays on your device
- No information is sent to external servers
- No tracking or analytics
- You can export or delete your data anytime in Settings

## Future Enhancements

Potential additions:
- More scenario types (romance scams, tech support, etc.)
- Difficulty levels
- Timed challenges
- Multiplayer quiz mode
- Progress sharing

## License

This educational tool is provided as-is for learning purposes.

## Credits

Created as a comprehensive scam awareness training platform.

---

**Remember: If something seems too good to be true, it probably is. Stay safe online!**
