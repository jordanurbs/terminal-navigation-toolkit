<template>
  <div class="challenge-calendar-page">
    <div class="container">
      <h1 class="page-title">30-Day Content Commander Challenge</h1>
      <p class="page-subtitle">Build Your Own AI-Powered Content Creation App... from the terminal!</p>
      
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
          <button @click.prevent="startJourney" class="start-button">Start Journey</button>
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
                  <button 
                    v-if="hasLogEntries"
                    class="download-logs-btn"
                    @click="downloadCaptainsLogs"
                  >
                    📝 Download Captain's Log
                  </button>
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
        
        <!-- Info sections row -->
        <div class="info-sections-container">
          <div class="info-sections-header">
            <h3>Getting Started Guide + Video Overview</h3>
            <button 
              class="toggle-button"
              @click="toggleInfoSections"
            >
              {{ showInfoSections ? 'Hide Guide' : 'Show Guide' }}
            </button>
          </div>
       
          <div v-show="showInfoSections" class="info-sections">
            <div class="info-block">
              <div class="info-block-content tips-section">
              <h4>What are we building?</h4>
             
                <p class="setup-text">We're building an app that will help you organize your content ideas and use an AI to generate content from those ideas.</p>
                <p class="setup-text">In the spirit of the challenge, this entire app will run in the command line.</p>
              </div>
            
              <div class="info-block-content">
              <div class="tips-section">
                <h4>Using This App</h4>
                <ul class="tips-list">
                  <li>
                    <span class="tip-icon">💡</span>
                    <span class="tip-text">Check each task's box to move to the next day</span>
                  </li>
                  <li>
                    <span class="tip-icon">💾</span>
                    <span class="tip-text">Your progress and notes are saved in your browser. If you clear your cache, you'll lose your progress until you enter your API key again.</span>
                  </li>
                  <li>
                    <span class="tip-icon">🔧</span>
                    <span class="tip-text">Check the troubleshooting page if you want to learn why things might be going wrong (otherwise just ask the agent in Cursor!)</span>
                  </li>
                  <li>
                    <span class="tip-icon">⚙️</span>
                    <span class="tip-text">This project assumes you've already installed node and git from the Command Line Bootcamp. If you haven't, be sure to.</span>
                  </li>
                </ul>
              </div>

              <div class="tips-section">
                <h4>Building Tips</h4>
                <ul class="tips-list">
                  <li>
                    <span class="tip-icon">📝</span>
                    <span class="tip-text">When you see {item1,item2,item3}, that means you need to run the command once for each item</span>
                  </li>
                  <li>
                    <span class="tip-icon">📋</span>
                    <span class="tip-text">You can always copy the full code from the 'Expected Outputs' section to see exactly what you should be seeing</span>
                  </li>
                  <li>
                    <span class="tip-icon">🤖</span>
                    <span class="tip-text">If something isn't working right, don't fret. The Cursor AI agent can help you, just copy and paste the relevant code or error message into it and ask what's going wrong.</span>
                  </li>
                  <li>
                    <span class="tip-icon">⌨️</span>
                    <span class="tip-text">I always recommend typing out the full command so you can get comfortable. Only copy and paste the long bits of code!</span>
                  </li>
                  <li>
                    <span class="tip-icon">↩️</span>
                    <span class="tip-text">Need to undo your last commit, or revert back? Check the <a href="/cheatsheet">Command Cheat Sheet</a> to see how to do it using git.</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
            <!-- Setup section -->
            <div class="setup-section">
  
              <h3 style="margin-top: 1rem;">How to get set up:</h3>
             <p class="setup-text">Since we are working towards building with AI, here's what I recommend:</p>
                <ul class="setup-list">
                  <li>1. Download and install <a href="https://www.cursor.com/" target="_blank" rel="noopener noreferrer" class="cursor-link">Cursor</a> with a free account</li>
                  <li>2. Create a new directory on your computer for this project (i.e. 'challenge')</li>
                  <li>3. Open that directory in Cursor</li>
                  <li>4. Open the Terminal in Cursor <em>(Terminal > New Terminal)</em></li>
                  <li>5. From there, follow the instructions in each day's challenge to build inside the Cursor interface</li>
                </ul>
                  <p class="setup-text">This will help you get comfortable with Cursor... plus you can even use the built-in AI Agent to ask questions as you work through this challenge!</p>
            
                <p class="setup-text">
                  <em>NOTE: You can obviously try building all this in the basic command line terminal (if you want super hardcore mode), but it's not necessary.</em></p>
                  <h3 style="margin-top: 1rem;">WINDOWS USERS:</h3>
             <p class="setup-text">The command line can be a bit different on Windows, and I've tried to keep that in mind. Even so, here are some notes to keep in mind:</p>
             <ul class="setup-list">
                  <li>• There are several types of command line terminals on Windows. I recommend simply using the terminal on Cursor, but if you don't, I suggest 'Windows Terminal'.</li>
                  <li>• 'mkdir' is 'md' on Windows, but depending on your version of Windows, you may need to use 'mkdir' instead. Don't ask my why.</li>
                  <li>• On Windows, 'cd' is both the command to see your current directory, and the command to change your directory. This is confusing, I know. Just remember that 'cd' is to see where you're at, and 'cd /challenge' or 'cd ../' is the command to change directories ('.. takes you up a level').</li>
                </ul>
                Godspeed.
            </div>

            
                     <!-- Video overview -->
                     <div class="video-overview">
                      <h3>Watch This Before You Start: </h3>
              <div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1080334862?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="CCC Overview"></iframe></div>
            </div>
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
            <div class="task-description" v-if="showInfoSections">
              <div v-html="formatTaskDescription(challenge.description)"></div>
            </div>
            
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
                <span class="detail-value">{{ formatOutput(challenge.business_value) }}</span>
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
                <span class="task-description" v-html="formatTaskDescription(task.description)"></span>
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
            
            <!-- Expected Outputs -->
            <div v-if="isTaskAvailable(challenge.day) && challenge.expected_outputs" class="expected-outputs">
              <h4>Expected Outputs:</h4>
              <div 
                v-for="(output, command) in challenge.expected_outputs" 
                :key="command"
                class="output-item"
              >
                <span class="output-command">{{ command }}:</span>
                <span class="output-value">{{ formatOutput(output) }}</span>
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

            <!-- Complete Challenge Button -->
            <div v-if="challenge.day === 30" class="complete-challenge-container">
              <button 
                class="complete-challenge-btn"
                @click="completeEntireChallenge"
              >
                🎉 Complete Challenge
              </button>
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

  <!-- Help Toggle -->
  <div class="help-toggle">
    <div v-if="isAuthenticated && !showHelp && !showChatMinimized" class="jax-chat-trigger" @click="toggleHelp">
      <div class="jax-avatar-container">
        <img src="/images/jax.png" alt="JAX Avatar" class="jax-avatar" />
      </div>
      <div class="jax-chat-label">
        <span class="jax-chat-title">Ask Captain JAX</span>
        <span class="jax-chat-subtitle">Command Line Expert</span>
      </div>
    </div>
    <ChatModal :visible="showHelp" @close="toggleHelp" @minimize="minimizeChat">
      <div class="jax-chat-ui" style="display: flex; flex-direction: column; height: 100%;">
        <div class="jax-chat-history" style="flex: 1; overflow-y: auto; margin-bottom: 1rem; padding-right: 4px;">
          <div v-for="(msg, idx) in chatMessages" :key="idx" :class="['jax-chat-message', msg.sender]" style="margin-bottom: 0.75rem;">
            <div v-if="msg.sender === 'jax'" style="display: flex; align-items: flex-start;">
              <img src='/images/jax.png' alt='JAX' style='width: 28px; height: 28px; border-radius: 50%; margin-right: 0.5rem;' />
              <div class="jax-bubble" style="background: #f0f7ff; color: #2c3e50; border-radius: 12px 12px 12px 4px; padding: 0.75rem 1rem; max-width: 80%; font-size: 1rem;" v-html="formatChatMarkdown(msg.text)"></div>
            </div>
            <div v-else style="display: flex; justify-content: flex-end; align-items: flex-start;">
              <div class="user-bubble" style="background: #2c8c89; color: #fff; border-radius: 12px 12px 4px 12px; padding: 0.75rem 1rem; max-width: 80%; font-size: 1rem; margin-left: auto;" v-html="formatChatMarkdown(msg.text)"></div>
            </div>
          </div>
        </div>
        <form class="jax-chat-input-row" style="display: flex; gap: 0.5rem;" @submit.prevent="sendChatMessage">
          <input v-model="chatInput" type="text" placeholder="Type your message..." style="flex: 1; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 1rem;" />
          <button type="submit" style="background: #2c8c89; color: #fff; border: none; border-radius: 8px; padding: 0.75rem 1.25rem; font-size: 1rem; cursor: pointer;">Send</button>
        </form>
      </div>
    </ChatModal>
    <div v-if="isAuthenticated && showChatMinimized" class="jax-chat-minimized-bar" @click="restoreChat">
      <img src="/images/jax.png" alt="JAX Avatar" class="jax-mini-avatar" />
      <span class="jax-mini-label">Chat With Captain JAX</span>
    </div>
  </div>

  <!-- Scroll to top button -->
  <div class="scroll-top" v-show="showScrollTop">
    <button 
      class="scroll-top-button"
      @click="scrollToTop"
      title="Scroll to top"
    >
      ↑
    </button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ApiKeyInput from '../components/ApiKeyInput.vue'
