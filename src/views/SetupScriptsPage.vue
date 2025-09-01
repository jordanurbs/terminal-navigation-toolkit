<template>
  <div class="setup-scripts-page">
    <div class="container">
      <h1 class="page-title">Terminal Setup Scripts</h1>
      <p class="page-subtitle">Transform your terminal from intimidating to inviting</p>
      
      <div class="intro-card">
        <p class="intro-text">
          One of the biggest barriers to command line mastery is a boring, unintuitive terminal. These custom setup scripts will transform your terminal into a productive environment with helpful shortcuts, visual cues, and time-saving functions.
        </p>
      </div>
      
      <div class="os-selector">
        <button 
          class="os-button" 
          :class="{ active: selectedOS === 'mac' }"
          @click="setSelectedOS('mac')"
        >
          macOS
        </button>
        <button 
          class="os-button" 
          :class="{ active: selectedOS === 'windows' }"
          @click="setSelectedOS('windows')"
        >
          Windows
        </button>
        <button 
          class="os-button" 
          :class="{ active: selectedOS === 'linux' }"
          @click="setSelectedOS('linux')"
        >
          Linux
        </button>
      </div>
      
      <div class="setup-content" v-if="selectedOS === 'mac'">
        <h2 class="content-title">macOS Terminal Setup</h2>
        
        <div class="video-player">
          <div class="video-placeholder">
            <div class="play-icon">▶</div>
            <p>Setup Script Walkthrough for macOS</p>
          </div>
        </div>
        
        <div class="setup-steps">
          <h3>Installation Steps</h3>
          <ol>
            <li>Open Terminal</li>
            <li>Copy the script below</li>
            <li>Paste it into your terminal and press Enter</li>
            <li>Follow any prompts during installation</li>
            <li>When complete, restart your terminal or run: <code>source ~/.bash_profile</code></li>
          </ol>
        </div>
        
        <div class="script-card">
          <div class="script-header">
            <h3>AI Captain's Terminal Setup Script for macOS</h3>
            <button class="btn btn-sm btn-secondary" @click="copyScript('mac')">
              Copy Script
            </button>
          </div>
          
          <div class="script-preview">
            <pre class="script-code">#!/bin/bash
# AI Captain's Terminal Setup Script
# Created by Jordan Urbs
# This script transforms your terminal from intimidating to inviting
# by setting up useful aliases, colors, and productivity enhancements

echo "======================================="
echo "  AI Captain's Terminal Setup Script   "
echo "======================================="
echo "Transforming your terminal from intimidating to inviting..."
echo ""

# Define colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create backup of existing profile if it exists
if [ -f ~/.bash_profile ]; then
    echo -e "${YELLOW}Creating backup of existing .bash_profile...${NC}"
    cp ~/.bash_profile ~/.bash_profile.backup.$(date +%Y%m%d%H%M%S)
    echo -e "${GREEN}Backup created!${NC}"
fi

# Create or update bash profile
echo -e "${BLUE}Setting up your AI Captain's bash profile...${NC}"

cat > ~/.ai_captain_profile << 'EOL'
# ===========================================
# AI Captain's Terminal Configuration
# ===========================================

# Better directory navigation
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias ~="cd ~"
alias ll="ls -la"   # Detailed file listing
alias lh="ls -lah"  # Show hidden files too

# Project shortcuts
alias projects="cd ~/projects"
alias clients="cd ~/clients"

# Safety nets
alias rm="rm -i"    # Confirm before deleting
alias cp="cp -i"    # Confirm before overwriting
alias mv="mv -i"    # Confirm before overwriting

# Quick file operations
alias search="find . -name"  # Usage: search "*.txt"
alias edit="open -a TextEdit"  # Mac-specific, customize for your editor

# Developer shortcuts
alias gitst="git status"
alias gitco="git checkout"
alias gitcm="git commit -m"
alias gitaa="git add ."
alias gitreset="git reset --hard HEAD"

