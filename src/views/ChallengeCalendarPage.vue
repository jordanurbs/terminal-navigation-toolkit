<template>
  <div class="challenge-calendar-page">
    <div class="container">
      <h1 class="page-title">30-Day Content Commander</h1>
      <p class="page-subtitle">From Intimidation to Mastery</p>
      
      <!-- Installation Screen -->
      <div v-if="!isSetupComplete" class="setup-section">
        <InstallationScreen @setup-complete="onSetupComplete" />
      </div>
      
      <!-- User onboarding section -->
      <div v-else-if="!userName" class="onboarding-section">
        <h2>Begin Your Command Line Journey</h2>
        <p>Enter your name to start the 30-day challenge and track your progress.</p>
        <div class="name-input-group">
          <input 
            type="text" 
            v-model="newUserName" 
            placeholder="Your Name" 
            class="name-input"
            @keyup.enter="startJourney"
          >
          <button @click="startJourney" class="start-button">Start Journey</button>
        </div>
      </div>
      
      <!-- Challenge calendar section -->
      <div v-else class="challenge-calendar">
        <!-- Progress and milestone tracker -->
        <div class="progress-section">
          <div class="progress-container">
            <div class="progress-stats">
              <div class="progress-percentage">
                <div class="percentage-circle">
                  <svg viewBox="0 0 36 36" class="circular-chart">
                    <path class="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path class="circle"
                      :stroke-dasharray="`${progressPercentage}, 100`"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" class="percentage">{{ progressPercentage }}%</text>
                  </svg>
                </div>
                <div class="progress-text">
                  <h3>Your Progress</h3>
                  <p>{{ completedDays.length }}/30 days completed</p>
                </div>
              </div>
              <div class="next-milestone">
                <h3>Next Milestone</h3>
                <p v-if="daysUntilNextMilestone > 0">
                  {{ daysUntilNextMilestone }} days until 
                  <span class="milestone-name">{{ getMilestoneTitle(nextMilestone) }}</span>
                </p>
                <p v-else class="all-complete">All milestones completed!</p>
              </div>
            </div>
          </div>
          
          <div class="milestone-tracker">
            <div 
              v-for="milestone in milestones" 
              :key="milestone.day"
              :class="['milestone-marker', completedDays.includes(milestone.day) ? 'completed' : '']"
            >
              <div class="milestone-dot"></div>
              <div class="milestone-info">
                <div class="milestone-day">Day {{ milestone.day }}</div>
                <div class="milestone-reward">{{ milestone.reward }}</div>
              </div>
            </div>
            <div class="milestone-line"></div>
          </div>
        </div>
        
        <!-- Week selector -->
        <div class="week-selector">
          <button 
            v-for="week in 4" 
            :key="week"
            :class="['week-button', currentWeek === week ? 'active' : '']"
            @click="setCurrentWeek(week)"
          >
            Week {{ week }}
          </button>
        </div>
        
        <!-- Current week theme -->
        <div v-if="currentWeekTheme" class="week-theme">
          <h2>{{ currentWeekTheme.theme }}</h2>
          <p>{{ currentWeekTheme.description }}</p>
        </div>

        <!-- Completion notes -->
        <div class="completion-notes">
          <h3>Quick Tips:</h3>
          <ul class="tips-list">
            <li>
              <span class="tip-icon">💡</span>
              <span class="tip-text">Check each task's box to move to the next day</span>
            </li>
            <li>
              <span class="tip-icon">📝</span>
              <span class="tip-text">When you see {item1,item2,item3}, run the command once for each item</span>
            </li>
          </ul>
        </div>
        
        <!-- Challenge cards -->
        <div class="challenge-grid">
          <div 
            v-for="challenge in challengesForCurrentWeek" 
            :key="challenge.day"
            :data-day="challenge.day"
            :class="['challenge-card', 
              completedDays.includes(challenge.day) ? 'completed' : '',
              !isTaskAvailable(challenge.day) ? 'locked' : '',
              challenge.is_milestone ? 'milestone' : ''
            ]"
          >
            <div class="challenge-day">Day {{ challenge.day }}</div>
            <h3 class="challenge-title">{{ challenge.title }}</h3>
            <p class="challenge-description">{{ challenge.description }}</p>
            
            <!-- Additional Challenge Information -->
            <div class="challenge-details">
              <div v-if="challenge.theme" class="detail-item">
                <span class="detail-label">Theme:</span>
                <span class="detail-value">{{ challenge.theme }}</span>
              </div>
              <div v-if="challenge.build_context" class="detail-item">
                <span class="detail-label">Build Context:</span>
                <span class="detail-value">{{ challenge.build_context }}</span>
              </div>
              <div v-if="challenge.practical_use" class="detail-item">
                <span class="detail-label">Practical Use:</span>
                <span class="detail-value">{{ challenge.practical_use }}</span>
              </div>
              <div v-if="challenge.business_value" class="detail-item">
                <span class="detail-label">Business Value:</span>
                <span class="detail-value">{{ challenge.business_value }}</span>
              </div>
            </div>
            
            <!-- Task list -->
            <div v-if="isTaskAvailable(challenge.day)" class="task-list">
              <div 
                v-for="task in challenge.tasks" 
                :key="task.id"
                class="task-item"
              >
                <label class="task-checkbox">
                  <input 
                    type="checkbox" 
                    :checked="getTaskStatus(challenge.day, task.id)"
                    @change="updateTaskStatus(challenge.day, task.id, $event.target.checked)"
                  >
                  <span class="checkmark"></span>
                </label>
                <span class="task-description">{{ task.description }}</span>
              </div>
            </div>
            
            <!-- Challenge commands -->
            <div v-if="isTaskAvailable(challenge.day)" class="command-list">
              <h4>Commands to Learn:</h4>
              <div 
                v-for="(cmd, index) in challenge.commands" 
                :key="index"
                class="command-item"
              >
                <code>{{ cmd.command }}</code>
                <span class="command-explanation">{{ cmd.explanation }}</span>
              </div>
            </div>
            
            <!-- Captain's Log -->
            <div v-if="isTaskAvailable(challenge.day)" class="captains-log">
              <h4>Captain's Log</h4>
              <textarea 
                :value="captainsLog[challenge.day]"
                @input="saveLogEntry(challenge.day, $event.target.value)"
                placeholder="Record your thoughts and learnings..."
              ></textarea>
            </div>
            
            <!-- Milestone reward -->
            <div v-if="challenge.is_milestone" class="milestone-reward">
              <span class="reward-label">Reward:</span>
              <span class="reward-name">{{ getMilestoneReward(challenge.day) }}</span>
            </div>

            <!-- Day Navigation -->
            <div class="day-navigation">
              <button 
                v-if="challenge.day < 30 && challenge.day === currentDay"
                @click="moveToNextDay(challenge.day)"
                class="nav-button next-button"
                :disabled="!allTasksCompleted(challenge)"
              >
                Next Day →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ApiKeyInput from '../components/ApiKeyInput.vue'