import InstallationScreen from '@/components/InstallationScreen.vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import confetti from 'canvas-confetti'
import ChatModal from '../components/ChatModal.vue'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { gfmHeadingId } from 'marked-gfm-heading-id'

export default {
  name: 'ChallengeCalendarPage',
  components: {
    ApiKeyInput,
    InstallationScreen,
    ChatModal
  },
  created() {
    // Load challenges when component is created
    console.log('ChallengeCalendarPage created hook running');
    console.log('isSetupComplete:', this.isSetupComplete);
    
    // Always load challenges, regardless of setup status
    this.$store.dispatch('loadLocalChallenges').then(success => {
      console.log('Loaded challenges status:', success);
      console.log('Challenge count:', this.challenges.length);
      
      // If we're set up but don't have challenges, try to load them
      if (this.challenges.length === 0) {
        console.warn('No challenges loaded, forcing fallback data');
        localStorage.removeItem('challenges'); // Clear potentially corrupted data
        this.$store.dispatch('loadLocalChallenges');
      }
    }).catch(error => {
      console.error('Error loading challenges:', error);
    });
  },
  data() {
    return {
      newUserName: '',
      currentWeek: 1,
      showInfoSections: true,
      showHelp: false,
      showChatMinimized: false,
      showScrollTop: false,
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
      ],
      chatMessages: [
        { sender: 'jax', text: 'Hi! I\'m JAX. How can I help you with the Content Commander Challenge?' }
      ],
      chatInput: '',
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
      if (this.currentWeek === 4) {
        // For week 4, include all remaining days (22-30)
        return this.challenges.filter(challenge => challenge.day >= 22);
      }
      // For weeks 1-3, use the normal week calculation
      return this.challenges.filter(challenge => Math.ceil(challenge.day / 7) === this.currentWeek);
    },
    currentWeekTheme() {
      return this.weeklyThemes.find(theme => theme.week === this.currentWeek);
    },
    hasLogEntries() {
      return Object.keys(this.captainsLog).length > 0;
    }
  },
  methods: {
    startJourney() {
      if (this.newUserName.trim()) {
        console.log('Setting user name:', this.newUserName.trim());
        this.$store.commit('setUserName', this.newUserName.trim());
        this.$store.dispatch('initializeUser');
      } else {
        // If no name entered, show a notification
        console.log('No name entered');
        // Optional: Add a visual indication that a name is required
        const nameInput = document.querySelector('.name-input');
        if (nameInput) {
          nameInput.classList.add('error');
          setTimeout(() => nameInput.classList.remove('error'), 2000);
        }
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
      console.log('Setup completed, loading challenges');
      // Load challenges from local storage if needed
      if (!this.challenges.length) {
        console.log('No challenges in store, loading from localStorage');
        try {
          await this.$store.dispatch('loadLocalChallenges');
          console.log('Challenges loaded, count:', this.challenges.length);
          
          // Double check if challenges were actually loaded
          if (this.challenges.length === 0) {
            console.warn('No challenges loaded after setup completion, resetting localStorage');
            localStorage.removeItem('challenges');
            await this.$store.dispatch('loadLocalChallenges');
            console.log('Reloaded challenges, count:', this.challenges.length);
          }
        } catch (error) {
          console.error('Error loading challenges after setup completion:', error);
        }
      } else {
        console.log('Challenges already loaded in store, count:', this.challenges.length);
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
      // Scroll the next day into view, aligning with the top
      this.$nextTick(() => {
        const targetCard = document.querySelector(`[data-day="${nextDay}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    },
    toggleInfoSections() {
      this.showInfoSections = !this.showInfoSections;
    },
    toggleHelp() {
      this.showHelp = !this.showHelp;
      if (this.showHelp) this.showChatMinimized = false;
    },
    minimizeChat() {
      this.showHelp = false;
      this.showChatMinimized = true;
    },
    restoreChat() {
      this.showHelp = true;
      this.showChatMinimized = false;
    },
    formatOutput(output) {
      // Decode HTML entities before replacing newlines
      const decodeEntities = (str) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
      };
      
      return decodeEntities(output).replace(/\\n/g, '\n');
    },
    formatTaskDescription(description) {
      // First extract code blocks and store them with a unique placeholder
      const codeBlocks = [];
      let formatted = description.replace(/<code>(.*?)<\/code>/gs, (match, codeContent) => {
        const blockId = codeBlocks.length;
        // Process code block content:
        // 1. Replace <id>id</id> with <id>
        const processedContent = codeContent
          .replace(/<id>.*?<\/id>/g, '<id>');
        codeBlocks.push(processedContent);
        return `__CODE_BLOCK_${blockId}__`;
      });

      // Handle newlines in regular text (outside code blocks)
      formatted = formatted.replace(/\\n/g, '\n');

      // Remove <id> tags from regular text
      formatted = formatted.replace(/<id>.*?<\/id>/g, '');

      // Restore code blocks with copy button wrapper and highlight.js
      formatted = formatted.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
        const highlighted = hljs.highlightAuto(codeBlocks[index]).value;
        return `<span class="code-block-wrapper">
          <pre class="hljs"><code>${highlighted}</code></pre>
          <button class="copy-code-btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent)">📋</button>
        </span>`;
      });

      return formatted;
    },
    formatChatMarkdown(text) {
      // Handle JSON response format if present
      let content = text;
      try {
        // Check if the content is a JSON string
        if (text.trim().startsWith('{') && text.includes('"output"')) {
          const parsed = JSON.parse(text);
          content = parsed.output || parsed.text || parsed.message || text;
        }
      } catch (e) {
        // Not JSON, use the original text
        content = text;
      }
      
      // Decode HTML entities before processing
      const decodeEntities = (str) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
      };
      
      content = decodeEntities(content);

      // Configure marked to use extensions
      marked.use(
        gfmHeadingId(),
        markedHighlight({
          langPrefix: 'hljs language-',
          highlight: function(code, lang) {
            // Decode HTML entities in code blocks as well
            code = decodeEntities(code);
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
          }
        }),
        {
          gfm: true,
          breaks: true,
          mangle: false,
          headerIds: false
        }
      );

      // Process markdown
      const html = marked.parse(content);

      // Add copy buttons to code blocks and ensure a line break after them
      return html.replace(/<pre><code class="hljs language-(\w+)">([\s\S]*?)<\/code><\/pre>/g, 
        (match, language, code) => {
          return `<span class="code-block-wrapper">
            <pre class="hljs language-${language}"><code>${code}</code></pre>
            <button class="copy-code-btn" onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent)">📋</button>
          </span><br />`; // Added <br /> for a line break
        }
      );
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    handleScroll() {
      this.showScrollTop = window.scrollY > 300;
    },
    async completeEntireChallenge() {
      try {
        // Mark all days from 1 to 30 as completed
        const completionPromises = [];
        for (let day = 1; day <= 30; day++) {
          // Both dispatch the action and commit directly to ensure state is updated
          this.$store.commit('completeDay', day);
          completionPromises.push(this.$store.dispatch('completeDay', day));
        }
        
        // Wait for all days to be completed
        await Promise.all(completionPromises);
        
        // Update current day to 30 if it's not already
        if (this.currentDay < 30) {
          this.$store.commit('setCurrentDay', 30);
        }
        
        // Force a state update for day 30
        this.$store.commit('completeDay', 30);
        
        // Trigger confetti celebration
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);

          // Fire from the left
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });

          // Fire from the right
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });

          // Fire from the center
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 }
          });
        }, 250);

        // Show success message
        this.$toast.success('Congratulations! You\'ve completed the entire challenge! 🎉');
      } catch (error) {
        console.error('Error completing challenge:', error);
        this.$toast.error('There was an error completing the challenge. Please try again.');
      }
    },
    downloadCaptainsLogs() {
      // Create content for the log file
      let content = "Captain's Log - 30-Day Content Commander Challenge\n";
      content += "================================================\n\n";
      
      // Add user name and completion status
      content += `Commander: ${this.userName}\n`;
      content += `Progress: ${this.completedDays.length}/30 days completed\n`;
      content += `Completion Status: ${this.progressPercentage}%\n\n`;
      
      // Add each day's log entries
      for (let day = 1; day <= 30; day++) {
        const logEntry = this.captainsLog[day];
        if (logEntry && logEntry.trim()) {
          content += `Day ${day}:\n`;
          content += "--------\n";
          content += logEntry + "\n\n";
        }
      }
      
      // Create and trigger download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `captains-log-${this.userName.toLowerCase().replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      // Show success message
      this.$toast.success('Captain\'s Log downloaded successfully! 📝');
    },
    async sendChatMessage() {
      if (!this.chatInput.trim()) return;
      
      // Add user message to chat
      const userMessage = this.chatInput.trim();
      this.chatMessages.push({ sender: 'user', text: userMessage });
      this.chatInput = '';
      
      // Scroll to bottom
      this.$nextTick(() => {
        const history = document.querySelector('.jax-chat-history');
        if (history) history.scrollTop = history.scrollHeight;
      });
      
      // Add typing indicator
      const typingIndex = this.chatMessages.length;
      this.chatMessages.push({ sender: 'jax', text: '...', isTyping: true });

      // Prepare history for the API call
      const apiHistory = this.chatMessages
        .slice(0, -2) // Remove user message and typing indicator
        .filter(msg => !msg.isTyping); // Ensure no other typing indicators slip through

      // Define the n8n webhook URL - use the actual chat URL
      const webhookUrl = 'https://n8n.spirals.me/webhook/02a8e3b9-f7b6-4489-b1d5-b373e21c9e0f';
      
      try {
        // Log request details for debugging
        console.log("Attempting to connect to n8n webhook:", webhookUrl);
        
        // Format the payload to match what n8n Chat Trigger expects
        // Use a static sessionId for testing to ensure consistency
        const sessionId = 'fixed-session-id-123';
        
        // Include both sessionId and chatInput as seen in the AI Agent node
        const payload = {
          message: userMessage,
          history: apiHistory,
          sessionId: sessionId,
          chatInput: userMessage,  // The AI Agent node is looking for this
        };
        
        console.log("Sending payload with both sessionId and chatInput:", payload);
        
        // Attempt to use the real n8n webhook - properly handling CORS issues
        try {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              // Add origin explicitly to help with debugging
              'Origin': window.location.origin
            },
            body: JSON.stringify(payload),
          });
          
          console.log("Response status:", response.status);
          console.log("Response headers:", [...response.headers.entries()]);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Get response as text first to aid debugging
          const responseText = await response.text();
          console.log("Raw response:", responseText);
          
          // Check for empty response
          if (!responseText || !responseText.trim()) {
            console.warn("Received empty response from n8n");
            throw new Error("Empty response received from server");
          }
          
          // Try to parse as JSON
          let data;
          try {
            data = JSON.parse(responseText);
            console.log("Parsed JSON response:", data);
          } catch (e) {
            console.log("Response is not valid JSON, using raw text");
            data = { text: responseText };
          }
          
          // Extract the response text
          const aiReply = data.text || data.message || data.reply || responseText;
          
          // Update chat UI
          this.chatMessages.splice(typingIndex, 1);
          this.chatMessages.push({ sender: 'jax', text: aiReply });
          
        } catch (fetchError) {
          console.error("Fetch error details:", fetchError);
          
          // If CORS is the issue, try with no-cors as a fallback
          if (fetchError.message.includes("CORS")) {
            console.log("CORS issue detected, trying no-cors mode");
            
            // Make a fire-and-forget request with no-cors
            fetch(webhookUrl, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }).catch(e => console.log("Expected no-cors error:", e));
          }
          
          // Create a more specific error message based on the error
          let errorMessage = "An error occurred while connecting to the chatbot.";
          
          if (fetchError.message.includes("Empty response")) {
            errorMessage = "The server returned an empty response. Please try again in a moment.";
          } else if (fetchError.message.includes("CORS")) {
            errorMessage = "Connection issue: There was a problem connecting to the chat server. Please try refreshing the page.";
          }
          
          // Update chat UI with error info
          this.chatMessages.splice(typingIndex, 1);
          this.chatMessages.push({ 
            sender: 'jax', 
            text: errorMessage
          });
        }
      } catch (error) {
        console.error('Error in chat process:', error);
        
        // Remove typing indicator and add error message
        this.chatMessages.splice(typingIndex, 1);
        this.chatMessages.push({ 
          sender: 'jax', 
          text: "Technical error: " + error.message
        });
      }
      
      // Scroll to bottom again after response
      this.$nextTick(() => {
        const history = document.querySelector('.jax-chat-history');
        if (history) history.scrollTop = history.scrollHeight;
      });
    }
  },
  mounted() {
    // Add global click handler for copy buttons
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.copy-code-btn');
      if (!copyBtn) return;
      
      const wrapper = copyBtn.closest('.code-block-wrapper');
      if (!wrapper) return;
      
      // Get the code content from the pre>code element
      const codeElement = wrapper.querySelector('pre code');
      if (!codeElement) return;
      
      const codeText = codeElement.textContent || '';
      
      // Copy to clipboard and give feedback
      navigator.clipboard.writeText(codeText).then(() => {
        // Give visual feedback that copy was successful
        const originalText = copyBtn.innerText;
        copyBtn.innerText = '✓';
        
        // Reset after a short delay
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 1500);
      }).catch(err => {
        console.error('Failed to copy code: ', err);
      });
    });
    
    // Setup scroll detection for code blocks
    this.$nextTick(() => {
      const setupScrollFades = () => {
        document.querySelectorAll('.jax-bubble pre, .user-bubble pre').forEach(pre => {
          // Check if this pre element already has a scroll listener
          if (pre.hasScrollListener) return;
          
          // Setup scroll detection
          const checkScroll = () => {
            const hasVerticalScroll = pre.scrollHeight > pre.clientHeight;
            const isScrolledToBottom = pre.scrollHeight - pre.scrollTop - pre.clientHeight < 5;
            
            // Toggle the fade indicator
            const fadeEl = pre.querySelector('::after');
            if (fadeEl) {
              if (hasVerticalScroll && !isScrolledToBottom) {
                pre.classList.add('has-more-content');
              } else {
                pre.classList.remove('has-more-content');
              }
            }
          };
          
          // Initialize
          checkScroll();
          
          // Add event listener
          pre.addEventListener('scroll', checkScroll);
          pre.hasScrollListener = true;
        });
      };
      
      // Initial setup
      setupScrollFades();
      
      // Setup MutationObserver to detect new code blocks
      const observer = new MutationObserver(() => {
        setupScrollFades();
      });
      
      // Start observing the chat history
      const chatHistory = document.querySelector('.jax-chat-history');
      if (chatHistory) {
        observer.observe(chatHistory, { 
          childList: true,
          subtree: true
        });
      }
    });

    // Add scroll event listener
    window.addEventListener('scroll', this.handleScroll);

    // Configure highlight.js
    hljs.configure({
      languages: ['javascript', 'bash', 'shell'],
      ignoreUnescapedHTML: true
    });
    
    // Load Vimeo player script
    if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  },
  beforeDestroy() {
    // Remove scroll event listener
    window.removeEventListener('scroll', this.handleScroll);
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
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid #f39c12;
}

