<template>
  <div class="home-page">
    <section class="hero">
      <div class="container hero-container">
        <div class="hero-content">
          <h1>From Command Line Intimidation to Terminal Mastery in 30 Days</h1>
          <p class="tagline">The difference between AI passengers and captains isn't what you think...</p>
          
          <div class="hero-cta" v-if="!userName">
            <div class="onboarding-form">
              <input 
                type="text" 
                v-model="newUserName" 
                placeholder="Enter your name"
                class="name-input"
              >
              <button @click="startJourney" class="btn btn-accent" :disabled="!newUserName">
                Begin Your Journey
              </button>
            </div>
          </div>
          
          <div class="hero-cta" v-else>
            <p class="welcome-back">Welcome back, {{ userName }}!</p>
            <div class="button-group">
              <router-link to="/challenges" class="btn btn-accent">Continue Your Journey</router-link>
              <router-link to="/progress" class="btn btn-secondary">View Your Progress</router-link>
            </div>
          </div>
        </div>
        
        <div class="hero-terminal">
          <TerminalSimulator
            title="AI Captain's Terminal"
            user="captain"
            hostname="ship"
            :initial-lines="initialTerminalLines"
            :demo-commands="demoCommands"
            :typing-speed="50"
            :play-cursor-sound="true"
          />
        </div>
      </div>
    </section>
    
    <section class="features">
      <div class="container">
        <h2 class="section-title">Your 30-Day Journey Includes</h2>
        
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">📋</div>
            <h3>Interactive Command Cheat Sheet</h3>
            <p>50+ essential commands organized by business function with real-world applications.</p>
            <router-link to="/cheatsheet" class="feature-link">Explore Commands</router-link>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🗓️</div>
            <h3>30-Day Challenge Calendar</h3>
            <p>Progressive daily challenges that build real confidence with business-focused exercises.</p>
            <router-link to="/challenges" class="feature-link">View Challenges</router-link>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>Troubleshooting Guide</h3>
            <p>Common error messages decoded in plain English with step-by-step solutions.</p>
            <router-link to="/troubleshooting" class="feature-link">Fix Common Issues</router-link>
          </div>
        </div>
      </div>
    </section>
    
    <section class="local-storage-notice">
      <div class="container">
        <div class="notice-card">
          <h2 class="notice-title">⚠️ Important Information</h2>
          <div class="notice-content">
            <p><strong>Local Storage:</strong> Your progress and challenge data are currently stored only in your browser's local storage. Clearing your browser data will reset your progress.</p>
            <p><strong>Starting the App:</strong> To use this application, you must run <code>npm run dev</code> from the project folder each time you want to start.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="journey">
      <div class="container">
        <h2 class="section-title">The Journey From AI Passenger to Captain</h2>
        
        <div class="journey-steps">
          <div class="journey-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Navigation Fundamentals</h3>
              <p>Build your sea legs with essential commands for moving through your system confidently.</p>
              <div class="step-week">Week 1</div>
            </div>
          </div>
          
          <div class="journey-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>File & Text Processing</h3>
              <p>Learn to navigate the currents by manipulating files and extracting valuable information.</p>
              <div class="step-week">Week 2</div>
            </div>
          </div>
          
          <div class="journey-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Automation & Programming</h3>
              <p>Take control of the ship by creating scripts that automate repetitive tasks.</p>
              <div class="step-week">Week 3</div>
            </div>
          </div>
          
          <div class="journey-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Advanced Integration & AI Tools</h3>
              <p>Become the captain by connecting services and leveraging AI through the command line.</p>
              <div class="step-week">Week 4</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="get-started">
      <div class="container">
        <h2 class="section-title">Ready to Become an AI Captain?</h2>
        <p class="get-started-text">Your journey from AI passenger to captain starts with a single command...</p>
        
        <div class="get-started-cta">
          <router-link to="/challenges" class="btn btn-accent btn-large">Begin the 30-Day Challenge</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TerminalSimulator from '../components/TerminalSimulator.vue'

export default {
  name: 'HomePage',
  components: {
    TerminalSimulator
  },
  data() {
    return {
      newUserName: '',
      initialTerminalLines: [
        {
          type: 'prompt',
          path: '~',
          content: 'echo "Welcome aboard, future AI Captain!"'
        },
        {
          type: 'output',
          content: 'Welcome aboard, future AI Captain!'
        }
      ],
      demoCommands: [
        'ls projects',
        'cd projects/ai-tools',
        'git status'
      ]
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  methods: {
    startJourney() {
      if (this.newUserName.trim()) {
        this.$store.commit('setUserName', this.newUserName.trim())
        this.$store.dispatch('initializeUser')
      }
    }
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.hero {
  padding: 3rem 0;
  background: linear-gradient(to bottom, var(--primary), #072f4a);
  color: white;
  min-height: 500px;
  display: flex;
  align-items: center;
  margin: 0;
}

.hero-container {
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-content h1 {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: white;
}

.tagline {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-terminal {
  flex: 1;
  min-width: 400px;
  max-width: 500px;
  height: 300px;
}

.onboarding-form {
  display: flex;
  max-width: 400px;
}

.name-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.onboarding-form .btn {
  border-radius: 0 4px 4px 0;
}

.welcome-back {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
}

.features {
  padding: 4rem 0;
  background-color: white;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: var(--primary);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: var(--primary);
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.feature-link {
  color: var(--secondary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.feature-link:hover {
  color: var(--primary);
}

.journey {
  padding: 4rem 0;
  background-color: var(--background);
}

.journey-steps {
  max-width: 800px;
  margin: 0 auto;
}

.journey-step {
  display: flex;
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: var(--secondary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1.5rem;
}

.step-content h3 {
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.step-content p {
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.step-week {
  font-size: 0.875rem;
  color: var(--secondary);
  font-weight: 600;
}

.get-started {
  padding: 4rem 0;
  background-color: var(--primary);
  color: white;
  text-align: center;
}

.get-started .section-title {
  color: white;
}

.get-started-text {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.local-storage-notice {
  padding: 3rem 0;
  background-color: #f8fafc;
}

.notice-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 4px solid var(--accent);
}

.notice-title {
  color: var(--primary);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.notice-content {
  color: var(--text);
  font-size: 1.1rem;
  line-height: 1.6;
}

.notice-content p {
  margin-bottom: 1rem;
}

.notice-content p:last-child {
  margin-bottom: 0;
}

.notice-content code {
  background-color: #f1f5f9;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  color: var(--accent);
}

@media (max-width: 1024px) {
  .hero {
    padding: 2rem 0;
    min-height: auto;
  }
  
  .hero-container {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-terminal {
    min-width: 80%;
    max-width: 600px;
    height: 250px;
  }
  
  .onboarding-form {
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 0;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .tagline {
    font-size: 1.25rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .journey-step {
    flex-direction: column;
    text-align: center;
  }
  
  .step-number {
    margin: 0 auto 1rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .button-group .btn {
    width: 100%;
  }
}
</style>