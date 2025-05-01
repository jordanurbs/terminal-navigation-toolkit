import { createStore } from 'vuex'
import { fetchChallenges, updateProgress, getProgress, validateApiKey } from './utils/api'

// Fallback to local data if API fails
const localChallengesData = [
  {
    day: 1,
    title: "Getting Started with Terminal",
    description: "Learn the basics of the terminal and command line navigation.",
    tasks: [
      { id: 1, description: "Open your terminal" },
      { id: 2, description: "Run 'pwd' to see your current directory" },
      { id: 3, description: "Run 'ls' to list files" }
    ],
    commands: [
      { command: "pwd", explanation: "Print working directory" },
      { command: "ls", explanation: "List files in current directory" }
    ],
    week: 1
  },
  {
    day: 2,
    title: "Basic File Navigation",
    description: "Learn how to navigate between directories.",
    tasks: [
      { id: 1, description: "Use 'cd' to change directories" },
      { id: 2, description: "Use 'mkdir' to create a new directory" }
    ],
    commands: [
      { command: "cd [directory]", explanation: "Change to specified directory" },
      { command: "mkdir [name]", explanation: "Create a new directory" }
    ],
    week: 1
  }
];

const store = createStore({
  state() {
    return {
      user: {
        name: localStorage.getItem('user_name') || '',
        startDate: localStorage.getItem('start_date') || null
      },
      progress: {
        completedDays: JSON.parse(localStorage.getItem('completed_days') || '[]'),
        completedCommands: JSON.parse(localStorage.getItem('completed_commands') || '[]'),
        notes: JSON.parse(localStorage.getItem('captain_log') || '{}'),
        taskStatus: JSON.parse(localStorage.getItem('task_status') || '{}')
      },
      challenges: JSON.parse(localStorage.getItem('challenges') || '[]'),
      currentDay: parseInt(localStorage.getItem('current_day') || '1', 10),
      apiKey: localStorage.getItem('apiKey') || '',
      isApiKeyValid: false,
      isLoading: false,
      error: null,
      isSetupComplete: localStorage.getItem('setupComplete') === 'true',
      favoritePrompts: JSON.parse(localStorage.getItem('favorite_prompts') || '[]'),
      notification: null
    }
  },
  getters: {
    userName(state) {
      return state.user.name
    },
    startDate(state) {
      return state.user.startDate
    },
    completedDays(state) {
      return state.progress.completedDays
    },
    completedCommands(state) {
      return state.progress.completedCommands
    },
    captainsLog(state) {
      return state.progress.notes
    },
    currentChallenge(state) {
      return state.challenges.find(challenge => challenge.day === state.currentDay) || null
    },
    progressPercentage(state) {
      return Math.round((state.progress.completedDays.length / 30) * 100)
    },
    nextMilestone(state) {
      const milestones = [7, 14, 21, 30]
      const nextMilestone = milestones.find(day => !state.progress.completedDays.includes(day))
      return nextMilestone || 30
    },
    daysUntilNextMilestone(state, getters) {
      return getters.nextMilestone - state.progress.completedDays.length
    },
    getTaskStatus: (state) => (day, taskId) => {
      return state.progress.taskStatus[`${day}-${taskId}`] || false
    },
    isAuthenticated(state) {
      return state.isSetupComplete;
    },
    favoritePrompts(state) {
      return state.favoritePrompts;
    }
  },
  mutations: {
    setUserName(state, name) {
      state.user.name = name
      localStorage.setItem('user_name', name)
    },
    setStartDate(state, date) {
      state.user.startDate = date
      localStorage.setItem('start_date', date)
    },
    setChallenges(state, challenges) {
      console.log('Setting challenges in state:', challenges.length, 'challenges');
      
      if (!Array.isArray(challenges)) {
        console.error('Invalid challenges data - not an array:', challenges);
        state.challenges = [...localChallengesData];
        console.log('Using fallback challenge data instead');
      } else if (challenges.length === 0) {
        console.warn('Empty challenges array provided');
        state.challenges = [...localChallengesData];
        console.log('Using fallback challenge data instead');
      } else {
        state.challenges = [...challenges];
      }
      
      console.log('Updated state challenges length:', state.challenges.length);
      console.log('First challenge:', state.challenges[0]);
    },
    completeDay(state, day) {
      if (!state.progress.completedDays.includes(day)) {
        state.progress.completedDays.push(day)
        state.progress.completedDays.sort((a, b) => a - b)
        localStorage.setItem('completed_days', JSON.stringify(state.progress.completedDays))
      }
    },
    uncompleteDay(state, day) {
      state.progress.completedDays = state.progress.completedDays.filter(d => d !== day)
      localStorage.setItem('completed_days', JSON.stringify(state.progress.completedDays))
    },
    completeCommand(state, command) {
      if (!state.progress.completedCommands.includes(command)) {
        state.progress.completedCommands.push(command)
        localStorage.setItem('completed_commands', JSON.stringify(state.progress.completedCommands))
      }
    },
    addLogEntry(state, { day, note }) {
      state.progress.notes[day] = note
      localStorage.setItem('captain_log', JSON.stringify(state.progress.notes))
    },
    setCurrentDay(state, day) {
      state.currentDay = day
      localStorage.setItem('current_day', day.toString())
    },
    updateTaskStatus(state, { day, taskId, completed }) {
      const key = `${day}-${taskId}`
      state.progress.taskStatus[key] = completed
      localStorage.setItem('task_status', JSON.stringify(state.progress.taskStatus))
    },
    resetProgress(state) {
      state.progress.completedDays = []
      state.progress.completedCommands = []
      state.progress.notes = {}
      state.progress.taskStatus = {}
      localStorage.removeItem('completed_days')
      localStorage.removeItem('completed_commands')
      localStorage.removeItem('captain_log')
      localStorage.removeItem('task_status')
    },
    setApiKey(state, apiKey) {
      state.apiKey = apiKey
      localStorage.setItem('apiKey', apiKey)
    },
    setApiKeyValidity(state, isValid) {
      state.isApiKeyValid = isValid
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setError(state, error) {
      state.error = error
    },
    setSetupComplete(state, isComplete) {
      state.isSetupComplete = isComplete;
      localStorage.setItem('setupComplete', isComplete);
    },
    addFavoritePrompt(state, prompt) {
      const exists = state.favoritePrompts.some(p => p.id === prompt.id);
      if (!exists) {
        state.favoritePrompts.push(prompt);
        localStorage.setItem('favorite_prompts', JSON.stringify(state.favoritePrompts));
      }
    },
    removeFavoritePrompt(state, promptId) {
      state.favoritePrompts = state.favoritePrompts.filter(p => p.id !== promptId);
      localStorage.setItem('favorite_prompts', JSON.stringify(state.favoritePrompts));
    },
    setNotification(state, notification) {
      state.notification = notification;
    },
    clearNotification(state) {
      state.notification = null;
    },
    clearAllData(state) {
      // Clear user data
      state.user.name = '';
      state.user.startDate = null;
      localStorage.removeItem('user_name');
      localStorage.removeItem('start_date');

      // Clear progress data
      state.progress.completedDays = [];
      state.progress.completedCommands = [];
      state.progress.notes = {};
      state.progress.taskStatus = {};
      localStorage.removeItem('completed_days');
      localStorage.removeItem('completed_commands');
      localStorage.removeItem('captain_log');
      localStorage.removeItem('task_status');

      // Clear challenges and API data
      state.challenges = [];
      state.apiKey = '';
      state.isApiKeyValid = false;
      state.isSetupComplete = false;
      localStorage.removeItem('challenges');
      localStorage.removeItem('apiKey');
      localStorage.removeItem('setupComplete');

      // Clear favorite prompts
      state.favoritePrompts = [];
      localStorage.removeItem('favorite_prompts');

      // Reset current day
      state.currentDay = 1;
      localStorage.setItem('current_day', '1');
    }
  },
  actions: {
    async loadLocalChallenges({ commit }) {
      try {
        console.log('Attempting to load challenges from localStorage');
        // Get challenges from localStorage
        const storedChallenges = localStorage.getItem('challenges');
        if (storedChallenges) {
          console.log('Found challenges in localStorage');
          const challenges = JSON.parse(storedChallenges);
          console.log(`Parsed ${challenges.length} challenges from localStorage`);
          
          if (challenges && Array.isArray(challenges) && challenges.length > 0) {
            commit('setChallenges', challenges);
            console.log('Successfully loaded challenges from localStorage');
            return true;
          } else {
            console.warn('Challenges in localStorage were empty or invalid, using fallback data');
            commit('setChallenges', localChallengesData);
            // Store fallback data in localStorage to prevent future issues
            localStorage.setItem('challenges', JSON.stringify(localChallengesData));
            return false;
          }
        } else {
          console.warn('No challenges found in localStorage, using fallback data');
          commit('setChallenges', localChallengesData);
          // Store fallback data in localStorage to prevent future issues
          localStorage.setItem('challenges', JSON.stringify(localChallengesData));
          return false;
        }
      } catch (error) {
        console.error('Error loading local challenges:', error);
        commit('setChallenges', localChallengesData);
        // Store fallback data in localStorage to prevent future issues
        localStorage.setItem('challenges', JSON.stringify(localChallengesData));
        return false;
      }
    },
    
    async completeSetup({ commit, dispatch }, apiKey) {
      try {
        commit('setLoading', true);
        
        // Validate API key and fetch challenges if valid
        const isValid = await dispatch('validateApiKey', apiKey);
        
        if (isValid) {
          await dispatch('fetchChallenges');
          commit('setSetupComplete', true);
        }
        
        return isValid;
      } catch (error) {
        console.error('Setup error:', error);
        commit('setError', 'Failed to complete setup. Please try again.');
        return false;
      } finally {
        commit('setLoading', false);
      }
    },
    
    async fetchChallenges({ commit, state }) {
      try {
        commit('setLoading', true);
        console.log('Fetching challenges, API key valid:', state.isApiKeyValid);
        
        let challenges = [];
        
        // Try to fetch challenges from API
        if (state.apiKey && state.isApiKeyValid) {
          try {
            console.log('Attempting to fetch challenges from API');
            challenges = await fetchChallenges(state.apiKey);
            console.log('Fetched challenges from API:', challenges ? challenges.length : 0);
            
            // Verify challenges data
            if (!challenges || !Array.isArray(challenges) || challenges.length === 0) {
              console.warn('API returned invalid challenges data, using fallback');
              challenges = [...localChallengesData];
            }
          } catch (apiError) {
            console.error('API error when fetching challenges:', apiError);
            // Fallback to local data if API fails
            challenges = [...localChallengesData];
          }
        } else {
          console.log('No valid API key, using fallback challenge data');
          challenges = [...localChallengesData];
        }
        
        // Store challenges in localStorage
        localStorage.setItem('challenges', JSON.stringify(challenges));
        console.log('Stored challenges in localStorage, count:', challenges.length);
        
        commit('setChallenges', challenges);
        return true;
      } catch (error) {
        console.error('Error in fetchChallenges action:', error);
        commit('setError', 'Failed to fetch challenges. Using local data instead.');
        
        // Ensure we always have challenges data
        commit('setChallenges', localChallengesData);
        localStorage.setItem('challenges', JSON.stringify(localChallengesData));
        
        return false;
      } finally {
        commit('setLoading', false);
      }
    },
    
    async validateApiKey({ commit }, apiKey) {
      try {
        commit('setLoading', true);
        
        // Validate the API key
        const isValid = await validateApiKey(apiKey);
        
        commit('setApiKey', apiKey);
        commit('setApiKeyValidity', isValid);
        
        return isValid;
      } catch (error) {
        console.error('Error validating API key:', error);
        commit('setError', 'Failed to validate API key. Please try again.');
        commit('setApiKeyValidity', false);
        return false;
      } finally {
        commit('setLoading', false);
      }
    },
    
    async completeChallenge({ commit, state }, day) {
      await updateProgress(state.apiKey, { day, completed: true });
      commit('completeDay', day);
    },
    
    async updateTaskStatus({ commit, state }, { day, taskId, completed }) {
      commit('updateTaskStatus', { day, taskId, completed });
    },
    
    async initializeUser({ commit, dispatch, state }) {
      if (state.apiKey) {
        try {
          const isValid = await validateApiKey(state.apiKey);
          commit('setApiKeyValidity', isValid);
          
          if (isValid) {
            await dispatch('fetchChallenges');
          }
        } catch (error) {
          console.error('Error initializing user:', error);
        }
      }
    },
    
    async startOver({ commit }) {
      commit('clearAllData');
    },

    addFavoritePrompt({ commit }, prompt) {
      commit('addFavoritePrompt', prompt);
    },

    removeFavoritePrompt({ commit }, promptId) {
      commit('removeFavoritePrompt', promptId);
    },

    showNotification({ commit }, { message, type, timeout = 3000 }) {
      commit('setNotification', { message, type });
      setTimeout(() => {
        commit('clearNotification');
      }, timeout);
    }
  }
})

export default store