.completion-notes h3 {
  color: #f39c12;
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
  color: #2c3e50;
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

.name-input.error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 1px #e53e3e;
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.start-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.start-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.start-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  width: 100%;
  box-sizing: border-box;
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
  white-space: pre-wrap;
}

.setup-section {
  background-color: #fff5e6;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid #2c8c89;
}

.setup-section h3 {
  color: #2c8c89;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.setup-text {
  color: #2c3e50;
  line-height: 1.5;
  margin-bottom: 0;
  margin-top: 1em;
}

.cursor-link {
  color: #2c8c89;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.cursor-link:hover {
  color: #1a5f5d;
  text-decoration: underline;
}

.info-sections-container {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.info-sections-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.info-sections-header h3 {
  color: var(--primary);
  margin: 0;
  font-size: 1.5rem;
}

.toggle-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-button:hover {
  background-color: #1a5f5d;
}

.info-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.setup-section, .completion-notes {
  margin: 0;
  height: 100%;
}

.video-overview {
  grid-column: 1 / -1;
  border-radius: 8px;
  overflow: hidden;
}

.video-overview h3 {
  font-size: 1.5rem;
  margin-bottom: -4rem;
}

@media (max-width: 768px) {
  .info-sections {
    grid-template-columns: 1fr;
  }
  
  .info-sections-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

.setup-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.setup-list li {
  margin-bottom: 0.75rem;
  color: #2c3e50;
  line-height: 1.5;
}

.setup-list li:last-child {
  margin-bottom: 0;
}

.expected-outputs {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.expected-outputs h4 {
  color: var(--primary);
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.output-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.output-item:last-child {
  margin-bottom: 0;
}

.output-command {
  font-weight: 600;
  color: var(--primary);
  margin-right: 0.5rem;
  min-width: 80px;
}

.output-value {
  color: var(--text-light);
  flex: 1;
  white-space: pre-wrap;
}

.tips-section {
  margin-bottom: 1.5rem;
}

.tips-section:last-child {
  margin-bottom: 0;
}

.tips-section h4 {
  color: #f39c12;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
}

.help-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.help-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.help-button:hover {
  transform: scale(1.1);
  background-color: #1a5f5d;
}

.help-button.active {
  background-color: #1a5f5d;
}

.help-message {
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 300px;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  line-height: 1.5;
  color: #2c3e50;
}

.help-message p {
  margin: 0;
  margin-bottom: 1rem;
}

.close-help {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #8892b0;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.close-help:hover {
  color: #2c3e50;
}

@media (max-width: 768px) {
  .help-message {
    width: calc(100vw - 4rem);
    right: -1rem;
  }
}

.code-block-wrapper {
  position: relative;
  display: block;
  margin: 0.25em 0;
  width: 100%;
  overflow-x: hidden;
}

.code-block-wrapper pre {
  margin: 0;
  width: 100%;
}

.code-block-wrapper code {
  display: block;
  width: 100%;
}

.copy-code-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
  z-index: 5;
  color: #333;
}

.copy-code-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.95);
}

.user-bubble .copy-code-btn {
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
}

.user-bubble .copy-code-btn:hover {
  background: rgba(0, 0, 0, 0.4);
}

.task-description :deep(.code-block-wrapper) {
  position: relative;
  display: block;
  margin: 0.25em 0;
  width: 100%;
  overflow-x: hidden;
  max-height: 150px;
}

.task-description :deep(.copy-code-btn) {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 0.25rem 0.4rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  font-size: 0.8rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  z-index: 2;
  border-radius: 4px;
}

.task-description :deep(.copy-code-btn:hover) {
  opacity: 1;
}

.task-description :deep(.hljs) {
  padding: 0.5em 2em 0.5em 0.75em !important;
  margin: 0 !important;
  background-color: #f8f9fa !important;
  border-radius: 3px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.9em !important;
  border: 1px solid #e2e8f0 !important;
  line-height: 1.5 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: auto !important;
  max-width: 100% !important;
}

.scroll-top {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
}

.scroll-top-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.scroll-top-button:hover {
  transform: scale(1.1);
  background-color: #1a5f5d;
}

@media (max-width: 768px) {
  .scroll-top {
    bottom: 1rem;
    left: 1rem;
  }
}

/* Add these styles for highlight.js */
.hljs {
  padding: 0.5em 2em 0.5em 0.75em !important;
  margin: 0 !important;
  background-color: #f8f9fa !important;
  border-radius: 3px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.9em !important;
  border: 1px solid #e2e8f0 !important;
  line-height: 1.5 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: auto !important;
  max-width: 100% !important;
}

/* Global pre styling */
pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
}

