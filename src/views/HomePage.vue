<template>
  <div class="home-page">
    <section class="hero">
      <div class="container hero-container">
        <div class="hero-content">
          <h1>From Command Line Intimidation to Terminal Mastery</h1>
          <p class="tagline">The difference between AI passengers and AI Captains isn't advanced technical knowledge—it's a foundation of basic control and confidence.</p>
          
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
    
    <section class="about-toolkit">
      <div class="container">
        <h2 class="section-title">The Bridge You've Been Missing</h2>
        <div class="about-content">
          <p class="about-lead">It's that mental block that keeps so many of us stuck: when AI tools suggest something that starts with "Open your terminal and type..." we immediately close the tab.</p>
          <p>The Terminal Navigation Toolkit is your comprehensive hub for conquering command line intimidation and becoming technically capable—without becoming a programmer.</p>
          <p>Whether you blitz through in a few days or take the full 30-day journey, you'll transform from fearing the command line to confidently directing AI to build exactly what you need—not just what pre-built platforms allow.</p>
        </div>
      </div>
    </section>
    
    <section class="features">
      <div class="container">
        <h2 class="section-title">What You'll Find Here</h2>
        
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">📋</div>
            <h3>Command Cheat Sheet</h3>
            <p>The essential commands you'll need at your fingertips. No more Googling basic commands—everything explained in plain English.</p>
            <router-link to="/cheatsheet" class="feature-link">Explore Commands</router-link>
          </div>


          <div class="feature-card">
            <div class="feature-icon">🚀</div>
            <h3>30-Day Content Commander Challenge</h3>
            <p>The step-by-step journey that transforms you from AI passenger to AI captain by building a practical tool you'll actually use.</p>
            <a href="https://ccc.ai-captains.com" class="feature-link">Get API Key</a>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🔧</div>
            <h3>Troubleshooting Guide</h3>
            <p>Turn error messages from scary to solvable with our comprehensive guide. Common issues explained without technical jargon.</p>
            <router-link to="/troubleshooting" class="feature-link">Fix Common Issues</router-link>
          </div>
          
        </div>
      </div>
    </section>
    
    <section class="getting-started">
      <div class="container">
        <h2 class="section-title">Getting Started Guide</h2>
        <p class="getting-started-lead">Before you begin your journey, you'll need to set up your development environment. Don't worry—we'll guide you through installing everything you need.</p>
        
        <div class="getting-started-content">
          <div class="getting-started-text">
            <p>To work with the command line and build your own tools, you'll need a few essential programs installed on your computer:</p>
            <ul>
              <li><strong>Git</strong> - For version control and collaboration</li>
              <li><strong>Node.js</strong> - For running JavaScript applications</li>
              <li><strong>Python</strong> - For data processing and AI integration</li>
            </ul>
            <p>Our step-by-step guide will walk you through installing these tools on your system, whether you're using macOS, Windows, or Linux.</p>
            <router-link to="/dependencies" class="btn btn-accent">Set Up Your Environment</router-link>
          </div>
          <div class="getting-started-image">
            <img src="@/assets/images/terminal-setup.svg" alt="Terminal Setup" />
          </div>
        </div>
      </div>
    </section>
    
    <section class="commander-challenge">
      <div class="container">
        <h2 class="section-title">The 30-Day Content Commander Challenge</h2>
        <p class="challenge-lead">Over 30 days (or however quickly you want to move), you'll build a powerful command-line content management system while mastering the technical foundation that unlocks your AI potential.</p>
        
        <div class="journey-steps">
          <div class="journey-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Command Line Basics</h3>
              <p>Master essential commands and set up your project workspace with confidence.</p>
              <div class="step-week">Week 1</div>
            </div>
          </div>
          
          <div class="journey-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Content Management</h3>
              <p>Build a system to capture, organize, and retrieve your content ideas effortlessly.</p>
              <div class="step-week">Week 2</div>
            </div>
          </div>
          
          <div class="journey-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>APIs & External Services</h3>
              <p>Connect your tool to powerful services that supercharge your content creation.</p>
              <div class="step-week">Week 3</div>
            </div>
          </div>
          
          <div class="journey-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>AI Integration</h3>
              <p>Implement AI-powered features that transform how you create content.</p>
              <div class="step-week">Week 4</div>
            </div>
          </div>
        </div>
        
        <div class="commander-cta">
          <p class="cta-text">This converts your technical anxiety into implementation confidence!</p>
          <a href="https://ccc.ai-captains.com" class="btn btn-accent btn-large">Get Started with the Challenge</a>
        </div>
      </div>
    </section>
    
    
    <section class="about-jordan">
      <div class="container">
        <div class="about-jordan-content">
          <div class="jordan-image">
            <img src="/images/jordan-urbs.png" alt="Jordan Urbs" />
            <div class="image-overlay">
              <h3>Hi! I'm <a href="https://youtube.com/@jordanurbsai" target="_blank" rel="noopener noreferrer">Jordan Urbs</a></h3>
            </div>
          </div>
          <div class="jordan-bio">
            <h2 class="section-title">Why I Created This Toolkit</h2>
            <p>For years, I avoided anything that required using the command line. Every time I saw those intimidating black screens with white text in coding tutorials, I'd immediately close the tab. "This is for real developers," I told myself, "not for people like me."</p>
            <p>But when ChatGPT and other AI tools started emerging, I quickly hit walls. I'd ask these AIs to help me build things, but then get stuck when they gave me instructions that started with "Open your terminal and type..."</p>
            <p>The shocking discovery? Learning just enough command line and coding basics is easier than ever now with AI co-pilots.</p>
            <p>Now, I'm using AI to build web applications and automation tools I never thought possible without a computer science degree.</p>
            <p>And you can, too.</p>
            <p>I created these resources to help you skip the years of intimidation I experienced and jump straight to technical confidence.</p>
            <p>Let's get it!</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="faq">
      <div class="container">
        <h2 class="section-title">Frequently Asked Questions</h2>
        
        <div class="faq-list">
          <div class="faq-item">
            <h3 class="faq-question">Why should I listen to you?</h3>
            <div class="faq-answer">
              <p>Don't! Seriously. <em>Don't trust, verify.</em> Google everything I'm saying to verify it.</p><p>The benefit isn't that I'm some genius developer (I'm not)—it's that I've curated the minimal technical foundation you need as a business builder and organized it in a way that makes sense for non-technical folks.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">Why is this valuable if I can Google everything?</h3>
            <div class="faq-answer">
              <p>You absolutely can Google everything here!</p><p>The value is having it all in one place, organized specifically for entrepreneurs and creators who are competent in other areas but unfamiliar with the command line.</p><p>It's the difference between having scattered puzzle pieces and a complete picture. Plus, it's been designed to be enjoyable rather than overwhelming.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">Who is the challenge for?</h3>
            <div class="faq-answer">
              <p>No-coders, non-developers, creators, solopreneurs, and all the other builders who haven't had the time to become a full stack developer, but want to take their technical proficiency to the next level. Especially those who struggle with resistance when faced with a terminal or command line interface.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">Is this a coding course?</h3>
            <div class="faq-answer">
              <p>NO! This is about learning to work WITH code, not becoming a programmer. AI agents will do all the coding for you, but you still have to learn how to manage the AI agent.</p><p>It's like learning to drive without needing to understand how to build the car.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">Why should I pay for the challenge if I can just learn it with ChatGPT or Claude?</h3>
            <div class="faq-answer">
              <p>You can learn this stuff anywhere, even Google, but I've formatted it to be fun—and cool—to learn. </p><p>More importantly, I've structured it around building something genuinely useful while learning, which gives you both the skills AND a valuable tool at the end.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="local-storage-notice">
      <div class="container">
        <div class="notice-card">
          <h2 class="notice-title">⚠️ Important Information About The Challenge</h2>
          <div class="notice-content">
            <p><strong>Run it Offline or On:</strong> This project is open-source. You can run it right here in your browser or you can download it from <a href="https://github.com/jordanurbs/terminal-navigation-toolkit" target="_blank" rel="noopener noreferrer">Github</a> and run the Node (Javascript) project locally. It's good practice!</p>
            <p><strong>Local Storage:</strong> Whether you use the Toolkit online or off, your progress and challenge data are currently stored only in your browser's local storage. Clearing your browser data will reset your progress and you'll have to re-import the challenge with your API key.</p>
            <p><strong>Starting the App:</strong> To use this application locally, you must run <code>npm run dev</code> from the project folder each time you want to start. (You only need to run <code>npm install</code> once)</p>
          </div>
        </div>
      </div>
    </section>
    

    <section class="bootcamp-reminder">
      <div class="container">
        <div class="bootcamp-card">
          <h2 class="bootcamp-title">Haven't Completed the<br>Command Line Bootcamp Yet?</h2>
          <p class="bootcamp-desc">If you haven't taken the <a style="color: white;" href="https://cli-bootcamp.jordanurbs.com">free 5-Day AI Captain's Command Line Bootcamp</a>, now's the perfect time!</p><p>This mini-course teaches you the basics before diving into the more comprehensive 30-day challenge:</p>
          
          <div class="bootcamp-days">
            <div class="bootcamp-day">
              <span class="day-number">1</span>
              <span class="day-title">The Captain's Mindset</span>
            </div>
            <div class="bootcamp-day">
              <span class="day-number">2</span>
              <span class="day-title">Command Line Essentials</span>
            </div>
            <div class="bootcamp-day">
              <span class="day-number">3</span>
              <span class="day-title">Code Literacy</span>
            </div>
            <div class="bootcamp-day">
              <span class="day-number">4</span>
              <span class="day-title">API Fundamentals</span>
            </div>
            <div class="bootcamp-day">
              <span class="day-number">5</span>
              <span class="day-title">Git Basics</span>
            </div>
          </div>
          
          <div class="signup-form">
            <div class="form-container">
              <div class="form-header">
                <h2 class="form-title">Start the Bootcamp!</h2>
                <p class="form-subtitle">The first step to shift from prompting AI to programming with AI.</p>
              </div>

              <form @submit.prevent="handleSubmit" class="form-content">
                <div class="form-grid">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="firstName"
                      placeholder="First Name"
                      required
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      v-model="email"
                      placeholder="Email"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      class="form-input"
                    />
                  </div>
                </div>

                <div class="turnstile-container">
                  <!-- Turnstile will be added here -->
                </div>
                
                <button 
                  type="submit" 
                  class="submit-button"
                  :disabled="isSubmitting || !turnstileToken"
                >
                  Get Started Now
                  <span class="arrow">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="get-started">
      <div class="container">
        <h2 class="section-title">Build the foundation to thrive in an AI-driven future. </h2>
        <p class="get-started-text">The moment you run your first successful command, everything changes. The universe will open up once you realize what's possible beyond the walled gardens of no-code AI services.</p>
        
        <div class="get-started-cta">
          <a href="https://ccc.ai-captains.com" class="btn btn-accent btn-large">Start Your Journey as an AI Captain</a>
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
      firstName: '',
      email: '',
      isSubmitting: false,
      turnstileToken: null,
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
    },
    handleSubmit() {
      this.isSubmitting = true
      // Add your form submission logic here
      console.log('Form submitted:', { firstName: this.firstName, email: this.email })
      this.isSubmitting = false
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
  background: linear-gradient(rgba(10, 61, 98, 0.85), rgba(10, 61, 98, 0.85)), url('/images/background1.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: rgba(255, 255, 255, 0.95);
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
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.tagline {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.button-group {
  display: flex;
  gap: 1rem;
}

/* About Toolkit Section */
.about-toolkit {
  padding: 4rem 0;
  background-color: white;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-lead {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

/* Features Section */
.features {
  padding: 4rem 0;
  background-color: var(--background);
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: var(--primary);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
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

/* Commander Challenge Section */
.commander-challenge {
  padding: 4rem 0;
  background-color: white;
}

.challenge-lead {
  text-align: center;
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.journey-steps {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.journey-step {
  display: flex;
  margin-bottom: 1.5rem;
  background-color: var(--background);
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

.commander-cta {
  text-align: center;
  margin-top: 2rem;
}

.cta-text {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

/* Bootcamp Reminder Section */
.bootcamp-reminder {
  padding: 6rem 0;
  background-color: #0a192f;
  color: white;
}

.bootcamp-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 3rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.bootcamp-title {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.bootcamp-desc {
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
}

.bootcamp-days {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.bootcamp-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.bootcamp-day:hover {
  transform: translateY(-5px);
}

.day-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--accent);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.day-title {
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}

/* About Jordan Section */
.about-jordan {
  padding: 4rem 0 0;
  background: linear-gradient(rgba(10, 61, 98, 0.85), rgba(10, 61, 98, 0.85)), url('/images/background2.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: rgba(255, 255, 255, 0.95);
  position: relative;
}

.about-jordan-content {
  display: flex;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  align-items: flex-end;
  padding-bottom: 4rem;
}

.jordan-image {
  flex: 0 0 400px;
  margin-bottom: -4rem;
  position: relative;
}

.jordan-image img {
  width: 100%;
  border-radius: 8px;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(10, 61, 98, 0.9));
  border-radius: 0 0 8px 8px;
}

.image-overlay h3 {
  color: white;
  font-size: 2rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.image-overlay a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.3s ease;
}

.image-overlay a:hover {
  color: #e5a92e;
}

.jordan-bio {
  flex: 1;
  padding-top: 2rem;
}

.jordan-bio p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.jordan-bio .section-title {
  text-align: left;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* FAQ Section */
.faq {
  padding: 4rem 0;
  background-color: var(--background);
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.faq-question {
  color: var(--primary);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.faq-answer p {
  line-height: 1.6;
}

/* Local Storage Notice Section */
.local-storage-notice {
  padding: 4rem 0;
  background-color: white;
}

.notice-card {
  background-color: var(--background);
  border-radius: 8px;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
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

.notice-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.notice-content p:last-child {
  margin-bottom: 0;
}

.notice-content code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
  color: var(--accent);
}

/* Get Started Section */
.get-started {
  padding: 6rem 0;
  background-color: var(--primary);
  color: white;
  text-align: center;
}

.get-started .section-title {
  color: white;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.get-started-text {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Footer */
.footer {
  background-color: #0a192f;
  color: white;
  padding: 4rem 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-brand h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.footer-newsletter h4 {
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
}

.newsletter-form input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
}

.newsletter-form .btn {
  border-radius: 0 4px 4px 0;
  padding: 0.6rem 1rem;
}

.footer-links h4 {
  margin-bottom: 1rem;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: white;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--accent);
}

.footer-copyright {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive Styles */
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
  
  .about-jordan-content {
    flex-direction: column;
    text-align: center;
  }
  
  .jordan-image {
    margin: 0 auto;
    max-width: 250px;
  }
  
  .jordan-bio .section-title {
    text-align: center;
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
  
  .bootcamp-days {
    flex-direction: column;
    align-items: center;
  }
  
  .bootcamp-day {
    flex-direction: row;
    width: auto;
    justify-content: flex-start;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form input {
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .newsletter-form .btn {
    border-radius: 4px;
  }
}

.signup-form {
  margin-top: 3rem;
}

.form-container {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.form-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 1rem;
}

.form-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
}

.form-group {
  width: 100%;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 1rem;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.turnstile-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.submit-button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: var(--accent);
  color: var(--primary);
  border: none;
  border-radius: 4px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background-color: #e5a92e;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.arrow {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

/* Getting Started Section */
.getting-started {
  padding: 4rem 0;
  background-color: white;
}

.getting-started-lead {
  text-align: center;
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: var(--text-light);
}

.getting-started-content {
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
}

.getting-started-text {
  flex: 1;
}

.getting-started-text p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.getting-started-text ul {
  margin-bottom: 2rem;
  padding-left: 1.5rem;
}

.getting-started-text li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.getting-started-text strong {
  color: var(--primary);
}

.getting-started-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.getting-started-image img {
  max-width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .getting-started-content {
    flex-direction: column;
    text-align: center;
  }
  
  .getting-started-text ul {
    text-align: left;
  }
  
  .getting-started-image {
    order: -1;
  }
}
</style>