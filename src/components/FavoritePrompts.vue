<template>
  <div class="favorites-section">
    <h2 class="favorites-title">My Favorite Agents, Prompts & Resources</h2>
    
    <div v-if="favoritePrompts.length === 0" class="no-favorites">
      <p>You haven't saved any favorite agents, prompts, or resources yet.</p>
      <p>Click on "Save to Favorites" on any card to add it here.</p>
    </div>
    
    <div v-else class="favorites-grid">
      <div 
        v-for="prompt in favoritePrompts" 
        :key="prompt.id"
        class="favorite-prompt-card"
      >
        <div class="favorite-prompt-header">
          <h3 class="favorite-prompt-title">{{ prompt.title }}</h3>
          <div class="favorite-prompt-actions">
            <button class="remove-favorite" @click="removeFromFavorites(prompt.id)">
              <span class="remove-icon">×</span>
            </button>
          </div>
        </div>
        
        <div class="favorite-prompt-content">
          <pre class="favorite-prompt-template">{{ prompt.template }}</pre>
          <p class="favorite-prompt-description">{{ prompt.description }}</p>
        </div>
        
        <div class="favorite-prompt-footer">
          <button class="btn btn-sm btn-primary" @click="copyToClipboard(prompt.template)">
            Copy Prompt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FavoritePrompts',
  computed: {
    ...mapGetters(['favoritePrompts'])
  },
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.$store.dispatch('showNotification', {
          message: 'Prompt copied to clipboard!',
          type: 'success'
        });
      }).catch(err => {
        this.$store.dispatch('showNotification', {
          message: 'Failed to copy prompt.',
          type: 'error'
        });
      });
    },
    
    removeFromFavorites(promptId) {
      this.$store.dispatch('removeFavoritePrompt', promptId);
      this.$store.dispatch('showNotification', {
        message: 'Prompt removed from favorites.',
        type: 'info'
      });
    }
  }
}
</script>

<style scoped>
.favorites-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.favorites-title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: var(--primary);
  border-bottom: 2px solid var(--accent);
  padding-bottom: 0.5rem;
  display: inline-block;
}

.no-favorites {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  border: 2px dashed var(--border);
  border-radius: 0.5rem;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.favorite-prompt-card {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.favorite-prompt-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.favorite-prompt-header {
  background-color: var(--primary);
  color: white;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorite-prompt-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.remove-favorite {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  font-size: 1.25rem;
  opacity: 0.7;
  transition: opacity 0.2s ease, background-color 0.2s ease;
}

.remove-favorite:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.2);
}

.favorite-prompt-content {
  padding: 0.75rem;
}

.favorite-prompt-template {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 0.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  white-space: pre-wrap;
  margin-bottom: 0.75rem;
  border-left: 3px solid var(--accent);
  overflow-x: auto;
  max-height: 150px;
  overflow-y: auto;
}

.favorite-prompt-description {
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0;
}

.favorite-prompt-footer {
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
  .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style> 