/* Chat window pre styling */
.jax-bubble pre, .user-bubble pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
  margin-bottom: 1rem; /* Add margin for spacing */
}
.jax-bubble code {
  background-color: #f8f9fa !important;
  border-radius: 3px !important;
  padding: 3px 6px !important;
}

.complete-challenge-container {
  margin: 1.5rem 0;
  text-align: center;
  position: relative;
  z-index: 1;
}

.complete-challenge-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
}

.complete-challenge-btn:hover {
  background-color: #1a5f5d;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.download-logs-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
}

.download-logs-btn:hover {
  background-color: var(--primary);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.jax-bubble {
  padding: .75rem 1rem .5rem 2rem !important;
}

/* Enhanced list styling for chat */
.jax-bubble ul, .jax-bubble ol, 
.user-bubble ul, .user-bubble ol {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  list-style-position: outside;
}

.jax-bubble ul, .user-bubble ul {
  list-style-type: disc;
}

.jax-bubble ol, .user-bubble ol {
  list-style-type: decimal;
}

.jax-bubble li, .user-bubble li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  display: list-item;
}

.jax-bubble li:last-child, .user-bubble li:last-child {
  margin-bottom: 0;
}

.jax-bubble ul ul, .jax-bubble ol ul,
.user-bubble ul ul, .user-bubble ol ul {
  list-style-type: circle;
  margin-top: 0.5rem;
}

