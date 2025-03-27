<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <div class="container">
        <p>© {{ currentYear }} Jordan Urbs & <a style="color: white;" href="https://spirals.me" target="_blank" rel="noopener noreferrer">Spirals Activation, LLC</a></p>
        <div class="social-links">
          <a href="https://jordanurbs.com" target="_blank" rel="noopener noreferrer" class="social-icon">
            <i class="fas fa-globe"></i>
          </a>
          <a href="https://blog.jordanurbs.com" target="_blank" rel="noopener noreferrer" class="social-icon">
            <i class="fas fa-blog"></i>
          </a>
          <a href="https://youtube.com/jordanurbsai" target="_blank" rel="noopener noreferrer" class="social-icon">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="https://x.com/jordanurbs" target="_blank" rel="noopener noreferrer" class="social-icon">
            <i class="fab fa-x-twitter"></i>
          </a>
          <a href="https://github.com/jordanurbs" target="_blank" rel="noopener noreferrer" class="social-icon">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style>
:root {
  --primary: #0a3d62; /* Navy blue - Authority, depth, and the ocean (Captain theme) */
  --secondary: #38ada9; /* Teal - Technical capability, forward movement */
  --accent: #f6b93b; /* Amber - Illumination, clarity, confidence */
  --background: #f5f7fa; /* Light gray - Clean, professional, focused */
  --text: #2c3e50; /* Charcoal - Authoritative but approachable */
  --text-light: #6c757d;
  --border: #dee2e6;
  --success: #28a745;
  --danger: #dc3545;
  --warning: #ffc107;
  --info: #17a2b8;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--text);
  background-color: var(--background);
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
  color: var(--primary);
}

code, pre {
  font-family: 'JetBrains Mono', monospace;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.main-content {
  min-height: calc(100vh - 140px);
  padding: 0rem 0;
}

.footer {
  background-color: var(--primary);
  color: white;
  padding: 1.5rem 0;
  text-align: center;
}

.footer p {
  margin: 0.5rem 0;
}

.footer .small {
  font-size: 0.875rem;
  opacity: 0.8;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover {
  background-color: #072f4a;
}

.btn-secondary {
  background-color: var(--secondary);
  color: white;
}

.btn-secondary:hover {
  background-color: #2c8c89;
}

.btn-accent {
  background-color: var(--accent);
  color: var(--primary);
}

.btn-accent:hover {
  background-color: #e5a92e;
}

.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.card-header {
  background-color: var(--primary);
  color: white;
  padding: 1rem;
  font-weight: 600;
}

.card-body {
  padding: 1.5rem;
}

.terminal {
  background-color: #1e1e1e;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #f8f8f8;
  font-family: 'JetBrains Mono', monospace;
  line-height: 1.5;
  overflow-x: auto;
}

.terminal-input::before {
  content: "$ ";
  color: var(--accent);
}

.terminal-output {
  color: #cccccc;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: var(--accent);
}
</style>