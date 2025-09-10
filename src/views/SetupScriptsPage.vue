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
      
      <!-- Claude Code Alternative Section -->
      <div class="claude-code-section">
        <div class="claude-header">
          <h2 class="claude-title">⚡ Skip the Setup? Try Claude Code Instead 🚀</h2>
          <p class="claude-subtitle">Get a fully configured AI-powered terminal in minutes, not hours</p>
        </div>
        
        <div class="claude-comparison">
          <div class="traditional-approach">
            <h3>Traditional Approach</h3>
            <ul>
              <li>Run terminal setup scripts</li>
              <li>Configure aliases and shortcuts</li>
              <li>Set up AI API keys</li>
              <li>Learn command line basics</li>
              <li>Practice until confident</li>
            </ul>
            <div class="time-estimate">⏱️ Time: 1-2 hours + learning curve</div>
          </div>
          
          <div class="claude-approach">
            <h3>Claude Code Approach</h3>
            <ul>
              <li>Install Claude Code CLI</li>
              <li>Authenticate once</li>
              <li>Start building immediately</li>
              <li>AI handles the complexity</li>
              <li>Focus on your ideas, not syntax</li>
            </ul>
            <div class="time-estimate highlight">⚡ Time: 5-10 minutes</div>
          </div>
        </div>
        
        <div class="claude-installation">
          <h3>Installation & Setup</h3>
          
          <div class="install-tabs">
            <div class="install-method active" data-method="npm">
              <h4>Method 1: NPM (Recommended)</h4>
              <div class="install-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <p><strong>Install Node.js</strong> (if not already installed)</p>
                    <p>Download from <a href="https://nodejs.org" target="_blank">nodejs.org</a> - requires Node.js 18 or higher</p>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <p><strong>Install Claude Code globally</strong></p>
                    <div class="code-block">
                      <code>npm install -g @anthropic-ai/claude-code</code>
                      <button class="copy-btn" @click="copyToClipboard('npm install -g @anthropic-ai/claude-code')">Copy</button>
                    </div>
                  </div>
                </div>
                
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <p><strong>Verify installation</strong></p>
                    <div class="code-block">
                      <code>claude-code --version</code>
                      <button class="copy-btn" @click="copyToClipboard('claude-code --version')">Copy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="authentication-section">
            <h4>Authentication Options</h4>
            <div class="auth-options">
              <div class="auth-option">
                <div class="auth-icon">💳</div>
                <div class="auth-content">
                  <h5>Anthropic Console (Pay-per-use)</h5>
                  <p>Best for: Developers who want precise control over costs</p>
                  <ul>
                    <li>Create account at <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a></li>
                    <li>Add billing method (required for API access)</li>
                    <li>Generate API key and authenticate with <code>claude-code auth</code></li>
                  </ul>
                </div>
              </div>
              
              <div class="auth-option">
                <div class="auth-icon">🎯</div>
                <div class="auth-content">
                  <h5>Claude Pro/Max Subscription</h5>
                  <p>Best for: Regular users who want predictable monthly costs</p>
                  <ul>
                    <li>Subscribe at <a href="https://claude.ai" target="_blank">claude.ai</a> ($20/month Pro or $30/month Max)</li>
                    <li>Use your claude.ai account to authenticate</li>
                    <li>Includes Claude Code access plus web interface</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="getting-started">
            <h4>Getting Started Commands</h4>
            <div class="command-grid">
              <div class="command-item">
                <div class="command-syntax">
                  <code>claude-code auth</code>
                </div>
                <div class="command-desc">Authenticate with your account</div>
              </div>
              
              <div class="command-item">
                <div class="command-syntax">
                  <code>claude-code start</code>
                </div>
                <div class="command-desc">Start Claude Code in current directory</div>
              </div>
              
              <div class="command-item important">
                <div class="command-syntax">
                  <code>claude</code>
                </div>
                <div class="command-desc">
                  <strong>Within your IDE:</strong> Opens Claude Code directly in your editor
                  <div class="command-note">💡 Once Claude Code is running, simply type 'claude' in your IDE's terminal to access the AI assistant</div>
                </div>
              </div>
              
              <div class="command-item">
                <div class="command-syntax">
                  <code>claude-code --help</code>
                </div>
                <div class="command-desc">View all available commands</div>
              </div>
            </div>
          </div>
          
          <div class="claude-benefits">
            <h4>Why Claude Code?</h4>
            <div class="benefits-grid">
              <div class="benefit">
                <div class="benefit-icon">🤖</div>
                <h5>AI-First Development</h5>
                <p>Describe what you want to build in plain English. Claude handles the implementation details.</p>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">⚡</div>
                <h5>Instant Setup</h5>
                <p>No need to learn dozens of command line tools. Start building from day one.</p>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">🔄</div>
                <h5>Conversational Workflow</h5>
                <p>Iterate on your projects through natural conversation, not complex commands.</p>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">🛠️</div>
                <h5>Built-in Best Practices</h5>
                <p>Automatically follows coding conventions, security practices, and project structure.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="decision-helper">
          <h4>Which Approach Is Right for You?</h4>
          <div class="approach-comparison">
            <div class="approach-card">
              <h5>Choose Terminal Scripts If:</h5>
              <ul>
                <li>You want to learn command line fundamentals</li>
                <li>You enjoy customizing your development environment</li>
                <li>You plan to work with multiple programming languages</li>
                <li>You want full control over your terminal setup</li>
              </ul>
            </div>
            
            <div class="approach-card highlight">
              <h5>Choose Claude Code If:</h5>
              <ul>
                <li>You want to start building projects immediately</li>
                <li>You prefer conversation over commands</li>
                <li>You're new to programming or development</li>
                <li>You want AI assistance throughout your workflow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section-divider">
        <span>or continue with traditional terminal setup below</span>
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
          variant="featured"
          course-title="Stop Prompting. Start Building."
          course-subtitle="Transform from AI passenger to coding captain with conversation-driven development"
          course-description="Your terminal setup is just the beginning. Ready to turn those commands into real applications using nothing but conversation?"
          :bullet-points="[
            '25 video lessons that turn English into working applications',
            'Complete machine setup module - no technical background required',
            'Build your first real project using nothing but conversation',
            'Go from wishing you could build that to actually building that'
          ]"
          image-url="/images/conversation-driven-dev-min.png"
          image-alt="Conversation-Driven Development Course"
          cta-text="Chart Your Course to Builder Status"
          supporting-text="Join 20 other students who've discovered the secret to building without traditional coding. Your 7-day free trial awaits."
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
    },
    
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        // Could add a toast notification here
        console.log('Copied to clipboard:', text);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
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

