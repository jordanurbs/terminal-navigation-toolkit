# Terminal Navigation Toolkit

A comprehensive learning platform designed to help you master terminal commands and boost your productivity with AI. This project combines a Vue.js frontend with an Express.js backend to deliver an interactive learning experience.

## Features

- 30 days of progressive command line challenges
- Interactive progress tracking with MongoDB
- Real-time task completion updates
- Offline capability with local data persistence
- API key validation system
- Modern Vue 3 frontend with Vuex state management
- Express.js backend with MongoDB Memory Server for development

## Tech Stack

- Frontend: Vue 3, Vuex, Vue Router
- Backend: Express.js, MongoDB (with MongoDB Memory Server for development)
- Build Tools: Vite
- Additional Libraries: Axios, Marked, Prism.js, Canvas Confetti

## Quick Start

1. Clone this repository:
   ```bash
   git clone https://github.com/jordanurbs/terminal-navigation-toolkit.git
   cd terminal-navigation-toolkit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration.

4. Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the frontend (Vite) and backend (Express) servers concurrently.

5. Open your browser and navigate to `http://localhost:5173`

## Development Scripts

- `npm run dev`: Start the development server (frontend + backend)
- `npm run build`: Build the project for production
- `npm run preview`: Preview the production build locally
- `npm run build:static`: Build and create static files
- `npm run server`: Run only the backend server

## API Key Access

To access the 30-Day Content Commander Challenge, you'll need to purchase a lifetime API key from https://ccc.ai-captains.com. The API key is required for:
- Accessing challenge content
- Tracking progress
- Validating completion status

## Data Storage

- Progress data is stored locally in MongoDB Memory Server during development
- API key validation is performed against the mothership server (ccc.ai-captains.com)
- Offline fallback is available for previously validated API keys

## Privacy

Your progress data is stored locally in your browser's MongoDB instance. The only external communication is for API key validation. No personal data is transmitted to external servers except for the API key validation process.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

The 30-Day Content Commander Challenge content is proprietary and requires a valid API key to access.