.jax-bubble ul ol, .jax-bubble ol ol,
.user-bubble ul ol, .user-bubble ol ol {
  list-style-type: lower-alpha;
  margin-top: 0.5rem;
}

.jax-chat-message a {
  color: #2c8c89;
  text-decoration: underline;
}

.jax-chat-message a:hover {
  text-decoration: none;
}

.user-bubble a {
  color: rgba(255, 255, 255, 0.9);
}

.jax-bubble table, .user-bubble table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.75rem 0;
  font-size: 0.9em;
}

.jax-bubble th, .jax-bubble td,
.user-bubble th, .user-bubble td {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  text-align: left;
}

.user-bubble th, .user-bubble td {
  border-color: rgba(255, 255, 255, 0.2);
}

.jax-bubble th, .user-bubble th {
  background-color: rgba(0, 0, 0, 0.05);
  font-weight: bold;
}

.user-bubble th {
  background-color: rgba(255, 255, 255, 0.1);
}

/* JAX Chat Trigger Styles */
.jax-chat-trigger {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  padding: 8px 16px 8px 8px;
  transition: all 0.3s ease;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2000;
  max-width: 210px;
}

.jax-chat-trigger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.jax-avatar-container {
  position: relative;
  flex-shrink: 0;
}

.jax-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #f5f5f5;
  border: 2px solid #2c8c89;
}

.jax-chat-label {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
}

.jax-chat-title {
  font-weight: 600;
  font-size: 1rem;
  color: #2c3e50;
}

.jax-chat-subtitle {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-top: 2px;
}

.jax-chat-minimized-bar {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2000;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1.25rem 0.5rem 0.5rem;
  transition: all 0.3s ease;
}

.jax-chat-minimized-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.jax-mini-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2c8c89;
  margin-right: 0.75rem;
}

.jax-mini-label {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
}

.jax-bubble pre, .user-bubble pre {
  margin: 1rem 0;
  max-width: 100%;
  max-height: 200px;
  overflow: auto;
  background: #f8f9fa;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.jax-bubble .code-block-wrapper, .user-bubble .code-block-wrapper {
  position: relative;
  display: block;
  margin: 0.75rem 0;
  width: 100%;
  border-radius: 6px;
}

.jax-bubble .hljs, .user-bubble .hljs {
  background-color: rgba(0, 0, 0, 0.03) !important;
  padding: 0.75rem 1.5rem 0.75rem 0.75rem !important;
  border-radius: 6px !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  position: relative;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  max-width: none !important;
}

/* Add a fade-out indicator at the bottom of scrollable code blocks */
.jax-bubble pre::after, .user-bubble pre::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.7));
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  border-radius: 0 0 6px 6px;
}

.jax-bubble pre::-webkit-scrollbar-thumb:hover, 
.user-bubble pre::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

.user-bubble pre::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.jax-bubble pre::-webkit-scrollbar, .user-bubble pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.jax-bubble pre::-webkit-scrollbar-track, .user-bubble pre::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0 6px 6px 0;
}

.jax-bubble pre::-webkit-scrollbar-thumb, .user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.user-bubble pre::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.jax-bubble pre.has-more-content::after, 
.user-bubble pre.has-more-content::after {
  opacity: 1;
}

.user-bubble pre::after {
  background: linear-gradient(to bottom, transparent, rgba(44, 140, 137, 0.2));
}

.jax-bubble code, .user-bubble code {
  font-family: 'JetBrains Mono', monospace;
  background: rgba(0, 0, 0, 0.07);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.95em;
}

/* Code block wrapper styling */
.jax-bubble .code-block-wrapper, .user-bubble .code-block-wrapper {
  position: relative;
  display: block;
  margin: 0.75rem 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.user-bubble .code-block-wrapper {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Pre and code tag styling */
.jax-bubble pre, .user-bubble pre {
  margin: 0;
  max-width: 100%;
  max-height: 200px;
  overflow: auto;
  padding: 0;
}

.jax-bubble .hljs, .user-bubble .hljs {
  background: transparent !important;
  padding: 0.75rem !important;
  border: none !important;
  margin: 0 !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  overflow-x: auto !important;
}

/* Simple scrollbars */
.jax-bubble pre::-webkit-scrollbar, .user-bubble pre::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.jax-bubble pre::-webkit-scrollbar-track, .user-bubble pre::-webkit-scrollbar-track {
  background: transparent;
}

.jax-bubble pre::-webkit-scrollbar-thumb, .user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

/* Copy button */
.copy-code-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
  z-index: 5;
  color: #333;
}

.copy-code-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.95);
}

.user-bubble .copy-code-btn {
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
}

.user-bubble .copy-code-btn:hover {
  background: rgba(0, 0, 0, 0.4);
}

.task-description :deep(.code-block-wrapper) {
  position: relative;
  display: block;
  margin: 0.25em 0;
  width: 100%;
  overflow-x: hidden;
  max-height: 150px;
}

.task-description :deep(.copy-code-btn) {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 0.25rem 0.4rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  font-size: 0.8rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  z-index: 2;
  border-radius: 4px;
}

.task-description :deep(.copy-code-btn:hover) {
  opacity: 1;
}

.task-description :deep(.hljs) {
  padding: 0.5em 2em 0.5em 0.75em !important;
  margin: 0 !important;
  background-color: #f8f9fa !important;
  border-radius: 3px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.9em !important;
  border: 1px solid #e2e8f0 !important;
  line-height: 1.5 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: auto !important;
  max-width: 100% !important;
}

.scroll-top {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
}

.scroll-top-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.scroll-top-button:hover {
  transform: scale(1.1);
  background-color: #1a5f5d;
}

@media (max-width: 768px) {
  .scroll-top {
    bottom: 1rem;
    left: 1rem;
  }
}