# AI productivity shortcuts
alias ailog="echo $(date): $1 >> ~/ai_captains_log.txt"  # Log your AI journey
alias setupai="pip install openai langchain python-dotenv"  # Quick AI dev setup

# Reminder of frequently used commands
cheatsheet() {
  echo "===================== CAPTAIN'S QUICK REFERENCE ====================="
  echo "Navigation:     cd [dir], cd .., pwd, ls, find . -name \"pattern\""
  echo "File Ops:       cp [src] [dest], mv [src] [dest], rm [file], mkdir [dir]"
  echo "View Content:   cat [file], head [file], tail [file], grep \"pattern\" [file]"
  echo "Git:            gitst, gitco [branch], gitcm \"message\", gitaa"
  echo "Aliases:        projects, clients, search, edit, ailog, setupai"
  echo "=================================================================="
}

# Add a welcoming prompt with useful info
export PS1="\n\[${GREEN}\]╭─ \[${YELLOW}\]\u\[${NC}\] in \[${BLUE}\]\w\[${NC}\]\n\[${GREEN}\]╰─➤\[${NC}\] "

# Function to create a new project directory with common folders
create_project() {
  if [ -z "$1" ]; then
    echo "Usage: create_project project_name"
    return 1
  fi
  
  mkdir -p "$1"/{src,data,docs,scripts}
  echo "# $1 Project" > "$1/README.md"
  echo "Created new project structure for $1"
  ls -la "$1"
}

# Function to create an AI project with standard setup
create_ai_project() {
  if [ -z "$1" ]; then
    echo "Usage: create_ai_project project_name"
    return 1
  fi
  
  mkdir -p "$1"/{src,data,prompts,models,configs}
  
  # Create virtual environment
  python -m venv "$1/venv"
  
  # Create starter files
  echo "# $1 AI Project" > "$1/README.md"
  
  # Create .env template
  cat > "$1/.env.template" << EOF
# API Keys
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here

# Configuration
MODEL_NAME=gpt-4
TEMPERATURE=0.7
EOF
  
  # Create .gitignore
  cat > "$1/.gitignore" << EOF
# Environment
venv/
.env

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Data
*.csv
*.json
*.xlsx
*.db
EOF
  
  echo "Created new AI project structure for $1"
  ls -la "$1"
  echo "Next steps:"
  echo "1. cd $1"
  echo "2. source venv/bin/activate"
  echo "3. pip install openai langchain pandas python-dotenv"
}

# Initialize a new git repository with standard files
git_init_project() {
  git init
  echo "# $(basename $(pwd))" > README.md
  echo ".DS_Store" > .gitignore
  echo "node_modules/" >> .gitignore
  echo ".env" >> .gitignore
  git add .
  git commit -m "Initial commit"
  echo "Git repository initialized with standard files"
}

echo "AI Captain's Terminal is ready for action!"
echo "Type 'cheatsheet' for a quick command reference"
EOL

# Add sourcing to bash profile if not already there
if grep -q "source ~/.ai_captain_profile" ~/.bash_profile; then
    echo -e "${GREEN}AI Captain's profile already sourced in your .bash_profile${NC}"
else
    echo "" >> ~/.bash_profile
    echo "# Source AI Captain's Terminal Configuration" >> ~/.bash_profile
    echo "source ~/.ai_captain_profile" >> ~/.bash_profile
    echo -e "${GREEN}Added AI Captain's profile to your .bash_profile${NC}"
fi

# Create an oh-my-zsh configuration for those who use zsh
if [ -f ~/.zshrc ]; then
    echo -e "${YELLOW}ZSH detected, configuring for zsh as well...${NC}"
    if grep -q "source ~/.ai_captain_profile" ~/.zshrc; then
        echo -e "${GREEN}AI Captain's profile already sourced in your .zshrc${NC}"
    else
        echo "" >> ~/.zshrc
        echo "# Source AI Captain's Terminal Configuration" >> ~/.zshrc
        echo "source ~/.ai_captain_profile" >> ~/.zshrc
        echo -e "${GREEN}Added AI Captain's profile to your .zshrc${NC}"
    fi
