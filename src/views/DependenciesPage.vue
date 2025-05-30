<template>
  <div class="container">
    <h1>"Vibe Coding" Standard Setup Guide</h1>
    <p class="lead">This page is basically all the tools you'll need to get your machine ready for development. If you're unsure or wary of what something is, just Google it or ask your AI co-captain.</p>

    <div class="accordion">
      <div class="card">
        <div class="card-header" @click="toggleSection('essential')" :aria-expanded="openSection === 'essential'">
          <h2>1. Essentials: Tools  & Accounts</h2>
          <span class="arrow" :class="{ 'arrow-down': openSection === 'essential' }">▼</span>
        </div>
        <transition name="slide">
          <div class="card-body" v-show="openSection === 'essential'">
            <h3>1. Install Cursor (Your AI-Powered Coding Software)</h3>
            <p>Here, when we say "Cursor," we simply mean your AI-enhanced coding software. Cursor is an AI-powered code editor that will be your primary development environment. You can also look into Windsurf or Github Co-pilot, as they are all very similar.</p>
            <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Download Cursor</a>
            <p class="mt-3">In the AI Captains Academy, we'll be using Cursor, but you can use any AI-powered coding software you're most comfortable with.</p>
            <h3>2. Create a GitHub Account</h3>
            <p>GitHub is where you'll store your code and collaborate with others. It's essential for version control and sharing your work.</p>
            <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Sign Up for GitHub</a>

            <h3>3. Get Your AI API Keys</h3>
            <p>You'll need API keys to work with AI models. We recommend having at least one of these:</p>
            <div class="api-keys">
              <div class="api-key-item">
                <h4>Anthropic (Claude)</h4>
                <p>Get your API key from the Anthropic Console:</p>
                <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Anthropic Console</a>
              </div>
              <div class="api-key-item">
                <h4>OpenAI (GPT-4)</h4>
                <p>Get your API key from the OpenAI API Console:</p>
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" class="btn btn-primary">OpenAI Console</a>
              </div>
              <div class="api-key-item">
                <h4>Venice.ai</h4>
                <p>Alternative AI platform with competitive pricing:</p>
                <a href="https://venice.ai/chat?ref=PA5RHk" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Venice.ai</a>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="card">
        <div class="card-header" @click="toggleSection('package-manager')" :aria-expanded="openSection === 'package-manager'">
          <h2>2. Install Your Package Manager</h2>
          <span class="arrow" :class="{ 'arrow-down': openSection === 'package-manager' }">▼</span>
        </div>
        <transition name="slide">
          <div class="card-body" v-show="openSection === 'package-manager'">
            <h3>macOS: Homebrew</h3>
            <p>Homebrew is a package manager for macOS that makes it easy to install software. It's recommended to install Homebrew first as it will make installing other tools much easier.</p>
            <div class="terminal">
              <div class="terminal-input">/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</div>
            </div>
            <p class="mt-3">After installation, you may need to add Homebrew to your PATH. Run these commands:</p>
            <div class="terminal">
              <div class="terminal-input">echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc</div>
              <div class="terminal-input">eval "$(/opt/homebrew/bin/brew shellenv)"</div>
            </div>
            <p class="mt-3">Verify the installation:</p>
            <div class="terminal">
              <div class="terminal-input">brew --version</div>
            </div>

            <h3>Windows: Chocolatey</h3>
            <p>Chocolatey is a popular package manager for Windows that makes it easy to install and manage software from the command line.</p>
            
            <h4>Option 1: Easy Way (Recommended)</h4>
            <p>The easiest way to get Chocolatey is through the Node.js installer, which we will need to install anyway:</p>
            <ol>
              <li>Visit <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">nodejs.org</a> and download the LTS version.</li>
              <li>Run the installer and make sure to <strong>check the box</strong> that says "Automatically install the necessary tools" (this includes Chocolatey).</li>
              <li>Complete the installation and restart your computer.</li>
              <li>Open Command Prompt or PowerShell and verify Chocolatey is installed:</li>
            </ol>
            <div class="terminal">
              <div class="terminal-input">choco --version</div>
            </div>

            <h4>Option 2: Not-So-Easy Way (PowerShell)</h4>
            <p>If you prefer to install Chocolatey directly without Node.js, or if the easy way didn't work:</p>
            <p><strong>Requirements:</strong> Windows 7+ / Windows Server 2003+, PowerShell v2+ (v3+ recommended), .NET Framework 4.8+.</p>
            <ol>
              <li>Open <strong>PowerShell</strong> as <strong>Administrator</strong>.</li>
              <li>Run the following command to install Chocolatey:</li>
            </ol>
            <div class="terminal">
              <div class="terminal-input">Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))</div>
            </div>
            <p>For more details and troubleshooting, visit the <a href="https://chocolatey.org/install" target="_blank" rel="noopener noreferrer">official Chocolatey installation guide</a>.</p>
          </div>
        </transition>
      </div>

      <div class="card">
        <div class="card-header" @click="toggleSection('git')" :aria-expanded="openSection === 'git'">
          <h2>3. Git Installation</h2>
          <span class="arrow" :class="{ 'arrow-down': openSection === 'git' }">▼</span>
        </div>
        <transition name="slide">
          <div class="card-body" v-show="openSection === 'git'">
            <h3>macOS</h3>
            <p>Git comes pre-installed on macOS. If you need to update it, you can use Homebrew:</p>
            <div class="terminal">
              <div class="terminal-input">brew install git</div>
            </div>

            <h3>Linux (Ubuntu/Debian)</h3>
            <div class="terminal">
              <div class="terminal-input">sudo apt update</div>
              <div class="terminal-input">sudo apt install git</div>
            </div>

            <h3>Windows (if you didn't do this earlier)</h3>
            <p>Using Chocolatey package manager:</p>
            <div class="terminal">
              <div class="terminal-input">choco install git</div>
            </div>
            <p>You may need to restart your console after installation for Git commands to be recognized.</p>
          </div>
        </transition>
      </div>

      <div class="card">
        <div class="card-header" @click="toggleSection('node')" :aria-expanded="openSection === 'node'">
          <h2>4. Node.js Installation</h2>
          <span class="arrow" :class="{ 'arrow-down': openSection === 'node' }">▼</span>
        </div>
        <transition name="slide">
          <div class="card-body" v-show="openSection === 'node'">
            <h3>macOS</h3>
            <p>Using Homebrew:</p>
            <div class="terminal">
              <div class="terminal-input">brew install node</div>
            </div>

            <h3>Linux (Ubuntu/Debian)</h3>
            <div class="terminal">
              <div class="terminal-input">curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -</div>
              <div class="terminal-input">sudo apt install -y nodejs</div>
            </div>

            <h3>Windows</h3>
            <p>Using Chocolatey package manager:</p>
            <div class="terminal">
              <div class="terminal-input">choco install nodejs.install</div>
            </div>
            <p>This will install both Node.js and npm. You may need to restart your console after installation.</p>
          </div>
        </transition>
      </div>

      <div class="card">
        <div class="card-header" @click="toggleSection('python')" :aria-expanded="openSection === 'python'">
          <h2>5. Python Installation</h2>
          <span class="arrow" :class="{ 'arrow-down': openSection === 'python' }">▼</span>
        </div>
        <transition name="slide">
          <div class="card-body" v-show="openSection === 'python'">
            <h3>macOS</h3>
            <p>Using Homebrew:</p>
            <div class="terminal">
              <div class="terminal-input">brew install python</div>
            </div>

            <h3>Linux (Ubuntu/Debian)</h3>
            <div class="terminal">
              <div class="terminal-input">sudo apt update</div>
              <div class="terminal-input">sudo apt install python3 python3-pip</div>
            </div>

            <h3>Windows</h3>
            <p>Using Chocolatey package manager:</p>
            <div class="terminal">
              <div class="terminal-input">choco install python</div>
            </div>
            <p>After installation, you should be able to run <code>python3</code> directly from the console. You may need to restart your console first.</p>
          </div>
        </transition>
      </div>

      <div class="card">
        <div class="card-header" @click="toggleSection('verify')" :aria-expanded="openSection === 'verify'">
          <h2>6. Verification</h2>
          <span class="arrow" :class="{ 'arrow-down': openSection === 'verify' }">▼</span>
        </div>
        <transition name="slide">
          <div class="card-body" v-show="openSection === 'verify'">
            <p>After installation, verify that everything is working correctly by running these commands:</p>
            <div class="terminal">
              <div class="terminal-input">git --version</div>
              <div class="terminal-input">node --version</div>
              <div class="terminal-input">python3 --version</div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="dependencies-cta">
      <a :href="hasApiKey ? '/challenges' : '/#bootcamp'" class="btn btn-accent btn-large">
        Start Building
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DependenciesPage',
  data() {
    return {
      openSection: 'essential'
    }
  },
  computed: {
    ...mapState(['hasApiKey'])
  },
  methods: {
    toggleSection(section) {
      this.openSection = this.openSection === section ? null : section
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.lead {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
}

h1 {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border);
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  color: white;
}

h3 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.card {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  background-color: var(--primary);
  transition: background-color 0.3s ease;
}

.card-header:hover {
  background-color: #072f4a;
}

.arrow {
  color: white;
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.arrow-down {
  transform: rotate(180deg);
}

.card-body {
  padding: 1.5rem;
  background-color: white;
}

.terminal {
  margin: 1rem 0;
}

.btn {
  display: inline-block;
  margin-top: 0.5rem;
}

.api-keys {
  margin-top: 1rem;
}

.api-key-item {
  margin-bottom: 1.5rem;
}

.api-key-item h4 {
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.api-key-item p {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.api-key-item .btn {
  margin-top: 0.25rem;
}

/* Transition animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  opacity: 1;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.dependencies-cta {
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-top: 1px solid var(--border);
}

.dependencies-cta .btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .dependencies-cta {
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style> 