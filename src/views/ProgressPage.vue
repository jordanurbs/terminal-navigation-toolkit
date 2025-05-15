<template>
  <div class="progress-page">
    <div class="container">
      <h1 class="page-title">Your Progress</h1>
      <p class="page-subtitle">Track your journey through the 30-Day Challenge</p>
      
      <div class="progress-overview">
        <div class="progress-card">
          <h2>Overall Progress</h2>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
          </div>
          <p class="progress-text">{{ completedDays.length }}/30 days completed</p>
        </div>
        
        <div class="progress-card">
          <h2>Current Streak</h2>
          <div class="streak-count">{{ currentStreak }} days</div>
          <p class="streak-text" v-if="currentStreak > 0">Keep up the great work!</p>
          <p class="streak-text" v-else>Complete today's challenge to start your streak!</p>
        </div>

        <div class="progress-card">
          <h2>Commands Mastered</h2>
          <div class="command-count">{{ totalCommandsIntroduced }}</div>
          <p class="command-text">commands introduced</p>
        </div>
      </div>

      <div class="account-details">
        <h2>My Account Details</h2>
        <div class="account-card">
          <div class="account-field">
            <label>API Key</label>
            <div class="api-key-display">
              <code>{{ apiKey }}</code>
              <button @click="copyApiKey" class="copy-button" title="Copy API Key">
                📋
              </button>
            </div>
          </div>
          <p class="purchase-link" style="margin-top: 1rem; color: #333; font-size:.8em">
          Don't have an API key? <a href="https://ccc.ai-captains.com/" target="_blank" rel="noopener noreferrer">Purchase one here</a>
        </p>
        </div>

      </div>

      <div class="start-over-section">
        <button @click="confirmStartOver" class="start-over-button">
          Reset Progress
        </button>
        <p class="purchase-link" style="margin-top: 1rem; color: #333; font-size:.8em">
        (Do this if you need to update the challenge tasks.)</p>
      </div>
      
      <div class="challenge-list">
        <h2>Challenge Progress</h2>
        <div class="challenge-grid">
          <div 
            v-for="day in 30" 
            :key="day"
            class="challenge-card"
            :class="{
              'completed': isCompleted(day),
              'current': currentDay === day,
              'locked': day > currentDay
            }"
          >
            <div class="day-number">Day {{ day }}</div>
            <div class="challenge-status">
              <template v-if="isCompleted(day)">
                <span class="status-icon">✓</span>
                <span class="status-text">Completed</span>
              </template>
              <template v-else-if="currentDay === day">
                <span class="status-icon">▶</span>
                <span class="status-text">Current</span>
              </template>
              <template v-else>
                <span class="status-icon">🔒</span>
                <span class="status-text">Locked</span>
              </template>
            </div>
            <!-- Add Captain's Log entry if it exists -->
            <div v-if="captainsLog[day]" class="challenge-log">
              <div class="log-title">Captain's Log</div>
              <div class="log-content">{{ captainsLog[day] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ProgressPage',
  computed: {
    ...mapGetters([
      'completedDays',
      'completedCommands',
      'captainsLog',
      'progressPercentage',
      'getTaskStatus'
    ]),
    ...mapState({
      currentDay: state => state.currentDay,
      challenges: state => state.challenges,
      apiKey: state => state.apiKey
    }),
    currentStreak() {
      if (!this.completedDays.length) return 0;
      
      const sortedDays = [...this.completedDays].sort((a, b) => a - b);
      let streak = 1;
      
      for (let i = sortedDays.length - 1; i > 0; i--) {
        if (sortedDays[i] - sortedDays[i - 1] === 1) {
          streak++;
        } else {
          break;
        }
      }
      
      return streak;
    },
    totalCommandsIntroduced() {
      // Get all unique commands introduced up to current day
      const uniqueCommands = new Set();
      this.challenges
        .filter(challenge => challenge.day <= this.currentDay)
        .forEach(challenge => {
          challenge.commands.forEach(cmd => {
            uniqueCommands.add(cmd.command);
          });
        });
      return uniqueCommands.size;
    },
    hasNotes() {
      return Object.keys(this.captainsLog).length > 0;
    }
  },
  methods: {
    isCompleted(day) {
      return this.completedDays.includes(day);
    },
    getChallengeForDay(day) {
      return this.challenges.find(challenge => challenge.day === day);
    },
    async confirmStartOver() {
      if (confirm('Are you sure you want to start over? This will clear all your progress and require you to enter your API key again.')) {
        await this.$store.dispatch('startOver');
        this.$router.push('/');
      }
    },
    copyApiKey() {
      navigator.clipboard.writeText(this.apiKey)
        .then(() => {
          // You could add a toast notification here if desired
          alert('API Key copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy API key:', err);
        });
    }
  }
}
</script>

<style scoped>
.progress-page {
  padding: 2rem 0;
}

.page-title {
  text-align: center;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  text-align: center;
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

.progress-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.progress-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.progress-card h2 {
  color: var(--primary);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.progress-bar {
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background-color: var(--accent);
  transition: width 0.3s ease;
}

.progress-text {
  color: var(--text-light);
  margin: 0;
  font-size: 1.1rem;
}

.streak-count, .command-count {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.streak-text, .command-text {
  color: var(--text-light);
  margin: 0;
}

.start-over-section {
  text-align: center;
  margin: 2rem 0;
}

.start-over-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-over-button:hover {
  background-color: #c82333;
}

.challenge-list {
  margin-bottom: 3rem;
}

.challenge-list h2 {
  text-align: center;
  color: var(--primary);
  margin-bottom: 1.5rem;
}

.challenge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.challenge-card {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.challenge-card.completed {
  border-color: var(--success);
}

.challenge-card.current {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.challenge-card.locked {
  opacity: 0.7;
}

.day-number {
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.challenge-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.status-icon {
  font-size: 1.1rem;
}

.status-text {
  font-size: 0.875rem;
  color: var(--text-light);
}

.challenge-log {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.log-title {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.log-content {
  font-style: italic;
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.4;
  background-color: #f8fafc;
  padding: 0.75rem;
  border-radius: 4px;
}

.account-details {
  margin: 2rem 0;
}

.account-details h2 {
  text-align: center;
  color: var(--primary);
  margin-bottom: 1rem;
}

.account-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;
}

.account-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.account-field label {
  font-weight: 600;
  color: var(--text-light);
}

.api-key-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #f8fafc;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}

.api-key-display code {
  font-family: 'JetBrains Mono', monospace;
  color: var(--primary);
  flex: 1;
  word-break: break-all;
}

.copy-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  transition: transform 0.2s;
}

.copy-button:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .progress-overview {
    grid-template-columns: 1fr;
  }
  
  .challenge-grid {
    grid-template-columns: 1fr;
  }
  
  .challenge-card {
    margin: 0 1rem;
  }
}
</style>