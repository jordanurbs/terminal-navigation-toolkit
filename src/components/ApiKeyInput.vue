<template>
  <div class="api-key-container">
    <h2>Enter Your API Key</h2>
    <p>To access the challenge content, you need a valid API key. The interface is available to browse, but challenges are only accessible with a purchased API key.</p>
    
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
        <span v-if="isLoading">Validating...</span>
        <span v-else>Validate Key</span>
      </button>
    </div>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <div class="api-key-info">
      <h3>Don't have an API key?</h3>
      <p>You'll need to purchase an API key to access the challenge content. Once purchased, add the API key to your .env file as CAPTAINS_TOOLKIT_API_KEY.</p>
      <a href="https://example.com/purchase" target="_blank" class="purchase-link">
        Purchase Access
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ApiKeyInput',
  data() {
    return {
      apiKey: ''
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      error: state => state.error
    })
  },
  methods: {
    async validateKey() {
      if (!this.apiKey.trim()) {
        this.$store.commit('setError', 'Please enter an API key');
        return;
      }

      try {
        // First validate the API key
        const validationResponse = await fetch('https://toolkit.ai-captains.com/.netlify/functions/validate', {
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

        // Then fetch challenges
        const response = await fetch('https://toolkit.ai-captains.com/.netlify/functions/challenges', {
          headers: {
            'x-api-key': this.apiKey.trim()
          }
        });
        
        const data = await response.json();
        if (data.success && data.data) {
          // Store the API key
          localStorage.setItem('apiKey', this.apiKey.trim());
          this.$store.commit('setApiKey', this.apiKey.trim());
          this.$store.commit('setChallenges', data.data);
          this.$store.commit('setApiKeyValidity', true);
          
          // Emit event to parent component
          this.$emit('key-validated');
        } else {
          throw new Error('Failed to fetch challenges');
        }
      } catch (error) {
        console.error('Error:', error);
        this.$store.commit('setError', error.message);
        this.$store.commit('setApiKeyValidity', false);
      }
    }
  }
};
</script>

<style scoped>
.api-key-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.api-key-form {
  display: flex;
  margin: 1.5rem 0;
}

.api-key-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.validate-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.validate-button:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

.validate-button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.error-message {
  color: #e53e3e;
  margin-bottom: 1.5rem;
}

.api-key-info {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.api-key-info h3 {
  margin-bottom: 0.5rem;
}

.purchase-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  color: var(--primary);
  text-decoration: none;
  transition: all 0.3s;
}

.purchase-link:hover {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

@media (max-width: 768px) {
  .api-key-form {
    flex-direction: column;
  }
  
  .api-key-input {
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .validate-button {
    border-radius: 4px;
  }
}
</style> 