/* Add these styles for highlight.js */
.hljs {
  padding: 0.5em 2em 0.5em 0.75em !important;
  margin: 0 !important;
  background-color: #f8f9fa !important;
  border-radius: 3px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.9em !important;
  border: 1px solid #e2e8f0 !important;
  line-height: 1.5 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: auto !important;
  max-width: 100% !important;
}

/* Global pre styling */
pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
}

/* Chat window pre styling */
.jax-bubble pre, .user-bubble pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
  margin-bottom: 1rem; /* Add margin for spacing */
}

.complete-challenge-container {
  margin: 1.5rem 0;
  text-align: center;
  position: relative;
  z-index: 1;
}

.complete-challenge-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
}

.complete-challenge-btn:hover {
  background-color: #1a5f5d;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.download-logs-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
}

.download-logs-btn:hover {
  background-color: var(--primary);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Enhanced list styling for chat */
.jax-bubble ul, .jax-bubble ol, 
.user-bubble ul, .user-bubble ol {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  list-style-position: outside;
}

.jax-bubble ul, .user-bubble ul {
  list-style-type: disc;
}

.jax-bubble ol, .user-bubble ol {
  list-style-type: decimal;
}

.jax-bubble li, .user-bubble li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  display: list-item;
}

.jax-bubble li:last-child, .user-bubble li:last-child {
  margin-bottom: 0;
}

.jax-bubble ul ul, .jax-bubble ol ul,
.user-bubble ul ul, .user-bubble ol ul {
  list-style-type: circle;
  margin-top: 0.5rem;
}

.jax-bubble ul ol, .jax-bubble ol ol,
.user-bubble ul ol, .user-bubble ol ol {
  list-style-type: lower-alpha;
  margin-top: 0.5rem;
}

.jax-chat-message a {
  color: #2c8c89;
  text-decoration: underline;
}

.jax-chat-message a:hover {
  text-decoration: none;
}

.user-bubble a {
  color: rgba(255, 255, 255, 0.9);
}

.jax-bubble table, .user-bubble table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.75rem 0;
  font-size: 0.9em;
}

.jax-bubble th, .jax-bubble td,
.user-bubble th, .user-bubble td {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  text-align: left;
}

.user-bubble th, .user-bubble td {
  border-color: rgba(255, 255, 255, 0.2);
}

.jax-bubble th, .user-bubble th {
  background-color: rgba(0, 0, 0, 0.05);
  font-weight: bold;
}

.user-bubble th {
  background-color: rgba(255, 255, 255, 0.1);
}

/* JAX Chat Trigger Styles */
.jax-chat-trigger {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  padding: 8px 16px 8px 8px;
  transition: all 0.3s ease;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2000;
  max-width: 210px;
}

.jax-chat-trigger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.jax-avatar-container {
  position: relative;
  flex-shrink: 0;
}

.jax-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #f5f5f5;
  border: 2px solid #2c8c89;
}

.jax-chat-label {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
}

.jax-chat-title {
  font-weight: 600;
  font-size: 1rem;
  color: #2c3e50;
}

.jax-chat-subtitle {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-top: 2px;
}

.jax-chat-minimized-bar {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2000;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1.25rem 0.5rem 0.5rem;
  transition: all 0.3s ease;
}

.jax-chat-minimized-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.jax-mini-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2c8c89;
  margin-right: 0.75rem;
}

.jax-mini-label {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
}

.jax-bubble pre, .user-bubble pre {
  margin: 1rem 0;
  max-width: 100%;
  max-height: 200px;
  overflow: auto;
  background: #f8f9fa;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.jax-bubble .code-block-wrapper, .user-bubble .code-block-wrapper {
  position: relative;
  display: block;
  margin: 0.75rem 0;
  width: 100%;
  border-radius: 6px;
}

.jax-bubble .hljs, .user-bubble .hljs {
  background-color: rgba(0, 0, 0, 0.03) !important;
  padding: 0.75rem 1.5rem 0.75rem 0.75rem !important;
  border-radius: 6px !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  position: relative;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  max-width: none !important;
}

/* Add a fade-out indicator at the bottom of scrollable code blocks */
.jax-bubble pre::after, .user-bubble pre::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.7));
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  border-radius: 0 0 6px 6px;
}

.jax-bubble pre::-webkit-scrollbar-thumb:hover, 
.user-bubble pre::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

.user-bubble pre::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.jax-bubble pre::-webkit-scrollbar, .user-bubble pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.jax-bubble pre::-webkit-scrollbar-track, .user-bubble pre::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0 6px 6px 0;
}

.jax-bubble pre::-webkit-scrollbar-thumb, .user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.user-bubble pre::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.jax-bubble pre.has-more-content::after, 
.user-bubble pre.has-more-content::after {
  opacity: 1;
}

.user-bubble pre::after {
  background: linear-gradient(to bottom, transparent, rgba(44, 140, 137, 0.2));
}

.jax-bubble code, .user-bubble code {
  font-family: 'JetBrains Mono', monospace;
  background: rgba(0, 0, 0, 0.07);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.95em;
}

/* Code block wrapper styling */
.jax-bubble .code-block-wrapper, .user-bubble .code-block-wrapper {
  position: relative;
  display: block;
  margin: 0.75rem 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.user-bubble .code-block-wrapper {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Pre and code tag styling */
.jax-bubble pre, .user-bubble pre {
  margin: 0;
  max-width: 100%;
  max-height: 200px;
  overflow: auto;
  padding: 0;
}

.jax-bubble .hljs, .user-bubble .hljs {
  background: transparent !important;
  padding: 0.75rem !important;
  border: none !important;
  margin: 0 !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  overflow-x: auto !important;
}

/* Simple scrollbars */
.jax-bubble pre::-webkit-scrollbar, .user-bubble pre::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.jax-bubble pre::-webkit-scrollbar-track, .user-bubble pre::-webkit-scrollbar-track {
  background: transparent;
}

.jax-bubble pre::-webkit-scrollbar-thumb, .user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

/* Copy button */
.copy-code-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
  z-index: 5;
  color: #333;
}

.copy-code-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.95);
}

.user-bubble .copy-code-btn {
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
}

.user-bubble .copy-code-btn:hover {
  background: rgba(0, 0, 0, 0.4);
}

.task-description :deep(.code-block-wrapper) {
  position: relative;
  display: block;
  margin: 0.25em 0;
  width: 100%;
  overflow-x: hidden;
  max-height: 150px;
}

.task-description :deep(.copy-code-btn) {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 0.25rem 0.4rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  font-size: 0.8rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  z-index: 2;
  border-radius: 4px;
}

.task-description :deep(.copy-code-btn:hover) {
  opacity: 1;
}

.task-description :deep(.hljs) {
  padding: 0.5em 2em 0.5em 0.75em !important;
  margin: 0 !important;
  background-color: #f8f9fa !important;
  border-radius: 3px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.9em !important;
  border: 1px solid #e2e8f0 !important;
  line-height: 1.5 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: auto !important;
  max-width: 100% !important;
}

.scroll-top {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
}

.scroll-top-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.scroll-top-button:hover {
  transform: scale(1.1);
  background-color: #1a5f5d;
}

@media (max-width: 768px) {
  .scroll-top {
    bottom: 1rem;
    left: 1rem;
  }
}

/* Add these styles for highlight.js */
.hljs {
  padding: 0.5em 2em 0.5em 0.75em !important;
  margin: 0 !important;
  background-color: #f8f9fa !important;
  border-radius: 3px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.9em !important;
  border: 1px solid #e2e8f0 !important;
  line-height: 1.5 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: auto !important;
  max-width: 100% !important;
}