fi

echo ""
echo -e "${GREEN}=======================================${NC}"
echo -e "${GREEN}  AI Captain's Terminal Setup Complete  ${NC}"
echo -e "${GREEN}=======================================${NC}"
echo ""
echo "To activate your new terminal configuration:"
echo "1. Run: source ~/.bash_profile"
echo "   (or if using zsh: source ~/.zshrc)"
echo ""
echo "2. Type 'cheatsheet' to see your quick reference"
echo ""
echo "3. Use 'create_project project_name' to create a new project structure"
echo ""
echo "4. Use 'create_ai_project ai_project_name' to create a new AI project"
echo ""
echo "Welcome aboard, Captain! The command line is now yours to navigate."</pre>
          </div>
          
          <div class="download-section">
            <a href="#" class="btn btn-primary" @click.prevent="downloadScript('mac')">
              Download Script
            </a>
          </div>
        </div>
        
        <div class="script-features">
          <h3>Script Features</h3>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h4>Command Shortcuts</h4>
              <p>Aliases for common operations that save keystrokes and time</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h4>Colorful Prompt</h4>
              <p>Custom prompt that shows your location with visual clarity</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🛠️</div>
              <h4>Project Creator</h4>
              <p>Functions to scaffold new projects with proper directory structure</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🤖</div>
              <h4>AI Project Builder</h4>
              <p>Specialized function for creating AI projects with proper configuration</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🦺</div>
              <h4>Safety Nets</h4>
              <p>Protections against accidental file deletions and overwrites</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📝</div>
              <h4>Quick Reference</h4>
              <p>Built-in cheatsheet for common commands</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="setup-content" v-if="selectedOS === 'windows'">
        <h2 class="content-title">Windows Terminal Setup</h2>
        
        <div class="video-player">
          <div class="video-placeholder">
            <div class="play-icon">▶</div>
            <p>Setup Script Walkthrough for Windows</p>
          </div>
        </div>
        
        <div class="setup-steps">
          <h3>Installation Steps</h3>
          <ol>
            <li>First, <a href="#" @click.prevent="showWindowsPrerequisites = !showWindowsPrerequisites">install prerequisites</a></li>
            <div v-if="showWindowsPrerequisites" class="prerequisites">
              <p>To get the most out of Windows command line, we recommend installing:</p>
              <ul>
                <li><a href="https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701" target="_blank">Windows Terminal</a> - A modern terminal application</li>
                <li><a href="https://gitforwindows.org/" target="_blank">Git for Windows</a> - Includes Git Bash, which provides Unix-like commands</li>
                <li><a href="https://learn.microsoft.com/en-us/windows/wsl/install" target="_blank">Windows Subsystem for Linux (WSL)</a> - For full Linux compatibility (optional)</li>
              </ul>
            </div>
            <li>Open PowerShell as Administrator</li>
            <li>Copy the script below</li>
            <li>Paste it into your PowerShell and press Enter</li>
            <li>Follow any prompts during installation</li>
            <li>When complete, restart your terminal</li>
          </ol>
        </div>
        
        <div class="script-card">
          <div class="script-header">
            <h3>AI Captain's Terminal Setup Script for Windows</h3>
            <button class="btn btn-sm btn-secondary" @click="copyScript('windows')">
              Copy Script
            </button>
          </div>
          
          <div class="script-preview">
            <pre class="script-code"># Windows PowerShell script coming soon</pre>
          </div>
          
          <div class="download-section">
            <a href="#" class="btn btn-primary" @click.prevent="downloadScript('windows')">
              Download Script
            </a>
          </div>
        </div>
        
        <div class="script-features">
          <h3>Script Features</h3>
          <p class="coming-soon">Windows script features coming soon!</p>
        </div>
      </div>
      
      <div class="setup-content" v-if="selectedOS === 'linux'">
        <h2 class="content-title">Linux Terminal Setup</h2>
        
        <div class="video-player">
          <div class="video-placeholder">
            <div class="play-icon">▶</div>
            <p>Setup Script Walkthrough for Linux</p>
          </div>
        </div>
        
        <div class="setup-steps">
          <h3>Installation Steps</h3>
          <ol>
            <li>Open Terminal</li>
            <li>Copy the script below</li>
            <li>Paste it into your terminal and press Enter</li>
            <li>Follow any prompts during installation</li>
            <li>When complete, restart your terminal or run: <code>source ~/.bashrc</code></li>
          </ol>
        </div>
        
        <div class="script-card">
          <div class="script-header">
            <h3>AI Captain's Terminal Setup Script for Linux</h3>
            <button class="btn btn-sm btn-secondary" @click="copyScript('linux')">
              Copy Script
            </button>
          </div>
          
          <div class="script-preview">
            <pre class="script-code"># Linux Bash script coming soon</pre>
          </div>
          
          <div class="download-section">
            <a href="#" class="btn btn-primary" @click.prevent="downloadScript('linux')">
              Download Script
            </a>
          </div>
        </div>
        
        <div class="script-features">
          <h3>Script Features</h3>
          <p class="coming-soon">Linux script features coming soon!</p>
        </div>
      </div>
      
      <div class="customization-section">
        <h2 class="section-title">Customizing Your Terminal Further</h2>
        
        <div class="custom-options">
          <div class="option-card">
            <h3>Terminal Themes</h3>
            <p>The default setup provides a clean, professional look. If you want to personalize further, try these theme options:</p>
            <ul>
              <li><strong>macOS:</strong> <a href="https://github.com/ohmyzsh/ohmyzsh" target="_blank">Oh My Zsh</a> with <a href="https://github.com/romkatv/powerlevel10k" target="_blank">Powerlevel10k</a> theme</li>
              <li><strong>Windows:</strong> <a href="https://ohmyposh.dev/" target="_blank">Oh My Posh</a> themes for PowerShell</li>
              <li><strong>Linux:</strong> <a href="https://github.com/ohmyzsh/ohmyzsh" target="_blank">Oh My Zsh</a> or <a href="https://github.com/banga/powerline-shell" target="_blank">Powerline Shell</a></li>
            </ul>
          </div>
          
          <div class="option-card">
            <h3>Font Recommendations</h3>
            <p>A good monospaced font makes terminal work much more pleasant. We recommend:</p>
            <ul>
              <li><a href="https://github.com/JetBrains/JetBrainsMono" target="_blank">JetBrains Mono</a> - Clear, readable with coding ligatures</li>
              <li><a href="https://github.com/tonsky/FiraCode" target="_blank">Fira Code</a> - Popular coding font with ligatures</li>
              <li><a href="https://github.com/microsoft/cascadia-code" target="_blank">Cascadia Code</a> - Microsoft's open-source terminal font</li>
            </ul>
          </div>
          
          <div class="option-card">
            <h3>Custom Commands to Add</h3>
            <p>Consider adding these custom commands to your profile:</p>
            <pre class="command-examples">
