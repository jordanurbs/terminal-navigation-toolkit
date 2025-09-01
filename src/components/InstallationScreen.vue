<template>
  <div class="installation-screen">
    <h2>Get Started</h2>
    <div class="setup-steps">
      <!-- Step 1: API Key Validation -->
      <div v-if="currentStep === 1" class="setup-step">
        <h3>Step 1: API Key Validation</h3>
        <p>Enter your API key to validate and download the challenge content.</p>
        <div class="api-key-form">
          <input 
            type="text" 
            v-model="apiKey" 
            placeholder="Your API Key" 
            class="api-key-input"
            @keyup.enter="validateKey"
          >
          <button 
            @click="validateKey" 
            class="validate-button"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Contacting Mission Control...</span>
            <span v-else>Validate & Download</span>
          </button>
        </div>
        <p class="purchase-link">
          Don't have an API key? <a href="https://skool.com/aicaptains" target="_blank" rel="noopener noreferrer">Get your API key in the AI Captains Skool (free 7-day trial)</a>
        </p>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </div>

      <!-- Step 2: Data Download -->
      <div v-if="currentStep === 2" class="setup-step">
        <h3>Step 2: Downloading Challenge Data</h3>
        <div class="progress-indicator">
          <div class="spinner"></div>
          <p>Downloading and storing challenge data...</p>
        </div>
      </div>

      <!-- Step 3: Setup Complete -->
      <div v-if="currentStep === 3" class="setup-step">
        <h3>Setup Complete!</h3>
        <p>The Terminal Navigation Toolkit has been successfully installed.</p>
        <button @click="finishSetup" class="start-button">Start Your Journey</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'InstallationScreen',
  data() {
    return {
      currentStep: 1,
      apiKey: '',
      isLoading: false,
      error: null
    };
  },
  methods: {
    async validateKey() {
      if (!this.apiKey.trim()) {
        this.error = 'Please enter an API key';
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        // Validate API key
        const validationResponse = await fetch('https://ccc.ai-captains.com/.netlify/functions/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey.trim()
          }
        });
        
        const validationData = await validationResponse.json();
        if (!validationData.valid) {
          throw new Error('Invalid API key');
        }

        // Move to download step
        this.currentStep = 2;

        // Fetch challenges
        const response = await fetch('https://ccc.ai-captains.com/.netlify/functions/challenges', {
          headers: {
            'x-api-key': this.apiKey.trim()
          }
        });
        
        const data = await response.json();
        if (data.success && data.data) {
          // Store challenges in localStorage
          await this.storeChallengesLocally(data.data);
          
          // Store API key and mark setup as complete
          localStorage.setItem('apiKey', this.apiKey.trim());
          localStorage.setItem('setupComplete', 'true');
          
          // Complete setup in store
          await this.$store.dispatch('completeSetup', this.apiKey.trim());
          
          // Move to completion step
          this.currentStep = 3;
        } else {
          throw new Error('Failed to fetch challenges');
        }
      } catch (error) {
        console.error('Error:', error);
        this.error = error.message;
        this.currentStep = 1;
      } finally {
        this.isLoading = false;
      }
    },

    async storeChallengesLocally(challenges) {
      try {
        // Store challenges in localStorage
        localStorage.setItem('challenges', JSON.stringify(challenges));
        
        // Commit challenges to Vuex store
        this.$store.commit('setChallenges', challenges);
        
        // Log success
        console.log(`Successfully stored ${challenges.length} challenges locally`);
      } catch (error) {
        console.error('Error storing challenges:', error);
        throw new Error('Failed to store challenges locally');
      }
    },

    finishSetup() {
      this.$emit('setup-complete');
    }
  }
};
</script>

<style scoped>
.installation-screen {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.setup-steps {
  margin-top: 2rem;
}

.setup-step {
  margin-bottom: 2rem;
}

.api-key-form {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  justify-content: center;
}

.api-key-input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
}

.validate-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.validate-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  margin-top: 1rem;
}

.progress-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.start-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-button:hover {
  background-color: #1976D2;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.purchase-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-light);
}

.purchase-link a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.purchase-link a:hover {
  text-decoration: underline;
}
</style>