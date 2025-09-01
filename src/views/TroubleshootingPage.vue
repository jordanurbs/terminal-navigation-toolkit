<template>
    <div class="troubleshooting-page">
      <div class="container">
        <h1 class="page-title">Command Line Troubleshooting Guide</h1>
        <p class="page-subtitle">From "What Just Happened?!" to "I've Got This!"</p>
        
        <div class="intro-card">
          <p class="intro-text">
            <em>Even the best developers get error messages.<br>The difference is that experienced captains know how to decode and fix them!</em>
          </p>
        </div>
        
        <div class="search-section">
          <div class="search-container">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search for error messages or issues..." 
              class="search-input"
            >
            <button class="search-button" @click="searchErrors">Search</button>
          </div>
          <p class="search-helper">Try searching for "permission denied", "command not found", or "no such file"</p>
          <p v-if="searchQuery" class="search-results-count">
            Found {{ filteredErrors.length }} results
          </p>
        </div>
        
        <div class="error-categories">
          <button 
            v-for="category in errorCategories" 
            :key="category.id"
            class="error-category-button"
            :class="{ active: selectedCategory === category.id }"
            @click="setSelectedCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        
        <!-- Show error list when searching -->
        <transition name="fade">
          <div v-if="searchQuery || selectedCategory !== 'all'" class="error-list">
            <h2 class="section-title">Search Results</h2>
            
            <transition-group name="list" tag="div" class="error-cards-container">
              <div 
                v-for="error in filteredErrors" 
                :key="error.id"
                class="error-card"
              >
                <div class="error-header">
                  <div class="error-message">{{ error.message }}</div>
                  <div class="error-category-tag">{{ getCategoryName(error.category) }}</div>
                </div>
                
                <div class="error-content">
                  <div class="error-section">
                    <h3>What It Actually Means:</h3>
                    <p>{{ error.meaning }}</p>
                  </div>
                  
                  <div class="error-section">
                    <h3>How To Fix It:</h3>
                    <ol class="fix-steps">
                      <li v-for="(step, index) in error.steps" :key="index">{{ step }}</li>
                    </ol>
                  </div>
                  
                  <div class="error-section">
                    <h3>Business Example:</h3>
                    <p>{{ error.businessExample }}</p>
                  </div>
                </div>
              </div>
            </transition-group>
            
            <div v-if="filteredErrors.length === 0" class="no-results">
              <p>No error messages match your search. Try broader terms or check a different category.</p>
              <button class="btn btn-primary" @click="resetFilters">Reset Filters</button>
            </div>
          </div>
        </transition>

        <!-- Show flowchart only when not searching -->
        <div v-if="!searchQuery && selectedCategory === 'all'" class="flowchart-section">
          <h2 class="section-title">The "What Went Wrong?" Diagnostic Flowchart</h2>
          <div class="flowchart">
            <div class="flowchart-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Did the command run at all?</h3>
                <div class="step-options">
                  <div class="option">
                    <span class="option-direction">No →</span> 
                    <span class="option-result">Check if the command exists (spelling/installation)</span>
                  </div>
                  <div class="option">
                    <span class="option-direction">Yes →</span> 
                    <span class="option-result">Move to next question</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flowchart-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Did it give an error message?</h3>
                <div class="step-options">
                  <div class="option">
                    <span class="option-direction">Yes →</span> 
                    <span class="option-result">Look up the specific error in this guide</span>
                  </div>
                  <div class="option">
                    <span class="option-direction">No, but it didn't work →</span> 
                    <span class="option-result">Check for silent failures (see below)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flowchart-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Was the command in the right location?</h3>
                <div class="step-options">
                  <div class="option">
                    <span class="option-direction">No →</span> 
                    <span class="option-result">Navigate to the correct directory</span>
                  </div>
                  <div class="option">
                    <span class="option-direction">Yes →</span> 
                    <span class="option-result">Move to next question</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flowchart-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>Do you have the right permissions?</h3>
                <div class="step-options">
                  <div class="option">
                    <span class="option-direction">No →</span> 
                    <span class="option-result">Adjust permissions or use sudo (carefully!)</span>
                  </div>
                  <div class="option">
                    <span class="option-direction">Yes →</span> 
                    <span class="option-result">Move to next question</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flowchart-step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>Is the syntax correct?</h3>
                <div class="step-options">
                  <div class="option">
                    <span class="option-direction">No →</span> 
                    <span class="option-result">Check command documentation (use `man command-name`)</span>
                  </div>
                  <div class="option">
                    <span class="option-direction">Yes →</span> 
                    <span class="option-result">Move to next question</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flowchart-step">
              <div class="step-number">6</div>
              <div class="step-content">
                <h3>Are all dependencies installed?</h3>
                <div class="step-options">
                  <div class="option">
                    <span class="option-direction">No →</span> 
                    <span class="option-result">Install missing dependencies</span>
                  </div>
                  <div class="option">
                    <span class="option-direction">Yes →</span> 
                    <span class="option-result">You may have found a rare issue; time to Google!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="silent-failures-section">
          <h2 class="section-title">Silent Failures (When Nothing Happens, Good or Bad)</h2>
          
          <div class="failure-cards">
            <div class="failure-card">
              <h3>The "Hanging" Command</h3>
              <p><strong>What It Looks Like:</strong> You type a command, press Enter, and nothing happens—not even an error message.</p>
              <h4>Common Causes:</h4>
              <ol>
                <li>The command is waiting for input (press Ctrl+C to cancel)</li>
                <li>The command is running a long process (be patient)</li>
                <li>The terminal session is frozen (try opening a new terminal window)</li>
              </ol>
              <p><strong>Business Example:</strong> You're running a script to process customer data, and it's taking longer than expected.</p>
            </div>
            
            <div class="failure-card">
              <h3>The "No News Is Good News" Scenario</h3>
              <p><strong>What It Looks Like:</strong> The command completes silently with no confirmation or error.</p>
              <p><strong>What It Usually Means:</strong> In the Unix philosophy, success is silent. Many commands only show output when something goes wrong.</p>
              <h4>How To Verify Success:</h4>
              <ol>
                <li>Use <code>echo $?</code> immediately after running the command (0 means success)</li>
                <li>Check if the expected files were created/modified</li>
                <li>Use verbose flags like <code>-v</code> for more feedback</li>
              </ol>
              <p><strong>Business Example:</strong> You copied a large project folder and aren't sure if it completed successfully.</p>
            </div>
          </div>
        </div>
        
        <div class="emergency-recovery-section">
          <h2 class="section-title">Emergency Recovery Commands</h2>
          
          <div class="emergency-cards">
            <div class="emergency-card">
              <h3>When You Need to Stop a Runaway Process</h3>
              <div class="terminal-commands">
                <div class="command-line">
                  <span class="comment"># Stop the current command</span>
                  <pre class="command">Ctrl+C</pre>
                </div>
                <div class="command-line">
                  <span class="comment"># List all running processes</span>
                  <pre class="command">ps aux | grep "search-term"</pre>
                </div>
                <div class="command-line">
                  <span class="comment"># Force kill a process by ID</span>
                  <pre class="command">kill -9 process-id</pre>
                </div>
                <div class="command-line">
                  <span class="comment"># Force quit a program by name</span>
                  <pre class="command">killall program-name</pre>
                </div>
              </div>
            </div>
            
            <div class="emergency-card">
              <h3>When You've Made a Mess of Your Current Directory</h3>
              <div class="terminal-commands">
                <div class="command-line">
                  <span class="comment"># Discard all uncommitted changes in a git repository</span>
                  <pre class="command">git reset --hard HEAD</pre>
                </div>
                <div class="command-line">
                  <span class="comment"># Go back to your home directory</span>
                  <pre class="command">cd ~</pre>
                </div>
                <div class="command-line">
                  <span class="comment"># Open current directory in Finder (Mac) or Explorer (Windows)</span>
                  <pre class="command">open .    # Mac
  explorer . # Windows</pre>
                </div>
              </div>
            </div>
            
            <div class="emergency-card">
              <h3>When You've Accidentally Started Editing in Vim</h3>
              <div class="terminal-commands">
                <div class="command-line">
                  <span class="comment"># Exit without saving</span>
                  <pre class="command">Press Esc, then type :q! and press Enter</pre>
                </div>
                <div class="command-line">
                  <span class="comment"># Save and exit</span>
                  <pre class="command">Press Esc, then type :wq and press Enter</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- First CTA - Conversation-Driven Development after Emergency Recovery -->
        <div class="cta-section emergency-cta">
          <CourseCtaCard
            course-title="Master the Storm, Command the Code"
            course-subtitle="Turn troubleshooting from panic into power by understanding how things actually work"
            course-description="Emergency recovery is good. Never needing it is better. Learn to build with confidence instead of stumbling through fixes."
            :bullet-points="[
              '25 lessons that demystify the building process from conversation to deployment',
              'Learn to read error messages like navigation charts',
              'Build real projects while mastering the fundamentals',
              'Transform from \"something\'s broken\" to \"I know exactly what\'s wrong\"'
            ]"
            image-url="/images/conversation-driven-dev-min.png"
            image-alt="Conversation-Driven Development Course"
            cta-text="Navigate From Chaos to Clarity"
            supporting-text="Join our crew of confident builders who troubleshoot like captains, not passengers."
            student-count="350"
          />
        </div>
        
        <div class="mindset-section">
          <h2 class="section-title">The Captain's Troubleshooting Mindset</h2>
          <div class="mindset-card">
            <ol class="mindset-list">
              <li><strong>Stay calm</strong> - Every developer encounters errors constantly</li>
              <li><strong>Read the error message carefully</strong> - The solution is often hidden in plain sight</li>
              <li><strong>Check your current location</strong> - Many errors happen because you're in the wrong directory</li>
              <li><strong>Try the simplest fix first</strong> - Often it's just a typo or missing dependency</li>
              <li><strong>Document solutions in your Captain's Log</strong> - You'll face this error again someday</li>
            </ol>
            <p class="mindset-reminder">Remember: The difference between a passenger and a captain isn't avoiding errors—it's knowing how to navigate through them.</p>
          </div>
        </div>
        
        <div class="getting-help-section">
          <h2 class="section-title">When to Ask for Help</h2>
          <div class="help-card">
            <p>Even experienced captains sometimes need guidance. If you've spent more than 30 minutes troubleshooting without progress:</p>
            
            <div class="help-content">
              <div class="help-item">
                <h3>Formulate a clear question with:</h3>
                <ul>
                  <li>The exact command you ran</li>
                  <li>The complete error message</li>
                  <li>What you've already tried</li>
                </ul>
              </div>
              
              <div class="help-item">
                <h3>Best places to ask:</h3>
                <ul>
                  <li>Stack Overflow</li>
                  <li>GitHub Issues for specific projects</li>
                  <li>Reddit communities for programming languages</li>
                  <li>AI assistants like Claude or ChatGPT</li>
                </ul>
              </div>
            </div>
            
            <p class="help-reminder">The captains who progress fastest are those who balance figuring things out themselves with knowing when to ask for help.</p>
          </div>
        </div>
        
        <!-- Second CTA - Architectural Literacy after Getting Help -->
        <div class="cta-section help-cta">
          <CourseCtaCard
            course-title="Build Your Technical Foundation"
            course-subtitle="Stop depending on others - master the core systems that power every application"
            course-description="The difference between passengers and captains? Captains understand their ship from deck to keel."
            :bullet-points="[
              '6 modules covering the fundamentals every builder needs to know',
              'From Command Line basics to API mastery and version control',
              'Build an AI chatbot capstone that proves your new capabilities',
              'Graduate from asking for help to providing solutions'
            ]"
            image-url="/images/architectural-literacy-min.png"
            image-alt="Architectural Literacy Course"
            cta-text="Claim Your Captain's Credentials"
            supporting-text="Start your 7-day journey from dependency to independence."
            student-count="350"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CourseCtaCard from '../components/CourseCtaCard.vue'

  export default {
    name: 'TroubleshootingPage',
    components: {
      CourseCtaCard
    },
    data() {
      return {
        searchQuery: '',
        selectedCategory: 'all',
        errorCategories: [
          { id: 'all', name: 'All Errors' },
          { id: 'navigation', name: 'Navigation & File Errors' },
          { id: 'permission', name: 'Permission Errors' },
          { id: 'command', name: 'Command Errors' },
          { id: 'git', name: 'Git & Version Control' },
          { id: 'dependency', name: 'Package & Dependency' }
        ],
        errors: [
          {
            id: 'no-such-file',
            message: 'bash: cd: my-folder: No such file or directory',
            category: 'navigation',
            meaning: 'The folder you\'re trying to move into doesn\'t exist at your current location.',
            steps: [
              'Check your spelling (case matters!)',
              'Use `ls` to list available directories',
              'Use `pwd` to confirm where you currently are'
            ],
            businessExample: 'You\'re trying to access your client project folder, but you\'re in the wrong parent directory.'
          },
          {
            id: 'permission-denied',
            message: 'Permission denied',
            category: 'permission',
            meaning: 'You don\'t have the necessary permissions to access or modify a file/folder.',
            steps: [
              'For your own files: `chmod u+rw filename` to give yourself read/write permission',
              'For system files: Use `sudo` before your command (but be careful!)',
              'For shared folders: Check with your administrator about proper permissions'
            ],
            businessExample: 'You\'re trying to update your website configuration files, but they\'re owned by the web server user.'
          },
          {
            id: 'command-not-found',
            message: 'command not found',
            category: 'dependency',
            meaning: 'The command you\'re trying to run isn\'t installed or isn\'t in your PATH.',
            steps: [
              'Check if the program is installed',
              'Verify it\'s in your system\'s PATH',
              'Try using the full path to the program'
            ],
            businessExample: 'You\'re trying to run `git` but haven\'t installed Git yet.'
          },
          {
            id: 'not-git-repo',
            message: 'fatal: not a git repository',
            category: 'git',
            meaning: 'You\'re trying to run a Git command, but your current directory isn\'t tracked by Git.',
            steps: [
              'Navigate to the correct project folder',
              'Check if `.git` folder exists (use `ls -la`)',
              'If starting a new project, run `git init`'
            ],
            businessExample: 'You\'re trying to check the status of website changes, but you\'re in the parent folder instead of the project folder.'
          },
          {
            id: 'failed-push',
            message: 'error: failed to push some refs',
            category: 'git',
            meaning: 'The remote repository has changes you don\'t have locally.',
            steps: [
              'Run `git pull` to get the latest changes',
              'Resolve any merge conflicts',
              'Then try pushing again'
            ],
            businessExample: 'Your teammate updated the pricing page while you were updating the contact page, and you need to integrate both changes.'
          },
          {
            id: 'module-not-found',
            message: 'Error: Cannot find module \'package-name\'',
            category: 'dependency',
            meaning: 'Your Node.js project is missing a required package.',
            steps: [
              'Install the missing package: `npm install package-name`',
              'Check if it should be in `package.json`',
              'Run `npm install` to install all project dependencies'
            ],
            businessExample: 'You downloaded an AI project template but forgot to install its dependencies.'
          },
          {
            id: 'python-not-found',
            message: 'zsh: command not found: python',
            category: 'dependency',
            meaning: 'Python isn\'t installed or isn\'t in your PATH.',
            steps: [
              'On Mac: Try `python3` instead of `python`',
              'Install Python if needed',
              'Consider using virtual environments for Python projects'
            ],
            businessExample: 'You\'re trying to run an AI script on a new computer that doesn\'t have Python configured.'
          }
        ]
      }
    },
    mounted() {
      console.log('TroubleshootingPage mounted');
      console.log('Initial errors:', this.errors);
      console.log('Initial filtered errors:', this.filteredErrors);
    },
    computed: {
      filteredErrors() {
        let filtered = this.errors;
        
        // Filter by category
        if (this.selectedCategory !== 'all') {
          filtered = filtered.filter(error => error.category === this.selectedCategory);
        }
        
        // Filter by search query
        if (this.searchQuery.trim() !== '') {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(error => 
            error.message.toLowerCase().includes(query) ||
            error.meaning.toLowerCase().includes(query) ||
            error.steps.some(step => step.toLowerCase().includes(query)) ||
            error.businessExample.toLowerCase().includes(query)
          );
        }
        
        console.log('Filtered errors:', filtered);
        console.log('Number of filtered errors:', filtered.length);
        return filtered;
      }
    },
    methods: {
      searchErrors() {
        console.log('Search button clicked');
        console.log('Current search query:', this.searchQuery);
        console.log('Selected category:', this.selectedCategory);
        console.log('Filtered errors:', this.filteredErrors);
        console.log('Number of filtered errors:', this.filteredErrors.length);
      },
      
      setSelectedCategory(categoryId) {
        console.log('Category changed to:', categoryId);
        this.selectedCategory = categoryId;
      },
      
      resetFilters() {
        console.log('Resetting filters');
        this.searchQuery = '';
        this.selectedCategory = 'all';
      },
      
      getCategoryName(categoryId) {
        const category = this.errorCategories.find(cat => cat.id === categoryId);
        return category ? category.name : 'General Error';
      }
    }
  }
  </script>
  
  <style scoped>
  .troubleshooting-page {
    padding: 2rem 0;
    background-color: #f8fafc;
    min-height: 100vh;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  :root {
    --primary: #0f4c81;
    --primary-dark: #072f4a;
    --secondary: #64748b;
    --border: #e2e8f0;
    --text: #1a202c;
    --text-light: #64748b;
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
  
  .intro-card {
    background-color: var(--primary);
    color: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .intro-text {
    font-size: 1.25rem;
    margin: 0;
  }
  
  .search-section {
    margin-bottom: 2rem;
  }
  
  .search-container {
    display: flex;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border);
    border-right: none;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
  }
  
  .search-button {
    padding: 0.75rem 1.5rem;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-button:hover {
    background-color: #072f4a;
  }
  
  .search-helper {
    text-align: center;
    color: var(--text-light);
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  
  .search-results-count {
    margin-top: 0.5rem;
    color: var(--primary);
    font-weight: 500;
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2);
  }
  
  .error-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    justify-content: center;
  }
  
  .error-category-button {
    padding: 0.5rem 1rem;
    background-color: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .error-category-button:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  
  .error-category-button.active {
    background-color: var(--primary);
    color: white;
    border-color: var(--primary);
  }
  
  .section-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .flowchart-section {
    margin-bottom: 3rem;
  }
  
  .flowchart {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    padding: 2rem;
  }
  
  .flowchart-step {
    display: flex;
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .flowchart-step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 40px;
    left: 20px;
    width: 2px;
    height: calc(100% + 1.5rem);
    background-color: var(--secondary);
  }
  
  .flowchart-step:last-child {
    margin-bottom: 0;
  }
  
  .step-number {
    background-color: var(--secondary);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.25rem;
    margin-right: 1.5rem;
    z-index: 1;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content h3 {
    margin-bottom: 0.75rem;
    color: var(--primary);
  }
  
  .step-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .option {
    display: flex;
    align-items: baseline;
  }
  
  .option-direction {
    min-width: 80px;
    color: var(--secondary);
    font-weight: 600;
  }
  
  .option-result {
    color: var(--text);
  }
  
  .error-list {
    margin-bottom: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
  }
  
  .error-card {
    background-color: white;
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 1.5rem;
    display: block;
    opacity: 1;
    z-index: 1;
    position: relative;
  }
  
  .error-header {
    padding: 1rem;
    background-color: #f8fafc;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .error-message {
    font-family: monospace;
    color: #e53e3e;
    font-weight: 600;
    font-size: 1.1rem;
    word-break: break-word;
  }
  
  .error-category-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background-color: var(--primary);
    color: white;
    border-radius: 999px;
    white-space: nowrap;
    margin-left: 1rem;
  }
  
  .error-content {
    padding: 1.5rem;
    background-color: white;
  }
  
  .error-section {
    margin-bottom: 1.5rem;
  }
  
  .error-section:last-child {
    margin-bottom: 0;
  }
  
  .error-section h3 {
    color: var(--primary);
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }
  
  .fix-steps {
    padding-left: 1.5rem;
    margin: 0;
  }
  
  .fix-steps li {
    margin-bottom: 0.5rem;
  }
  
  .fix-steps li:last-child {
    margin-bottom: 0;
  }
  
  .no-results {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .no-results p {
    margin-bottom: 1rem;
    color: var(--text-light);
  }
  
  .silent-failures-section, .emergency-recovery-section, .mindset-section, .getting-help-section {
    margin-bottom: 3rem;
  }
  
  .failure-cards, .emergency-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }
  
  .failure-card, .emergency-card, .mindset-card, .help-card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .failure-card h3, .emergency-card h3 {
    color: var(--primary);
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  
  .failure-card h4 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: var(--text);
  }
  
  .failure-card ol, .failure-card ul {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .terminal-commands {
    background-color: #1a202c;
    border-radius: 4px;
    padding: 1rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    margin-top: 1rem;
  }
  
  .command-line {
    margin-bottom: 0.75rem;
  }
  
  .command-line:last-child {
    margin-bottom: 0;
  }
  
  .comment {
    color: #a0aec0;
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .command {
    color: white;
    margin: 0;
    white-space: pre-wrap;
  }
  
  .mindset-list {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .mindset-list li {
    margin-bottom: 0.75rem;
  }
  
  .mindset-reminder {
    font-style: italic;
    text-align: center;
    color: var(--primary);
    font-weight: 600;
  }
  
  .help-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .help-item h3 {
    color: var(--primary);
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }
  
  .help-item ul {
    padding-left: 1.5rem;
  }
  
  .help-item li {
    margin-bottom: 0.5rem;
  }
  
  .help-reminder {
    font-style: italic;
    text-align: center;
    color: var(--text-light);
  }
  
  code {
    font-family: 'JetBrains Mono', monospace;
    background-color: #f1f5f9;
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  @media (max-width: 768px) {
    .flowchart {
      padding: 1.5rem;
    }
    
    .flowchart-step {
      flex-direction: column;
    }
    
    .flowchart-step:not(:last-child)::after {
      left: 20px;
      top: 40px;
      height: calc(100% - 40px + 1.5rem);
    }
    
    .step-number {
      margin-bottom: 1rem;
    }
    
    .error-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .error-category-tag {
      margin-top: 0.5rem;
    }
    
    .help-content {
      grid-template-columns: 1fr;
    }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .error-cards-container {
    position: relative;
  }
  
  .error-card {
    transition: all 0.3s ease;
  }
  
  .btn-primary {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: var(--primary-dark);
  }

  /* CTA Sections */
  .cta-section {
    margin: 3rem 0;
    padding: 0 1rem;
  }

  .emergency-cta {
    border-top: 2px solid var(--accent);
    padding-top: 2rem;
  }

  .help-cta {
    border-top: 2px solid var(--secondary);
    padding-top: 2rem;
  }
  </style>