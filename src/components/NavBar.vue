<template>
    <nav class="navbar">
      <div class="container navbar-container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-logo">
            <img src="/images/terminal-icon.svg" alt="Terminal Icon">
            <span class="logo-text">Terminal Nav Toolkit</span>
          </router-link>
        </div>
        
        <div class="navbar-links" :class="{ 'active': mobileMenuOpen }">
          <router-link to="/dependencies" class="nav-link">Getting Started</router-link>
          <a href="/#bootcamp" class="nav-link">Bootcamp</a>
          <router-link to="/cheatsheet" class="nav-link">Cheat Sheet</router-link>
          <router-link to="/challenges" class="nav-link">30-Day Challenge</router-link>
          <router-link to="/troubleshooting" class="nav-link">Troubleshooting</router-link>
          <router-link to="/progress" class="nav-link highlight">My Progress</router-link>
          <a href="https://github.com/jordanurbs/terminal-navigation-toolkit" target="_blank" rel="noopener noreferrer" class="nav-link github-link">
            <i class="fab fa-github"></i>
          </a>
        </div>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    data() {
      return {
        mobileMenuOpen: false
      }
    },
    methods: {
      toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar {
    background-color: var(--primary);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  
  .navbar-brand {
    display: flex;
    align-items: center;
  }
  
  .navbar-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
  }
  
  .navbar-logo img {
    height: 40px;
    margin-right: 0.5rem;
  }
  
  .logo-text {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
  }
  
  .navbar-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-link {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 0;
    transition: color 0.3s ease;
    position: relative;
  }
  
  .nav-link:hover {
    color: white;
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--accent);
    transition: width 0.3s ease;
  }
  
  .nav-link:hover::after,
  .router-link-exact-active::after {
    width: 100%;
  }
  
  .router-link-exact-active {
    color: white;
  }
  
  .nav-link.highlight {
    background-color: var(--accent);
    color: var(--primary);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 600;
  }
  
  .nav-link.highlight:hover {
    background-color: #e5a92e;
  }
  
  .nav-link.highlight::after {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .bar {
    height: 3px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
  }
  
  .github-link {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }
  
  .github-link:hover {
    color: var(--accent);
  }
  
  .github-link::after {
    display: none;
  }
  
  @media (max-width: 768px) {
    .navbar-links {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      flex-direction: column;
      background-color: var(--primary);
      padding: 1rem;
      gap: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-150%);
      transition: transform 0.3s ease-in-out;
      z-index: 99;
    }
    
    .navbar-links.active {
      transform: translateY(0);
    }
    
    .nav-link {
      width: 100%;
      text-align: center;
      padding: 0.75rem 0;
    }
    
    .mobile-menu-toggle {
      display: flex;
    }
    
    .github-link {
      justify-content: center;
      padding: 0.75rem 0;
    }
  }
  </style>