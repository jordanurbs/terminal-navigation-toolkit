import { createStore } from 'vuex'
import { fetchChallenges, updateProgress, getProgress, validateApiKey } from './utils/api'

// Fallback to local data if API fails
const localChallengesData = [
  {
    day: 1,
    title: "Sample Challenge",
    description: "This is a placeholder challenge until API data is loaded",
    tasks: [{ id: 1, description: "Sample task" }],
    commands: [{ command: "echo 'hello'", explanation: "Sample command" }],
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
      isSetupComplete: localStorage.getItem('setupComplete') === 'true'
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
      console.log('First challenge:', challenges[0]);
      state.challenges = challenges;
      console.log('Updated state challenges length:', state.challenges.length);
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

      // Reset current day
      state.currentDay = 1;
      localStorage.setItem('current_day', '1');
    }
  },
  actions: {
    async loadLocalChallenges({ commit }) {
      try {
        // Get challenges from localStorage
        const storedChallenges = localStorage.getItem('challenges');
        if (storedChallenges) {
          const challenges = JSON.parse(storedChallenges);
          commit('setChallenges', challenges);
          return true;
        } else {
          // If no challenges in localStorage, use fallback data
          commit('setChallenges', localChallengesData);
          return false;
        }
      } catch (error) {
        console.error('Error loading local challenges:', error);
        commit('setChallenges', localChallengesData);
        return false;
      }
    },
    
    async completeSetup({ commit, dispatch }, apiKey) {
      try {
        commit('setApiKey', apiKey);
        commit('setApiKeyValid', true);
        commit('setSetupComplete', true);
        return true;
      } catch (error) {
        console.error('Error completing setup:', error);
        return false;
      }
    },
    
    async fetchChallenges({ commit, state }) {
      commit('setLoading', true)
      commit('setError', null)
      
      try {
        // If setup is complete, only use local data
        if (state.isSetupComplete) {
          await dispatch('loadLocalChallenges');
          commit('setLoading', false);
          return;
        }

        // Only try API fetch if we have an API key and setup isn't complete
        if (state.apiKey) {
          const storedKey = localStorage.getItem('apiKey');
          if (storedKey && storedKey !== state.apiKey) {
            commit('setApiKey', storedKey);
          }
          
          const result = await fetchChallenges();
          
          if (result.success && result.data && result.data.length > 0) {
            commit('setChallenges', result.data);
            commit('setApiKeyValidity', true);
            commit('setLoading', false);
            return;
          }
        }
        
        // Fallback to local data
        commit('setChallenges', localChallengesData || []);
      } catch (error) {
        console.error('Error fetching challenges:', error);
        commit('setError', 'Failed to fetch challenges. Using local data as fallback.');
        commit('setChallenges', localChallengesData || []);
      } finally {
        commit('setLoading', false);
      }
    },
    
    async validateApiKey({ commit }, apiKey) {
      commit('setLoading', true);
      commit('setError', null);
      
      try {
        const isValid = await validateApiKey(apiKey);
        
        if (isValid) {
          commit('setApiKey', apiKey);
          commit('setApiKeyValidity', true);
          return true;
        } else {
          commit('setApiKeyValidity', false);
          return false;
        }
      } catch (error) {
        console.error('Error validating API key:', error);
        commit('setApiKeyValidity', false);
        return false;
      } finally {
        commit('setLoading', false);
      }
    },
    
    async completeChallenge({ commit, state }, day) {
      commit('completeDay', day);
    },
    
    async updateTaskStatus({ commit, state }, { day, taskId, completed }) {
      commit('updateTaskStatus', { day, taskId, completed });
    },
    
    async initializeUser({ commit, dispatch, state }) {
      // Set initial user state
      commit('setCurrentDay', 1);
      commit('setCompletedDays', []);
      commit('setAllTaskStatus', {});
      commit('setCaptainsLog', {});
      
      // Load challenges from local storage
      await dispatch('loadLocalChallenges');
    },
    
    async startOver({ commit }) {
      try {
        commit('clearAllData');
        return true;
      } catch (error) {
        console.error('Error starting over:', error);
        return false;
      }
    }
  }
})

export default store