/* Global pre styling */
pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
}

/* Chat window pre styling */
.jax-bubble pre, .user-bubble pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
  margin-bottom: 1rem; /* Add margin for spacing */
}

.complete-challenge-container {
  margin: 1.5rem 0;
  text-align: center;
  position: relative;
  z-index: 1;
}

.complete-challenge-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
}

.complete-challenge-btn:hover {
  background-color: #1a5f5d;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.download-logs-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
}

.download-logs-btn:hover {
  background-color: var(--primary);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Enhanced list styling for chat */
.jax-bubble ul, .jax-bubble ol, 
.user-bubble ul, .user-bubble ol {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  list-style-position: outside;
}

.jax-bubble ul, .user-bubble ul {
  list-style-type: disc;
}

.jax-bubble ol, .user-bubble ol {
  list-style-type: decimal;
}

.jax-bubble li, .user-bubble li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  display: list-item;
}

.jax-bubble li:last-child, .user-bubble li:last-child {
  margin-bottom: 0;
}

.jax-bubble ul ul, .jax-bubble ol ul,
.user-bubble ul ul, .user-bubble ol ul {
  list-style-type: circle;
  margin-top: 0.5rem;
}

.jax-bubble ul ol, .jax-bubble ol ol,
.user-bubble ul ol, .user-bubble ol ol {
  list-style-type: lower-alpha;
  margin-top: 0.5rem;
}

.jax-chat-message a {
  color: #2c8c89;
  text-decoration: underline;
}

.jax-chat-message a:hover {
  text-decoration: none;
}

.user-bubble a {
  color: rgba(255, 255, 255, 0.9);
}

.jax-bubble table, .user-bubble table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.75rem 0;
  font-size: 0.9em;
}

.jax-bubble th, .jax-bubble td,
.user-bubble th, .user-bubble td {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  text-align: left;
}

.user-bubble th, .user-bubble td {
  border-color: rgba(255, 255, 255, 0.2);
}

.jax-bubble th, .user-bubble th {
  background-color: rgba(0, 0, 0, 0.05);
  font-weight: bold;
}

.user-bubble th {
  background-color: rgba(255, 255, 255, 0.1);
}

/* JAX Chat Trigger Styles */
.jax-chat-trigger {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  padding: 8px 16px 8px 8px;
  transition: all 0.3s ease;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2000;
  max-width: 210px;
}

.jax-chat-trigger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.jax-avatar-container {
  position: relative;
  flex-shrink: 0;
}

.jax-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #f5f5f5;
  border: 2px solid #2c8c89;
}

.jax-chat-label {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
}

.jax-chat-title {
  font-weight: 600;
  font-size: 1rem;
  color: #2c3e50;
}

.jax-chat-subtitle {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-top: 2px;
}

.jax-chat-minimized-bar {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2000;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1.25rem 0.5rem 0.5rem;
  transition: all 0.3s ease;
}

.jax-chat-minimized-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.jax-mini-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2c8c89;
  margin-right: 0.75rem;
}

.jax-mini-label {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
}

.jax-bubble pre, .user-bubble pre {
  margin: 1rem 0;
  max-width: 100%;
  max-height: 200px;
  overflow: auto;
  background: #f8f9fa;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.jax-bubble .code-block-wrapper, .user-bubble .code-block-wrapper {
  position: relative;
  display: block;
  margin: 0.75rem 0;
  width: 100%;
  border-radius: 6px;
}

.jax-bubble .hljs, .user-bubble .hljs {
  background-color: rgba(0, 0, 0, 0.03) !important;
  padding: 0.75rem 1.5rem 0.75rem 0.75rem !important;
  border-radius: 6px !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  position: relative;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  max-width: none !important;
}

/* Add a fade-out indicator at the bottom of scrollable code blocks */
.jax-bubble pre::after, .user-bubble pre::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.7));
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  border-radius: 0 0 6px 6px;
}

.jax-bubble pre::-webkit-scrollbar-thumb:hover, 
.user-bubble pre::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

.user-bubble pre::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.jax-bubble pre::-webkit-scrollbar, .user-bubble pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.jax-bubble pre::-webkit-scrollbar-track, .user-bubble pre::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0 6px 6px 0;
}

.jax-bubble pre::-webkit-scrollbar-thumb, .user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.user-bubble pre::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.jax-bubble pre.has-more-content::after, 
.user-bubble pre.has-more-content::after {
  opacity: 1;
}

.user-bubble pre::after {
  background: linear-gradient(to bottom, transparent, rgba(44, 140, 137, 0.2));
}

.jax-bubble code, .user-bubble code {
  font-family: 'JetBrains Mono', monospace;
  background: rgba(0, 0, 0, 0.07);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.95em;
}

/* Code block wrapper styling */
.jax-bubble .code-block-wrapper, .user-bubble .code-block-wrapper {
  position: relative;
  display: block;
  margin: 0.75rem 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.user-bubble .code-block-wrapper {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Pre and code tag styling */
.jax-bubble pre, .user-bubble pre {
  margin: 0;
  max-width: 100%;
  max-height: 200px;
  overflow: auto;
  padding: 0;
}

.jax-bubble .hljs, .user-bubble .hljs {
  background: transparent !important;
  padding: 0.75rem !important;
  border: none !important;
  margin: 0 !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  overflow-x: auto !important;
}

/* Simple scrollbars */
.jax-bubble pre::-webkit-scrollbar, .user-bubble pre::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.jax-bubble pre::-webkit-scrollbar-track, .user-bubble pre::-webkit-scrollbar-track {
  background: transparent;
}

.jax-bubble pre::-webkit-scrollbar-thumb, .user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

/* Copy button */
.copy-code-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
  z-index: 5;
  color: #333;
}

.copy-code-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.95);
}

.user-bubble .copy-code-btn {
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
}

.user-bubble .copy-code-btn:hover {
  background: rgba(0, 0, 0, 0.4);
}

.task-description :deep(.code-block-wrapper) {
  position: relative;
  display: block;
  margin: 0.25em 0;
  width: 100%;
  overflow-x: hidden;
  max-height: 150px;
}

.task-description :deep(.copy-code-btn) {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 0.25rem 0.4rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  font-size: 0.8rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  z-index: 2;
  border-radius: 4px;
}

.task-description :deep(.copy-code-btn:hover) {
  opacity: 1;
}

.task-description :deep(.hljs) {
  padding: 0.5em 2em 0.5em 0.75em !important;
  margin: 0 !important;
  background-color: #f8f9fa !important;
  border-radius: 3px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.9em !important;
  border: 1px solid #e2e8f0 !important;
  line-height: 1.5 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: auto !important;
  max-width: 100% !important;
}

.scroll-top {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
}

.scroll-top-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.scroll-top-button:hover {
  transform: scale(1.1);
  background-color: #1a5f5d;
}

@media (max-width: 768px) {
  .scroll-top {
    bottom: 1rem;
    left: 1rem;
  }
}

/* Add these styles for highlight.js */
.hljs {
  padding: 0.5em 2em 0.5em 0.75em !important;
  margin: 0 !important;
  background-color: #f8f9fa !important;
  border-radius: 3px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.9em !important;
  border: 1px solid #e2e8f0 !important;
  line-height: 1.5 !important;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: auto !important;
  max-width: 100% !important;
}