# Quick note-taking
note() {
  echo "$(date): $*" >> ~/notes.txt
}

# Open current directory in code editor
alias code="code ."

# Network testing helpers
alias myip="curl ifconfig.me"
alias nettest="ping -c 5 google.com"

# Search in files
alias findtext="grep -r"
            </pre>
          </div>
        </div>
      </div>
      
      <div class="faq-section">
        <h2 class="section-title">Frequently Asked Questions</h2>
        
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question" @click="toggleFAQ(1)">
              What if something goes wrong during installation?
              <span class="toggle-icon">{{ faqOpen[1] ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-show="faqOpen[1]">
              <p>The script creates a backup of your existing configuration before making changes. If something goes wrong, you can restore your original settings by:</p>
              <ul>
                <li>macOS/Linux: <code>cp ~/.bash_profile.backup.TIMESTAMP ~/.bash_profile</code></li>
                <li>Windows: Restore from the backup file created in your user directory</li>
              </ul>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question" @click="toggleFAQ(2)">
              Will this affect my existing terminal setup?
              <span class="toggle-icon">{{ faqOpen[2] ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-show="faqOpen[2]">
              <p>Yes, but carefully. The script:</p>
              <ul>
                <li>Creates backups of your existing configurations</li>
                <li>Adds new functionality without removing existing settings</li>
                <li>Can be easily uninstalled by removing the reference in your profile</li>
              </ul>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question" @click="toggleFAQ(3)">
              How do I uninstall these customizations?
              <span class="toggle-icon">{{ faqOpen[3] ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-show="faqOpen[3]">
              <p>To remove the customizations:</p>
              <ol>
                <li>Open your profile file (<code>~/.bash_profile</code>, <code>~/.zshrc</code>, etc.)</li>
                <li>Remove the line that says <code>source ~/.ai_captain_profile</code></li>
                <li>Optionally delete the <code>~/.ai_captain_profile</code> file</li>
                <li>Restart your terminal</li>
              </ol>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question" @click="toggleFAQ(4)">
              Can I customize the shortcuts and colors?
              <span class="toggle-icon">{{ faqOpen[4] ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-show="faqOpen[4]">
              <p>Absolutely! After installation, you can customize everything by editing the <code>~/.ai_captain_profile</code> file:</p>
              <ul>
                <li>Add or modify aliases for your most common tasks</li>
                <li>Change the colors in the prompt definition</li>
                <li>Add new functions for operations you perform regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Conversation-Driven Development CTA -->
      <div class="cta-section">
        <CourseCtaCard
          course-title="Stop Prompting. Start Building."
          course-subtitle="Transform from AI passenger to coding captain with conversation-driven development"
          course-description="Your terminal setup is just the beginning. Ready to turn those commands into real applications using nothing but conversation?"
          :bullet-points="[
            '25 video lessons that turn English into working applications',
            'Complete machine setup module - no technical background required',
            'Build your first real project using nothing but conversation',
            'Go from \"I wish I could build that\" to \"I just built that\"'
          ]"
          image-url="/images/conversation-driven-dev-min.png"
          image-alt="Conversation-Driven Development Course"
          cta-text="Chart Your Course to Builder Status"
          supporting-text="Join 350+ students who've discovered the secret to building without traditional coding. Your 7-day free trial awaits."
          student-count="350"
        />
      </div>
      
      <div class="next-steps">
        <h2 class="section-title">Next Steps</h2>
        <p class="next-steps-intro">After setting up your terminal, try these commands to test your new environment:</p>
        
        <div class="command-test-list">
          <div class="command-test">
            <div class="test-command">cheatsheet</div>
            <div class="test-description">Shows your quick reference guide</div>
          </div>
          
          <div class="command-test">
            <div class="test-command">create_project my-first-project</div>
            <div class="test-description">Creates a new project directory with standard folders</div>
          </div>
          
          <div class="command-test">
            <div class="test-command">create_ai_project my-first-ai-project</div>
            <div class="test-description">Creates a specialized AI project structure</div>
          </div>
          
          <div class="command-test">
            <div class="test-command">ll</div>
            <div class="test-description">Shows detailed file listing (alias for ls -la)</div>
          </div>
          
          <div class="command-test">
            <div class="test-command">cd my-first-project</div>
            <div class="test-description">Navigate to your new project, note the improved prompt</div>
          </div>
        </div>
        
        <div class="cta-section">
          <router-link to="/challenges" class="btn btn-accent btn-large">
            Continue to the 30-Day Challenge
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCtaCard from '../components/CourseCtaCard.vue'

export default {
  name: 'SetupScriptsPage',
  components: {
    CourseCtaCard
  },
  data() {
    return {
      selectedOS: 'mac',
      showWindowsPrerequisites: false,
      faqOpen: {
        1: false,
        2: false,
        3: false,
        4: false
      }
    }
  },
  methods: {
    setSelectedOS(os) {
      this.selectedOS = os;
    },
    
    copyScript(os) {
      // In a real app, this would copy the script content to clipboard
      console.log(`Copying script for ${os}`);
      alert(`Script for ${os} copied to clipboard!`);
    },
    
    downloadScript(os) {
      // In a real app, this would download the script file
      console.log(`Downloading script for ${os}`);
      alert(`Downloading script for ${os}...`);
    },
    
    toggleFAQ(id) {
      this.faqOpen[id] = !this.faqOpen[id];
    }
  }
}
</script>

<style scoped>
.setup-scripts-page {
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

.intro-card {
  background-color: var(--primary);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
}

.intro-text {
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.6;
}

.os-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.os-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  background-color: white;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.os-button:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.os-button.active {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.setup-content {
  margin-bottom: 3rem;
}

.content-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.video-player {
  margin-bottom: 2rem;
}

.video-placeholder {
  background-color: #1a202c;
  border-radius: 8px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}

.play-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.setup-steps {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.setup-steps h3 {
  color: var(--primary);
  margin-bottom: 1rem;
}

.setup-steps ol {
  padding-left: 1.5rem;
}

.setup-steps li {
  margin-bottom: 0.75rem;
}

.prerequisites {
  background-color: #f8f9fa;
  padding: 1rem;
  margin: 0.5rem 0 1rem 1.5rem;
  border-radius: 4px;
  border-left: 4px solid var(--accent);
}

.prerequisites p {
  margin-top: 0;
}

.prerequisites ul {
  padding-left: 1.5rem;
}

.script-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.script-header {
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.script-header h3 {
  margin: 0;
  color: var(--primary);
}

.script-preview {
  max-height: 400px;
  overflow-y: auto;
  background-color: #1a202c;
}

.script-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 1rem;
  margin: 0;
  color: white;
  white-space: pre;
}

.download-section {
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid var(--border);
  text-align: center;
}

.script-features {
  margin-bottom: 2rem;
}

.script-features h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h4 {
  color: var(--primary);
  margin-bottom: 0.75rem;
}

.feature-card p {
  color: var(--text-light);
  margin: 0;
}

.section-title {
  text-align: center;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.customization-section {
  margin-bottom: 3rem;
}

.custom-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.option-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.option-card h3 {
  color: var(--primary);
  margin-bottom: 1rem;
}

.option-card ul {
  padding-left: 1.5rem;
}

.option-card li {
  margin-bottom: 0.5rem;
}

.command-examples {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  background-color: #1a202c;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  white-space: pre;
}

.faq-section {
  margin-bottom: 3rem;
}

.faq-list {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.faq-item {
  border-bottom: 1px solid var(--border);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  padding: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #f8f9fa;
}

.toggle-icon {
  font-size: 1.5rem;
  color: var(--primary);
}

.faq-answer {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px dashed var(--border);
  background-color: #f8f9fa;
}

.faq-answer p {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.next-steps {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.next-steps-intro {
  margin-bottom: 2rem;
}

.command-test-list {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.command-test {
  display: flex;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: #f8f9fa;
  align-items: center;
}

.test-command {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  color: var(--primary);
  margin-right: 1rem;
  padding: 0.375rem 0.75rem;
  background-color: #e2e8f0;
  border-radius: 4px;
  flex-shrink: 0;
}

.test-description {
  text-align: left;
  color: var(--text);
}

.cta-section {
  margin-top: 2rem;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

code {
  font-family: 'JetBrains Mono', monospace;
  background-color: #f1f5f9;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.coming-soon {
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  color: var(--text-light);
}

@media (max-width: 768px) {
  .os-selector {
    flex-direction: column;
  }
  
  .script-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .custom-options {
    grid-template-columns: 1fr;
  }
  
  .command-test {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* CTA Section */
.cta-section {
  margin: 3rem 0;
  padding: 0 1rem;
}
</style>