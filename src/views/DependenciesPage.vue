<template>
  <div class="container">
    <h1>Standard Dependencies Installation Guide</h1>
    <p class="lead">This guide will help you install the essential tools needed for development: Git, Node.js, and Python.</p>

    <div class="card">
      <div class="card-header">
        <h2>Homebrew Installation (macOS)</h2>
      </div>
      <div class="card-body">
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
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2>Git Installation</h2>
      </div>
      <div class="card-body">
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

        <h3>Windows</h3>
        <p>Download the Git installer from the official website:</p>
        <a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Download Git for Windows</a>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2>Node.js Installation</h2>
      </div>
      <div class="card-body">
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
        <p>Download the Node.js installer from the official website:</p>
        <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Download Node.js</a>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2>Python Installation</h2>
      </div>
      <div class="card-body">
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
        <p>Download the Python installer from the official website:</p>
        <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Download Python</a>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2>Verification</h2>
      </div>
      <div class="card-body">
        <p>After installation, verify that everything is working correctly by running these commands:</p>
        <div class="terminal">
          <div class="terminal-input">git --version</div>
          <div class="terminal-input">node --version</div>
          <div class="terminal-input">python3 --version</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DependenciesPage'
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
  margin-bottom: 2rem;
}

.terminal {
  margin: 1rem 0;
}

.btn {
  display: inline-block;
  margin-top: 0.5rem;
}
</style> 