/* Global pre styling */
pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
}

/* Chat window pre styling */
.jax-bubble pre, .user-bubble pre {
  white-space: pre-wrap !important;
  word-break: break-word !important;
  margin-bottom: 1rem; /* Add margin for spacing */
}

.complete-challenge-container {
  margin: 1.5rem 0;
  text-align: center;
  position: relative;
  z-index: 1;
}

.complete-challenge-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
}

.complete-challenge-btn:hover {
  background-color: #1a5f5d;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.download-logs-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
}

.download-logs-btn:hover {
  background-color: var(--primary);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Enhanced list styling for chat */
.jax-bubble ul, .jax-bubble ol, 
.user-bubble ul, .user-bubble ol {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  list-style-position: outside;
}

.jax-bubble ul, .user-bubble ul {
  list-style-type: disc;
}

.jax-bubble ol, .user-bubble ol {
  list-style-type: decimal;
}

.jax-bubble li, .user-bubble li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  display: list-item;
}

.jax-bubble li:last-child, .user-bubble li:last-child {
  margin-bottom: 0;
}

.jax-bubble ul ul, .jax-bubble ol ul,
.user-bubble ul ul, .user-bubble ol ul {
  list-style-type: circle;
  margin-top: 0.5rem;
}

.jax-bubble ul ol, .jax-bubble ol ol,
.user-bubble ul ol, .user-bubble ol ol {
  list-style-type: lower-alpha;
  margin-top: 0.5rem;
}

.jax-chat-message a {
  color: #2c8c89;
  text-decoration: underline;
}

.jax-chat-message a:hover {
  text-decoration: none;
}

.user-bubble a {
  color: rgba(255, 255, 255, 0.9);
}

.jax-bubble table, .user-bubble table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.75rem 0;
  font-size: 0.9em;
}

.jax-bubble th, .jax-bubble td,
.user-bubble th, .user-bubble td {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  text-align: left;
}

.user-bubble th, .user-bubble td {
  border-color: rgba(255, 255, 255, 0.2);
}

.jax-bubble th, .user-bubble th {
  background-color: rgba(0, 0, 0, 0.05);
  font-weight: bold;
}

.user-bubble th {
  background-color: rgba(255, 255, 255, 0.1);
}

/* JAX Chat Trigger Styles */
.jax-chat-trigger {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  padding: 8px 16px 8px 8px;
  transition: all 0.3s ease;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2000;
  max-width: 210px;
}

.jax-chat-trigger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.jax-avatar-container {
  position: relative;
  flex-shrink: 0;
}

.jax-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #f5f5f5;
  border: 2px solid #2c8c89;
}

.jax-chat-label {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
}

.jax-chat-title {
  font-weight: 600;
  font-size: 1rem;
  color: #2c3e50;
}

.jax-chat-subtitle {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-top: 2px;
}

.jax-chat-minimized-bar {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2000;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 1.25rem 0.5rem 0.5rem;
  transition: all 0.3s ease;
}

.jax-chat-minimized-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.jax-mini-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2c8c89;
  margin-right: 0.75rem;
}

.jax-mini-label {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
}

.jax-bubble pre, .user-bubble pre {
  margin: 1rem 0;
  max-width: 100%;
  max-height: 200px;
  overflow: auto;
  background: #f8f9fa;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.jax-bubble .code-block-wrapper, .user-bubble .code-block-wrapper {
  position: relative;
  display: block;
  margin: 0.75rem 0;
  width: 100%;
  border-radius: 6px;
}

.jax-bubble .hljs, .user-bubble .hljs {
  background-color: rgba(0, 0, 0, 0.03) !important;
  padding: 0.75rem 1.5rem 0.75rem 0.75rem !important;
  border-radius: 6px !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  position: relative;
  white-space: pre-wrap !important;
  word-break: break-word !important;
  max-width: none !important;
}

/* Add a fade-out indicator at the bottom of scrollable code blocks */
.jax-bubble pre::after, .user-bubble pre::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.7));
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  border-radius: 0 0 6px 6px;
}

.jax-bubble pre::-webkit-scrollbar-thumb:hover, 
.user-bubble pre::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

.user-bubble pre::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.jax-bubble pre::-webkit-scrollbar, .user-bubble pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.jax-bubble pre::-webkit-scrollbar-track, .user-bubble pre::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 0 6px 6px 0;
}

.jax-bubble pre::-webkit-scrollbar-thumb, .user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.user-bubble pre::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.jax-bubble pre.has-more-content::after, 
.user-bubble pre.has-more-content::after {
  opacity: 1;
}

.user-bubble pre::after {
  background: linear-gradient(to bottom, transparent, rgba(44, 140, 137, 0.2));
}

.jax-bubble code, .user-bubble code {
  font-family: 'JetBrains Mono', monospace;
  background: rgba(0, 0, 0, 0.07);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.95em;
}

/* Code block wrapper styling */
.jax-bubble .code-block-wrapper, .user-bubble .code-block-wrapper {
  position: relative;
  display: block;
  margin: 0.75rem 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.user-bubble .code-block-wrapper {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Pre and code tag styling */
.jax-bubble pre, .user-bubble pre {
  margin: 0;
  max-width: 100%;
  max-height: 200px;
  overflow: auto;
  padding: 0;
}

.jax-bubble .hljs, .user-bubble .hljs {
  background: transparent !important;
  padding: 0.75rem !important;
  border: none !important;
  margin: 0 !important;
  font-size: 0.9rem !important;
  line-height: 1.5 !important;
  overflow-x: auto !important;
}

/* Simple scrollbars */
.jax-bubble pre::-webkit-scrollbar, .user-bubble pre::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.jax-bubble pre::-webkit-scrollbar-track, .user-bubble pre::-webkit-scrollbar-track {
  background: transparent;
}

.jax-bubble pre::-webkit-scrollbar-thumb, .user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.user-bubble pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

/* Copy button */
.copy-code-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
  z-index: 5;
  color: #333;
}

.copy-code-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.95);
}

.user-bubble .copy-code-btn {
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
}

.user-bubble .copy-code-btn:hover {
  background: rgba(0, 0, 0, 0.4);
}

.task-description :deep(.code-block-wrapper) {
  position: relative;
  display: block;
  margin: 0.25em 0;
  width: 100%;
  overflow-x: hidden;
  max-height: 150px;
}

.task-description :deep(.copy-code-btn) {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 0.25rem 0.4rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  font-size: 0.8rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  z-index: 2;
}
</style>
/* Hide scrollbars when not needed in task descriptions */
.task-description :deep(pre) { overflow: auto; scrollbar-width: thin; scrollbar-color: transparent transparent; }
.task-description :deep(pre::-webkit-scrollbar) { width: 6px; height: 6px; background-color: transparent; opacity: 0; }
.task-description :deep(pre:hover::-webkit-scrollbar) { opacity: 1; }
.task-description :deep(pre::-webkit-scrollbar-thumb) { background-color: rgba(0, 0, 0, 0.2); border-radius: 3px; }
.task-description :deep(pre::-webkit-scrollbar-track) { background-color: transparent; }
/* Chat window pre styling */
.jax-bubble pre, .user-bubble pre { white-space: pre-wrap !important; word-break: break-word !important; margin-bottom: 1rem !important; }
