<template>
  <div class="home-page">
    <section class="hero">
      <div class="container hero-container">
        <div class="hero-content">

          <h1>Build A Vibe-Coded Business With AI</h1>
          <p class="tagline">Learn the technical foundation that transforms online builders into business owners—using AI as your coding partner to build directories, SaaS tools, and automation that can actually generate revenue.</p>
          <p class="tagline">You know AI is the future. You understand vibe coding beats traditional development. Now build the foundational skills to deploy, scale, and own what you build—instead of renting tools forever.</p>
          
          <div class="hero-cta" v-if="!hasApiKey">
            <div class="button-group">
              <router-link to="/dependencies" class="btn btn-accent">Set Up Your Machine</router-link>
              <router-link to="/prompts" class="btn btn-secondary">Agents, Prompts & Resources</router-link>
            </div>
          </div>
          
          <div class="hero-cta" v-else-if="!userName">
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
        <h2 class="section-title">What You'll Find Here</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">🚀</div>
            <h3>Full Getting Started Guide</h3>
            <p>Complete setup guide for Claude Code and terminal essentials. From zero to building with AI in one comprehensive walkthrough.</p>
            <router-link to="/dependencies" class="feature-link">Get Started</router-link>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🤖</div>
            <h3>Claude Code Agents</h3>
            <p>Curated collection of Claude Code agent configurations and resources. Access official and community-created agents for enhanced AI development.</p>
            <router-link to="/prompts" class="feature-link">Browse Agents</router-link>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📝</div>
            <h3>System Prompts & Rules</h3>
            <p>Battle-tested prompts and system rules that transform AI assistants into powerful coding partners. Copy, customize, and deploy instantly.</p>
            <router-link to="/prompts" class="feature-link">View Prompts</router-link>
          </div>
          
        

          <div class="feature-card">
            <div class="feature-icon">📋</div>
            <h3>Command Line Help</h3>
            <p>The essential commands you'll need at your fingertips. No more Googling basic commands—everything explained in plain English.</p>
            <router-link to="/cheatsheet" class="feature-link">Explore Commands</router-link>
          </div>


          <div class="feature-card">
            <div class="feature-icon">🧭</div>
            <h3>30-Day Content Commander Challenge</h3>
            <p>The step-by-step journey that transforms you from no-code passenger to AI Captain by building a practical tool you'll actually use.</p>
            <a href="https://skool.com/aicaptains" class="feature-link">Get API Key</a>
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
              <h3>Command Line Fundamentals</h3>
              <p>Master essential commands and set up your project workspace with confidence.</p>
              <div class="step-week">Week 1</div>
            </div>
          </div>
          
          <div class="journey-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Git & Project Building</h3>
              <p>Master version control with Git and build your first project with confidence.</p>
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
      
          <a href="/challenges" class="btn btn-accent btn-large">Get Started with the Challenge</a>
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
            <h2 class="section-title">From Online Builder to Business Owner</h2>
   
            <h3 style="color:white;">My Breakthrough Moment:</h3>
            <p>Realizing that vibe coding with AI wasn't just a productivity hack—it was the unlock to building the exact tools & ideas I'd been DREAMING of for years.</p>
            <h3 style="color:white;">The Business Transformation:</h3>
            <ul style="margin-bottom:20px;">
              <li>Started out building local directories to learn</li>
              <li>Created custom automation workflows that are now saving me $400+/month in SaaS subscriptions</li>
              <li>Deployed client projects that I previously had to turn down or outsource</li>
              <li>I'm now shipping my first SaaS products (mostly RAG voice agents)</li>
            </ul>
            <h3 style="color:white;">What changed everything:</h3> <p>Learning just enough infrastructure fundamentals to deploy, scale, and maintain what AI helps me build.</p>
            <h3 style="color:white;">I am now FREE.</h3>
            <p>I can ship projects that solve real problems... for real money.</p>
            <p>And you can learn, too.</p>
            <p>I started AI Captains because the gap between "online builder" and "tech entrepreneur" is smaller than most people think—but the bridge isn't obvious.</p>
            <p>Let's build your first vibe-coded business together.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="faq">
      <div class="container">
        <h2 class="section-title">Frequently Asked Questions</h2>
        
        <div class="faq-list">
          <div class="faq-item">
            <h3 class="faq-question">Why should I trust someone who's not a "real developer"?</h3>
            <div class="faq-answer">
              <p><strong>This is exactly why you SHOULD trust me.</strong></p><p>I learned this as a complete outsider, so I know which parts actually matter for builders vs. which parts are just programmer gatekeeping. I explain things the way I needed them explained 18 months ago.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">Will this Toolkit help me build a directory specifically?</h3>
            <div class="faq-answer">
              <p><strong>No—but the AI Captains Skool can!</strong></p><p>Directories are a great way to start learning. Unlike generic coding courses that teach to-do apps, in the <a href="https://skool.com/aicaptains">Skool community</a> we use directory building to learn things like: data scraping, API calls, AI data processing, interface building, dashboard creation, and more.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">Is this just another subscription I'll forget about?</h3>
            <div class="faq-answer">
              <p><strong>There are no charges for the core toolkit—only if you upgrade to the Skool.</strong></p><p>You either commit to learning this or you don't—but the Terminal Navigation Toolkit won't slowly drain your bank account.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">What if I don't even know what an IDE is?</h3>
            <div class="faq-answer">
              <p><strong>Perfect. That's exactly who this is for!</strong></p><p>15% of our community started with that exact question. We begin with installing Cursor or VS Code and then using different AI agents such as Claude Code to start building inside the IDE.</p><p>No assumptions, no skipped steps.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 class="faq-question">How is this different from YouTube tutorials?</h3>
            <div class="faq-answer">
              <p><strong>Structure + Focus + No BS.</strong></p><p>Instead of "Here's how to build a blog in React," I prefer to share "Here's how to scrape business data, organize it, and deploy a searchable directory that solves a real problem."</p><p>Every lesson builds toward something you'd actually use.</p>
            </div>
          </div>
          
          
          <div class="faq-item">
            <h3 class="faq-question">Is the command line actually necessary, or is this just gatekeeping?</h3>
            <div class="faq-answer">
              <p><strong>It's necessary, but not in the way "real programmers" make it seem.</strong></p><p>You need maybe 20 commands total. It's like learning to drive—you don't need to understand the engine, just the pedals and steering wheel.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Important Information About The Challenge - Hidden
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
    -->
    

    <section class="bootcamp-reminder" id="bootcamp">
      <div class="container">
        <div class="bootcamp-card">
          <h2 class="bootcamp-title">5-Day Command Line Confidence Course</h2>
          <p class="bootcamp-desc">For People Who Don't Even Know What Terminal Means:</p>
          
          <div class="bootcamp-days">
            <div class="bootcamp-day">
              <span class="day-number">1</span>
              <span class="day-title">The Captain's Mindset (Why this matters for builders)</span>
            </div>
            <div class="bootcamp-day">
              <span class="day-number">2</span>
              <span class="day-title">Your First 10 Commands (The only ones you actually need)</span>
            </div>
            <div class="bootcamp-day">
              <span class="day-number">3</span>
              <span class="day-title">Project Setup Basics (Stop getting lost in folder structures)</span>
            </div>
            <div class="bootcamp-day">
              <span class="day-number">4</span>
              <span class="day-title">API Fundamentals (How systems talk to each other)</span>
            </div>
            <div class="bootcamp-day">
              <span class="day-number">5</span>
              <span class="day-title">Git Essentials (Your time machine for code changes)</span>
            </div>
          </div>
          
          <div class="signup-form">
            <div class="form-container">
              <div class="form-header">
                <h2 class="form-title">Start the Bootcamp!</h2>
                <p class="form-subtitle">Take your first step from merely prompting AI to actually building with AI.</p>
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
          
          <!-- Architectural Literacy CTA -->
          <div class="bootcamp-cta-section">
            <CourseCtaCard
              variant="featured"
              course-title="Navigate Beyond the Bootcamp"
              course-subtitle="Master the foundational systems that turn no-code passengers into AI Captains... in just a few weeks!"
              course-description="The 5-day bootcamp gives you confidence.<br>This Architectural Literacy Crash Course gives you comprehensive understanding."
              :bullet-points="[
                'Over 25 video lessons across 6 comprehensive modules covering Command Line, APIs, Git, Dependencies, mindset and more.',
                'Build an AI chatbot from scratch as your capstone project',
                'Understand how code actually works - no more mysterious errors',
                'Foundation that lets you troubleshoot like a pro, not guess like a passenger'
              ]"
              image-url="/images/architectural-literacy-min.png"
              image-alt="Architectural Literacy Course"
              cta-text="Set Sail for Technical Independence"
              supporting-text="The upgraded voyage dozens of AI captains wish they'd taken first. Start your 7-day trial risk-free."
              student-count="25"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="get-started">
      <div class="container">
        <h2 class="section-title">Stop Watching. Start Building.</h2>
        <p class="get-started-text"><strong>The moment you run your first successful command, everything changes.</strong></p>
        <p class="get-started-text">No more "I have an idea but can't build it." No more "$300/month for tools that do 60% of what I need." No more "I'll hire someone when I have the budget."</p>
        <p class="get-started-text"><strong>Two paths forward:</strong></p>
        <p class="get-started-text"><strong>Path 1:</strong> Keep watching YouTube tutorials, collecting bookmarks, and waiting for the "right time" to learn. (Spoiler: There isn't one.)</p>
        <p class="get-started-text"><strong>Path 2:</strong> Join the builders who chose structure over scattered learning and now run their own automation workflows.</p>
        
        <div class="get-started-cta">
          <a href="https://skool.com/aicaptains" class="btn btn-accent btn-large">Start Your Technical Independence Journey</a>
          <p class="cta-subtitle">7-day trial. Complete beginner-friendly. Directory-focused examples. No subscription bloat.</p>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TerminalSimulator from '@/components/TerminalSimulator.vue'
import CourseCtaCard from '@/components/CourseCtaCard.vue'

export default {
  name: 'HomePage',
  components: {
    TerminalSimulator,
    CourseCtaCard
  },
  data() {
    return {
      newUserName: '',
      firstName: '',
      email: '',
      isSubmitting: false,
      turnstileToken: null,
      initialTerminalLines: [
  { type: 'output', content: '\x1b[1;32m=== WELCOME TO THE TERMINAL NAVIGATOR ===\x1b[0m' },
  { type: 'output', content: '\x1b[36mPrepare to embark on your journey as an AI Captain!\x1b[0m' },
  { type: 'output', content: '\x1b[33mDay 1: First steps in the digital ocean...\x1b[0m' },
  { type: 'command', content: 'cd ~/ai-voyage' },
  { type: 'output', content: '\x1b[34mNavigating to your AI command center...\x1b[0m' },
  { type: 'command', content: 'ls' },
  { type: 'output', content: '\x1b[1mtraining-data/  models/  logs/  first-mission.md\x1b[0m' },
  { type: 'command', content: 'cat first-mission.md' },
  { type: 'output', content: '\x1b[35m"Captain\'s First Mission: Initialize your AI toolkit and prepare for departure!"\x1b[0m' },
  { type: 'command', content: 'mkdir new-project' },
  { type: 'output', content: '\x1b[32mCreating your first project space...\x1b[0m' },
  { type: 'command', content: 'cd new-project' },
  { type: 'output', content: '\x1b[34mEntering the project realm. Your journey begins here!\x1b[0m' },
  { type: 'command', content: 'git init' },
  { type: 'output', content: '\x1b[33mInitialized empty Git repository in ~/ai-voyage/new-project/.git/\x1b[0m\n\x1b[33mYour time machine is ready! Now you can track all changes to your digital universe.\x1b[0m' },
  { type: 'command', content: 'echo "# AI Captain\'s Log" > README.md' },
  { type: 'output', content: '\x1b[32mCreating your first log entry...\x1b[0m' },
  { type: 'command', content: 'git add README.md' },
  { type: 'output', content: '\x1b[36mPreparing your first file for the journey ahead...\x1b[0m' },
  { type: 'command', content: 'git commit -m "First commit: The journey begins"' },
  { type: 'output', content: '\x1b[1;32m[main (root-commit) f3d7a2c] First commit: The journey begins\n 1 file changed, 1 insertion(+)\n create mode 100644 README.md\x1b[0m' },
  { type: 'command', content: 'npm init -y' },
  { type: 'output', content: '\x1b[32mPackage.json created successfully\x1b[0m' },
  { type: 'command', content: 'npm install ai-toolkit@latest' },
  { type: 'output', content: '\x1b[36madded 157 packages\nfound 0 vulnerabilities\x1b[0m' },
  { type: 'command', content: 'python -m venv .env' },
  { type: 'output', content: '\x1b[35mCreating a protected environment for your AI experiments...\x1b[0m' },
  { type: 'command', content: 'source .env/bin/activate' },
  { type: 'output', content: '\x1b[1;32m(.env) \x1b[0m\x1b[32mEnvironment activated! Your ship is now protected from cosmic interference.\x1b[0m' },
  { type: 'command', content: 'pip install transformers torch numpy' },
  { type: 'output', content: '\x1b[36mSuccessfully installed numpy torch transformers\x1b[0m' },
  { type: 'command', content: 'ls' },
  { type: 'output', content: '\x1b[1mREADME.md  package.json  node_modules/  .env/  package-lock.json\x1b[0m' },
  { type: 'command', content: 'echo "console.log(\'Hello, AI Captain!\')" > captain.js' },
  { type: 'output', content: '\x1b[32mWriting your first command script...\x1b[0m' },
  { type: 'command', content: 'node captain.js' },
  { type: 'output', content: '\x1b[1;36mHello, AI Captain!\x1b[0m' },
  { type: 'output', content: '\x1b[1;33m=== CONGRATULATIONS! ===\x1b[0m' },
  { type: 'output', content: '\x1b[32mYou\'ve successfully prepared your terminal environment for the AI voyage ahead.\x1b[0m' },
  { type: 'output', content: '\x1b[36mYour tools are initialized, your repository is tracking changes,\nand both JavaScript and Python environments are ready for your commands.\x1b[0m' },
  { type: 'output', content: '\x1b[35m"With great terminal power comes great AI responsibility."\x1b[0m' },
  { type: 'output', content: '\x1b[1;32m=== READY FOR YOUR NEXT COMMAND, CAPTAIN! ===\x1b[0m' }
],
      demoCommands: [
        'git status',
        'npm install',
        'npm run dev'
      ]
    }
  },
  computed: {
    ...mapState(['userName', 'hasApiKey'])
  },
  methods: {
    startJourney() {
      if (this.newUserName.trim()) {
        this.$store.commit('setUserName', this.newUserName.trim())
      }
    },
    scrollToChallenge() {
      const challengeSection = document.querySelector('.commander-challenge')
      if (challengeSection) {
        challengeSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    scrollToBootcamp() {
      const bootcampSection = document.querySelector('.bootcamp-reminder')
      if (bootcampSection) {
        bootcampSection.scrollIntoView({ behavior: 'smooth' })
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
  padding: 8rem 1rem;
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

.hero-icon {
  display: flex;
  justify-content: left;
  margin-bottom: 2rem;
}

.terminal-icon {
  height: 80px; /* 2x the original 40px size */
  width: auto;
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
  justify-content: flex-start;
  flex-wrap: wrap;
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

.cta-subtitle {
  margin-top: 1rem;
  font-style: italic;
  opacity: 0.8;
  font-size: 0.9rem;
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

/* Bootcamp CTA Section */
.bootcamp-cta-section {
  margin: 3rem 0;
  padding: 0 1rem;
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
    align-items: center;
  }
  
  .button-group .btn {
    width: 100%;
    max-width: 300px;
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

.getting-started-cta {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.getting-started-cta .btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .getting-started-cta {
    margin-top: 2rem;
  }
}

.bootcamp-signup {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.bootcamp-text {
  text-align: center;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
}

.bootcamp-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
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
  
  .bootcamp-signup {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }
}
</style>