/* Claude Code Section */
.claude-code-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.claude-header {
  text-align: center;
  margin-bottom: 2rem;
}

.claude-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.claude-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.claude-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 2rem;
}

.traditional-approach,
.claude-approach {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
}

.claude-comparison h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.claude-comparison ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.claude-comparison li {
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
}

.claude-comparison li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4ade80;
  font-weight: bold;
}

.time-estimate {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  font-weight: 600;
  text-align: center;
}

.time-estimate.highlight {
  background: rgba(74, 222, 128, 0.2);
  border: 2px solid #4ade80;
}

.claude-installation {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.claude-installation h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.claude-installation h4 {
  color: #e2e8f0;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.install-method h4 {
  margin-top: 0;
  color: white;
}

.install-steps {
  margin-top: 1rem;
}

.step {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.step-number {
  background: #4ade80;
  color: #1f2937;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content p {
  margin: 0 0 0.5rem 0;
}

.code-block {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  font-family: 'JetBrains Mono', monospace;
  gap: 1rem;
}

.code-block code {
  flex: 1;
  background: none;
  color: #4ade80;
  font-weight: 600;
  padding: 0;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.authentication-section {
  margin-top: 2rem;
}

.auth-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

.auth-option {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
}

.auth-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.auth-content h5 {
  margin: 0 0 0.5rem 0;
  color: #4ade80;
  font-size: 1.1rem;
}

.auth-content p {
  margin: 0 0 0.75rem 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.auth-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.auth-content li {
  padding: 0.25rem 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.getting-started {
  margin-top: 2rem;
}

.command-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.command-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1rem;
}

.command-item.important {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  position: relative;
}

.command-note {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(250, 204, 21, 0.1);
  border-left: 3px solid #facc15;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #fbbf24;
}

.command-syntax {
  margin-bottom: 0.5rem;
}

.command-syntax code {
  background: rgba(0, 0, 0, 0.3);
  color: #4ade80;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-weight: 600;
}

.command-desc {
  color: #e2e8f0;
  font-size: 0.9rem;
  margin: 0;
}

.claude-benefits {
  margin-top: 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.benefit {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.benefit h5 {
  margin: 0 0 0.75rem 0;
  color: #4ade80;
  font-size: 1.1rem;
}

.benefit p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
  line-height: 1.5;
}

.decision-helper {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
}

.decision-helper h4 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.3rem;
}

.approach-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.approach-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  border: 2px solid transparent;
}

.approach-card.highlight {
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
}

.approach-card h5 {
  margin: 0 0 1rem 0;
  color: #4ade80;
  font-size: 1.1rem;
}

.approach-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.approach-card li {
  padding: 0.375rem 0 0.375rem 1.25rem;
  position: relative;
  opacity: 0.9;
}

.approach-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #4ade80;
  font-weight: bold;
}

.section-divider {
  text-align: center;
  margin: 3rem 0 2rem 0;
  position: relative;
}

.section-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--border), transparent);
  z-index: 1;
}

.section-divider span {
  background: var(--bg);
  padding: 0 2rem;
  color: var(--text-light);
  font-style: italic;
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .claude-comparison,
  .auth-options,
  .approach-comparison {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .claude-code-section {
    padding: 1.5rem;
    margin: 2rem 0;
  }
  
  .claude-title {
    font-size: 1.5rem;
  }
  
  .auth-option {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .step {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .code-block {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
}
</style>