import InstallationScreen from '@/components/InstallationScreen.vue'

export default {
  name: 'ChallengeCalendarPage',
  components: {
    ApiKeyInput,
    InstallationScreen
  },
  created() {
    // Load challenges when component is created
    if (this.isSetupComplete) {
      this.$store.dispatch('loadLocalChallenges');
    }
  },
  data() {
    return {
      newUserName: '',
      currentWeek: 1,
      weeklyThemes: [
        {
          week: 1,
          theme: "Navigation Fundamentals",
          description: "Building your sea legs"
        },
        {
          week: 2,
          theme: "Git & Project Building",
          description: "Learning to navigate the currents"
        },
        {
          week: 3,
          theme: "Automation & Programming",
          description: "Taking control of the ship"
        },
        {
          week: 4,
          theme: "Advanced Integration & AI Tools",
          description: "Becoming the captain"
        }
      ],
      milestones: [
        {
          day: 7,
          reward: "Navigation Expert Badge"
        },
        {
          day: 14,
          reward: "File Processing Expert Badge"
        },
        {
          day: 21,
          reward: "Automation Expert Badge"
        },
        {
          day: 30,
          reward: "AI Captain Certification"
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'completedDays',
      'currentChallenge', 
      'progressPercentage',
      'nextMilestone',
      'daysUntilNextMilestone',
      'captainsLog',
      'getTaskStatus',
      'isAuthenticated'
    ]),
    ...mapState({
      userName: state => state.user.name,
      isSetupComplete: state => state.isSetupComplete,
      challenges: state => state.challenges
    }),
    currentDay() {
      return this.$store.state.currentDay;
    },
    challengesForCurrentWeek() {
      return this.challenges.filter(challenge => Math.ceil(challenge.day / 7) === this.currentWeek);
    },
    currentWeekTheme() {
      return this.weeklyThemes.find(theme => theme.week === this.currentWeek);
    }
  },
  methods: {
    startJourney() {
      if (this.newUserName.trim()) {
        this.$store.commit('setUserName', this.newUserName.trim());
        this.$store.dispatch('initializeUser');
      }
    },
    setCurrentWeek(week) {
      this.currentWeek = week;
    },
    isTaskAvailable(day) {
      return day <= this.currentDay;
    },
    updateTaskStatus(day, taskId, completed) {
      this.$store.dispatch('updateTaskStatus', { day, taskId, completed });
    },
    allTasksCompleted(challenge) {
      return challenge.tasks.every(task => 
        this.getTaskStatus(challenge.day, task.id)
      );
    },
    completeChallenge(day) {
      this.$store.dispatch('completeChallenge', day);
    },
    saveLogEntry(day, note) {
      this.$store.commit('addLogEntry', { day, note });
    },
    getMilestoneReward(day) {
      const milestone = this.milestones.find(m => m.day === day);
      return milestone ? milestone.reward : 'Milestone Reward';
    },
    getMilestoneTitle(day) {
      const milestone = this.milestones.find(m => m.day === day);
      return milestone ? milestone.reward : 'Next Milestone';
    },
    async onSetupComplete() {
      // Load challenges from local storage if needed
      if (!this.challenges.length) {
        await this.$store.dispatch('loadLocalChallenges');
      }
    },
    moveToNextDay(currentDay) {
      // Complete the current day if not already completed
      if (!this.completedDays.includes(currentDay)) {
        this.$store.commit('completeDay', currentDay);
      }
      
      const nextDay = currentDay + 1;
      // Update the current day in the store
      this.$store.commit('setCurrentDay', nextDay);
      // Calculate which week the next day is in
      const targetWeek = Math.ceil(nextDay / 7);
      // Set the current week if different
      if (this.currentWeek !== targetWeek) {
        this.currentWeek = targetWeek;
      }
      // Scroll the next day into view
      this.$nextTick(() => {
        const targetCard = document.querySelector(`[data-day="${nextDay}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },
    navigateToDay(day) {
      // Calculate which week the target day is in
      const targetWeek = Math.ceil(day / 7);
      // Set the current week if different
      if (this.currentWeek !== targetWeek) {
        this.currentWeek = targetWeek;
      }
      // Scroll the target day into view
      this.$nextTick(() => {
        const targetCard = document.querySelector(`[data-day="${day}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }
}
</script>

<style scoped>
.challenge-calendar-page {
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

.completion-notes {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid var(--primary);
}

.completion-notes h3 {
  color: var(--primary);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.tips-list li:last-child {
  margin-bottom: 0;
}

.tip-icon {
  flex-shrink: 0;
  margin-right: 0.75rem;
  font-size: 1.1rem;
}

.tip-text {
  font-size: 1rem;
  line-height: 1.5;
}

/* Progress and milestone tracker styles */
.progress-section {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.progress-percentage {
  display: flex;
  align-items: center;
}

.percentage-circle {
  width: 100px;
  height: 100px;
  margin-right: 1.5rem;
}

.circular-chart {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 3.8;
  stroke: var(--primary);
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.percentage {
  fill: var(--primary);
  font-size: 0.5em;
  text-anchor: middle;
  font-weight: bold;
}

.progress-text h3 {
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.progress-text p {
  color: var(--text-light);
  font-size: 1.1rem;
}

.next-milestone h3 {
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.next-milestone p {
  color: var(--text-light);
  font-size: 1.1rem;
}

.milestone-name {
  color: #f39c12;
  font-weight: bold;
}

.all-complete {
  color: #27ae60 !important;
  font-weight: bold;
}

.milestone-tracker {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 2rem;
}

.milestone-line {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #e2e8f0;
  z-index: 1;
}

.milestone-marker {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
}

.milestone-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e2e8f0;
  border: 3px solid white;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.milestone-marker.completed .milestone-dot {
  background-color: #f39c12;
}

.milestone-info {
  text-align: center;
}

.milestone-day {
  font-weight: bold;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.milestone-reward {
  font-size: 0.8rem;
  color: var(--text-light);
}

/* Existing styles */
.onboarding-section {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.name-input-group {
  display: flex;
  margin-top: 1.5rem;
}

.name-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.start-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-button:hover {
  background-color: var(--primary-dark);
}

.week-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.week-button {
  padding: 0.5rem 1.5rem;
  margin: 0 0.5rem;
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.week-button.active {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.week-theme {
  text-align: center;
  margin-bottom: 2rem;
}

.week-theme h2 {
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.challenge-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.challenge-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.challenge-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.challenge-card.completed {
  border-left: 4px solid #48bb78;
}

.challenge-card.locked {
  opacity: 0.7;
  pointer-events: none;
}

.challenge-card.milestone {
  border: 2px solid #f6b93b;
}

.challenge-day {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--primary);
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.challenge-title {
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.challenge-description {
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.task-list {
  margin-bottom: 1.5rem;
}

.task-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.task-checkbox {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.task-checkbox input {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

.task-checkbox input:checked ~ .checkmark {
  background-color: var(--primary);
  border-color: var(--primary);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.task-checkbox input:checked ~ .checkmark:after {
  display: block;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.command-list {
  margin-bottom: 1.5rem;
}

.command-list h4 {
  margin-bottom: 0.75rem;
  color: var(--primary);
}

.command-item {
  margin-bottom: 0.5rem;
}

.command-item code {
  display: block;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-family: monospace;
  margin-bottom: 0.25rem;
}

.command-explanation {
  display: block;
  font-size: 0.875rem;
  color: var(--text-light);
}

.captains-log {
  margin-bottom: 1.5rem;
}

.captains-log h4 {
  margin-bottom: 0.75rem;
  color: var(--primary);
}

.captains-log textarea {
  width: calc(100% - 1.5rem);
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  resize: vertical;
}

.complete-button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.complete-button:hover {
  background-color: var(--primary-dark);
}

.milestone-reward {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fef9e7;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.reward-label {
  font-weight: bold;
  margin-right: 0.5rem;
}

.reward-name {
  color: #f39c12;
}

.day-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  background-color: var(--secondary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 1;
}

.nav-button:hover {
  background-color: #2c8c89;
}

.prev-button {
  background-color: var(--text-light);
}

.prev-button:hover {
  background-color: #5a6268;
}

.next-button {
  background-color: var(--accent);
  color: var(--primary);
}

.next-button:hover {
  background-color: #e5a92e;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--text-light);
  color: white;
}

.nav-button:disabled:hover {
  background-color: var(--text-light);
}

@media (max-width: 768px) {
  .progress-stats {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .progress-percentage {
    margin-bottom: 1.5rem;
  }
  
  .milestone-tracker {
    overflow-x: auto;
    padding-bottom: 1rem;
  }
  
  .name-input-group {
    flex-direction: column;
  }
  
  .name-input {
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .start-button {
    border-radius: 4px;
  }
  
  .week-selector {
    flex-wrap: wrap;
  }
  
  .week-button {
    margin-bottom: 0.5rem;
  }
  
  .challenge-grid {
    grid-template-columns: 1fr;
  }
}

.auth-section {
  margin-bottom: 2rem;
}

.challenge-details {
  margin: 1rem 0;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.detail-item {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-weight: 600;
  color: #2c8c89;
  font-size: 0.9rem;
}

.detail-value {
  color: #8892b0;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>