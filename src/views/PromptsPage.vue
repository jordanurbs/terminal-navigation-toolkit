<template>
  <div class="prompts-page">
    <div class="container">
      <h1 class="page-title">AI Vibe Coding Prompts</h1>
      <p class="page-subtitle">A collection of effective prompts to enhance your AI coding assistant experience, organized by use case.</p>
      
      <div class="filtering-controls">
        <div class="filter-section">
          <div class="category-dropdown">
            <select 
              class="category-select" 
              @change="handleCategoryChange($event)"
              :value="selectedCategory || ''"
            >
              <option value="">All Categories</option>
              <option 
                v-for="category in promptCategories" 
                :key="category.id"
                :value="category.id"
              >
                {{ category.icon }} {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="filter-section search-section">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search prompts..." 
            class="search-input"
          >
        </div>
      </div>
      
      <FavoritePrompts v-if="hasFavoritePrompts" />
      
      <div class="prompt-categories">
        <div 
          v-for="category in filteredCategories" 
          :key="category.id"
          class="category-section"
        >
          <h2 class="category-title" :style="{ 'border-bottom-color': getCategoryColor(category.id) }">
            <span class="category-icon">{{ category.icon }}</span>
            {{ category.name }}
          </h2>
          <p class="category-description">{{ category.description }}</p>
          
          <div class="prompts-grid">
            <div 
              v-for="prompt in getFilteredPromptsForCategory(category.id)" 
              :key="prompt.id"
              class="prompt-card"
            >
              <div class="prompt-header">
                <h3 class="prompt-title">{{ prompt.title }}</h3>
                <span class="prompt-tags">
                  <span 
                    v-for="tag in prompt.tags" 
                    :key="tag" 
                    class="prompt-tag"
                  >
                    {{ tag }}
                  </span>
                </span>
              </div>
              
              <div class="prompt-content">
                <pre class="prompt-template">{{ prompt.template }}</pre>
                <p class="prompt-description">{{ prompt.description }}</p>
                
                <div v-if="prompt.example" class="prompt-example">
                  <h4>Example:</h4>
                  <div class="example-input">{{ prompt.example.input }}</div>
                  <div class="example-output">{{ prompt.example.output }}</div>
                </div>
                
                <div v-if="prompt.tips && prompt.tips.length > 0" class="prompt-tips">
                  <h4>Tips:</h4>
                  <ul>
                    <li v-for="(tip, index) in prompt.tips" :key="index">{{ tip }}</li>
                  </ul>
                </div>
              </div>
              
              <div class="prompt-actions">
                <button class="btn btn-primary btn-sm" @click="copyToClipboard(prompt.template)">
                  Copy Prompt
                </button>
                <button 
                  class="btn btn-secondary btn-sm" 
                  @click="savePrompt(prompt)"
                  :disabled="isPromptInFavorites(prompt.id)"
                >
                  {{ isPromptInFavorites(prompt.id) ? 'Saved to Favorites' : 'Save to Favorites' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="filteredCategories.length === 0 || allFilteredPrompts.length === 0" class="no-results">
        <p>No prompts match your current filters. Try adjusting your search criteria.</p>
        <button class="btn btn-primary" @click="resetFilters">Reset Filters</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { promptCategories, prompts } from '../data/prompts'
import FavoritePrompts from '../components/FavoritePrompts.vue'

export default {
  name: 'PromptsPage',
  components: {
    FavoritePrompts
  },
  data() {
    return {
      promptCategories,
      prompts,
      selectedCategory: null,
      searchQuery: '',
      categoryColors: {
        projectsetup: '#4299e1',
        debugging: '#48bb78',
        features: '#ed8936',
        refactoring: '#a0aec0',
        testing: '#667eea',
        documentation: '#d53f8c',
        optimization: '#805ad5'
      }
    }
  },
  computed: {
    ...mapGetters(['favoritePrompts']),
    
    hasFavoritePrompts() {
      return this.favoritePrompts.length > 0;
    },
    
    filteredCategories() {
      if (!this.selectedCategory) {
        return this.promptCategories;
      }
      return this.promptCategories.filter(category => 
        category.id === this.selectedCategory
      );
    },
    
    allFilteredPrompts() {
      return this.prompts.filter(prompt => {
        const matchesCategory = !this.selectedCategory || prompt.categoryId === this.selectedCategory;
        const matchesSearch = !this.searchQuery || 
          prompt.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          prompt.template.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          prompt.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase())));
        
        return matchesCategory && matchesSearch;
      });
    }
  },
  methods: {
    handleCategoryChange(event) {
      this.selectedCategory = event.target.value || null;
    },
    
    getFilteredPromptsForCategory(categoryId) {
      return this.prompts.filter(prompt => {
        const matchesCategory = prompt.categoryId === categoryId;
        const matchesSearch = !this.searchQuery || 
          prompt.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          prompt.template.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          prompt.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase())));
        
        return matchesCategory && matchesSearch;
      });
    },
    
    getCategoryColor(categoryId) {
      return this.categoryColors[categoryId] || '#718096';
    },
    
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
    
    savePrompt(prompt) {
      if (!this.isPromptInFavorites(prompt.id)) {
        this.$store.dispatch('addFavoritePrompt', prompt);
        this.$store.dispatch('showNotification', {
          message: 'Prompt added to favorites!',
          type: 'success'
        });
      }
    },
    
    isPromptInFavorites(promptId) {
      return this.favoritePrompts.some(p => p.id === promptId);
    },
    
    resetFilters() {
      this.selectedCategory = null;
      this.searchQuery = '';
    }
  }
}
</script>

<style scoped>
.prompts-page {
  padding: 2rem 0;
}

.page-title {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.page-subtitle {
  color: var(--text-light);
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.filtering-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filter-section {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 200px;
}

.category-select {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  font-size: 1rem;
}

.category-section {
  margin-bottom: 3rem;
}

.category-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid var(--primary);
}

.category-icon {
  margin-right: 0.5rem;
  font-size: 1.5rem;
}

.category-description {
  margin-bottom: 1.5rem;
  color: var(--text-light);
}

.prompts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.prompt-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.prompt-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.prompt-header {
  padding: 1rem;
  background-color: var(--primary);
  color: white;
}

.prompt-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: white;
}

.prompt-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.prompt-tag {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}

.prompt-content {
  padding: 1rem;
  flex-grow: 1;
}

.prompt-template {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  margin-bottom: 1rem;
  border-left: 3px solid var(--accent);
  overflow-x: auto;
  max-height: 150px;
  overflow-y: auto;
}

.prompt-description {
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.prompt-example {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.example-input {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.example-output {
  font-style: italic;
  color: var(--text-light);
}

.prompt-tips {
  margin-top: 1rem;
}

.prompt-tips h4 {
  margin-bottom: 0.5rem;
}

.prompt-tips ul {
  padding-left: 1.5rem;
}

.prompt-actions {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  background-color: #f8f9fa;
  border-top: 1px solid var(--border);
}

.no-results {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .prompts-grid {
    grid-template-columns: 1fr;
  }
  
  .filtering-controls {
    flex-direction: column;
  }
}
</style> 