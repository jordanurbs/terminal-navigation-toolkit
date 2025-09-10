<template>
  <div class="prompts-page">
    <div class="container">
      <h1 class="page-title">Agents, Prompts & Resources</h1>
      <p class="page-subtitle">A comprehensive collection of Claude Code agents, AI prompts, and development resources to enhance your coding experience and automate your workflows.</p>
      
      <div class="filtering-controls">
        <div class="filter-section">
          <div class="type-filter">
            <label class="filter-label">Content Type:</label>
            <select 
              class="type-select" 
              @change="handleTypeChange($event)"
              :value="selectedType || ''"
            >
              <option value="">All Content</option>
              <option value="prompt">AI Prompts Only</option>
              <option value="template">Workflow Templates Only</option>
            </select>
          </div>
        </div>
        
        <div class="filter-section">
          <div class="category-dropdown">
            <label class="filter-label">Category:</label>
            <select 
              class="category-select" 
              @change="handleCategoryChange($event)"
              :value="selectedCategory || ''"
            >
              <option value="">All Categories</option>
              <option 
                v-for="category in availableCategories" 
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
            placeholder="Search prompts and templates..." 
            class="search-input"
          >
        </div>
      </div>
      
      <!-- Learning Resources Section -->
      <div v-if="showLearningResources" class="learning-resources-section">
        <h2 class="section-title">
          <span class="section-icon">🎓</span>
          Learning Resources
        </h2>
        <p class="section-description">Master the tools and mindsets that turn no-code prompt passengers into AI Captains</p>
        
        <div class="courses-grid">
          <!-- n8n Primers Course -->
          <div class="content-card course-card">
            <div class="course-image">
              <img src="/images/n8n-primer-min.png" alt="n8n Primers Course" />
              <div class="trial-badge">
                <span class="badge-icon">✨</span>
                <span class="badge-text">7-Day Free Trial</span>
              </div>
            </div>
            <div class="content-header">
              <div class="content-type-badge course-badge">Course</div>
              <h3 class="content-title">n8n Primers</h3>
              <span class="course-subtitle">Your Automation Fleet Awaits</span>
            </div>
            
            <div class="content-body">
              <p class="content-description">Connect any service to any service with visual workflows that never sleep. Stop manually running the same tasks over and over.</p>
              
              <div class="course-features">
                <ul>
                  <li>Visual automation - drag, drop, deploy (zero coding required)</li>
                  <li>Connect ChatGPT to Slack, Gmail to databases, websites to anything</li>
                  <li>Build workflows that handle tasks while you focus on strategy</li>
                  <li>Turn manual processes into automatic systems overnight</li>
                </ul>
              </div>
            </div>
            
            <div class="content-actions">
              <a href="https://skool.com/aicaptains" target="_blank" class="btn btn-primary">Launch Your Automation Armada</a>
            </div>
          </div>

          <!-- Conversation-Driven Development Course -->
          <div class="content-card course-card">
            <div class="course-image">
              <img src="/images/conversation-driven-dev-min.png" alt="Conversation-Driven Development Course" />
              <div class="trial-badge">
                <span class="badge-icon">✨</span>
                <span class="badge-text">7-Day Free Trial</span>
              </div>
            </div>
            <div class="content-header">
              <div class="content-type-badge course-badge">Course</div>
              <h3 class="content-title">Conversation-Driven Development</h3>
              <span class="course-subtitle">Stop Prompting. Start Building.</span>
            </div>
            
            <div class="content-body">
              <p class="content-description">Transform from AI passenger to coding captain with conversation-driven development. Turn English into working applications.</p>
              
              <div class="course-features">
                <ul>
                  <li>25 video lessons that turn English into working applications</li>
                  <li>Complete machine setup module - no technical background required</li>
                  <li>Build your first real project using nothing but conversation</li>
                  <li>Go from wishing you could build that to actually building that</li>
                </ul>
              </div>
            </div>
            
            <div class="content-actions">
              <a href="https://skool.com/aicaptains" target="_blank" class="btn btn-primary">Chart Your Course to Builder Status</a>
            </div>
          </div>

          <!-- Architectural Literacy Course -->
          <div class="content-card course-card">
            <div class="course-image">
              <img src="/images/architectural-literacy-min.png" alt="Architectural Literacy Course" />
              <div class="trial-badge">
                <span class="badge-icon">✨</span>
                <span class="badge-text">7-Day Free Trial</span>
              </div>
            </div>
            <div class="content-header">
              <div class="content-type-badge course-badge">Course</div>
              <h3 class="content-title">Architectural Literacy</h3>
              <span class="course-subtitle">Build Your Technical Foundation</span>
            </div>
            
            <div class="content-body">
              <p class="content-description">Stop depending on others - master the core systems that power every application. The difference between passengers and captains.</p>
              
              <div class="course-features">
                <ul>
                  <li>Over 25 video lessons across 6 modules covering the fundamentals every builder needs to know</li>
                  <li>From Command Line basics to API mastery and version control</li>
                  <li>Build an AI chatbot capstone that proves your new capabilities</li>
                  <li>Graduate from asking for help to providing solutions</li>
                </ul>
              </div>
            </div>
            
            <div class="content-actions">
              <a href="https://skool.com/aicaptains" target="_blank" class="btn btn-primary">Claim Your Captain's Credentials</a>
            </div>
          </div>
        </div>
      </div>
      
      <FavoritePrompts v-if="hasFavoritePrompts" />
      
      <div class="content-categories">
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
          
          <div class="content-grid">
            <!-- Render prompts -->
            <div 
              v-for="prompt in getFilteredPromptsForCategory(category.id)" 
              :key="`prompt-${prompt.id}`"
              class="content-card prompt-card"
            >
              <div class="content-header">
                <div class="content-type-badge prompt-badge">AI Prompt</div>
                <h3 class="content-title">{{ prompt.title }}</h3>
                <span class="content-tags">
                  <span 
                    v-for="tag in prompt.tags" 
                    :key="tag" 
                    class="content-tag"
                  >
                    {{ tag }}
                  </span>
                </span>
              </div>
              
              <div class="content-body">
                <pre class="prompt-template">{{ prompt.template }}</pre>
                <p class="content-description">{{ prompt.description }}</p>
                
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
              
              <div class="content-actions">
                <button class="btn btn-primary btn-sm" @click="copyToClipboard(prompt.template)">
                  Copy Prompt
                </button>
                <a 
                  v-if="prompt.resourceUrl" 
                  :href="prompt.resourceUrl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-resource btn-sm"
                >
                  <span class="resource-icon">🔗</span>
                  View Resource
                </a>
                <button 
                  class="btn btn-secondary btn-sm" 
                  @click="saveItem(prompt)"
                  :disabled="isItemInFavorites(prompt.id)"
                >
                  {{ isItemInFavorites(prompt.id) ? 'Saved to Favorites' : 'Save to Favorites' }}
                </button>
              </div>
            </div>
            
            <!-- Render templates -->
            <div 
              v-for="template in getFilteredTemplatesForCategory(category.id)" 
              :key="`template-${template.id}`"
              class="content-card template-card"
            >
              <div class="content-header">
                <div class="content-type-badge template-badge">
                  {{ template.platform || 'Workflow' }} Template
                </div>
                <h3 class="content-title">{{ template.title }}</h3>
                <div class="template-meta">
                  <span class="difficulty-badge" :class="`difficulty-${template.difficulty}`">
                    {{ template.difficulty }}
                  </span>
                  <span class="content-tags">
                    <span 
                      v-for="tag in template.tags" 
                      :key="tag" 
                      class="content-tag"
                    >
                      {{ tag }}
                    </span>
                  </span>
                </div>
              </div>
              
              <div class="content-body">
                <p class="content-description">{{ template.description }}</p>
                
                <div v-if="template.useCases && template.useCases.length > 0" class="template-use-cases">
                  <h4>Use Cases:</h4>
                  <ul>
                    <li v-for="(useCase, index) in template.useCases" :key="index">{{ useCase }}</li>
                  </ul>
                </div>
                
                <div v-if="template.requiredServices && template.requiredServices.length > 0" class="template-requirements">
                  <h4>Required Services:</h4>
                  <div class="requirements-list">
                    <span 
                      v-for="(service, index) in template.requiredServices" 
                      :key="index"
                      class="requirement-tag"
                    >
                      {{ service }}
                    </span>
                  </div>
                </div>
                
                <div v-if="template.setupInstructions" class="template-setup">
                  <h4>Setup Instructions:</h4>
                  <div class="setup-text">{{ template.setupInstructions }}</div>
                </div>
              </div>
              
              <div class="content-actions">
                <button 
                  class="btn btn-primary btn-sm" 
                  @click="downloadTemplate(template)"
                >
                  Download Template
                </button>
                <button 
                  class="btn btn-accent btn-sm" 
                  @click="copyTemplateJson(template)"
                >
                  Copy JSON
                </button>
                <button 
                  class="btn btn-secondary btn-sm" 
                  @click="saveItem(template)"
                  :disabled="isItemInFavorites(template.id)"
                >
                  {{ isItemInFavorites(template.id) ? 'Saved to Favorites' : 'Save to Favorites' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="filteredCategories.length === 0 || (allFilteredPrompts.length === 0 && allFilteredTemplates.length === 0)" class="no-results">
        <p>No {{ selectedType || 'content' }} matches your current filters. Try adjusting your search criteria.</p>
        <button class="btn btn-primary" @click="resetFilters">Reset Filters</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { allCategories, prompts, templates, getItemsByCategory, getItemsByType } from '../data/prompts'
import FavoritePrompts from '../components/FavoritePrompts.vue'
import CourseCtaCard from '../components/CourseCtaCard.vue'

export default {
  name: 'PromptsPage',
  components: {
    FavoritePrompts,
    CourseCtaCard
  },
  data() {
    return {
      allCategories,
      prompts,
      templates,
      selectedCategory: null,
      selectedType: null,
      searchQuery: '',
      categoryColors: {
        // Prompt categories
        copilot: '#4299e1',
        projectsetup: '#4299e1',
        debugging: '#48bb78',
        features: '#ed8936',
        refactoring: '#a0aec0',
        testing: '#667eea',
        documentation: '#d53f8c',
        optimization: '#805ad5',
        // Template categories  
        'n8n-automation': '#ff4f64',
        'zapier-automation': '#ff4a00',
        'make-automation': '#6366f1',
        'general-automation': '#8b5cf6'
      }
    }
  },
  computed: {
    ...mapGetters(['favoritePrompts']),
    
    hasFavoritePrompts() {
      return this.favoritePrompts.length > 0;
    },
    
    showLearningResources() {
      // Only show learning resources when no filters are active
      return !this.selectedCategory && !this.selectedType && !this.searchQuery;
    },
    
    availableCategories() {
      if (!this.selectedType) {
        return this.allCategories;
      }
      
      // Filter categories based on selected type
      const relevantItems = getItemsByType(this.selectedType);
      const relevantCategoryIds = [...new Set(relevantItems.map(item => item.categoryId))];
      return this.allCategories.filter(category => relevantCategoryIds.includes(category.id));
    },
    
    filteredCategories() {
      if (!this.selectedCategory) {
        return this.availableCategories;
      }
      return this.availableCategories.filter(category => 
        category.id === this.selectedCategory
      );
    },
    
    allFilteredPrompts() {
      if (this.selectedType === 'template') return [];
      
      return this.prompts.filter(prompt => {
        const matchesCategory = !this.selectedCategory || prompt.categoryId === this.selectedCategory;
        const matchesSearch = !this.searchQuery || this.itemMatchesSearch(prompt);
        return matchesCategory && matchesSearch;
      });
    },
    
    allFilteredTemplates() {
      if (this.selectedType === 'prompt') return [];
      
      return this.templates.filter(template => {
        const matchesCategory = !this.selectedCategory || template.categoryId === this.selectedCategory;
        const matchesSearch = !this.searchQuery || this.itemMatchesSearch(template);
        return matchesCategory && matchesSearch;
      });
    }
  },
  methods: {
    handleTypeChange(event) {
      this.selectedType = event.target.value || null;
      // Reset category if it's not available for the selected type
      if (this.selectedType && this.selectedCategory) {
        const availableCategoryIds = this.availableCategories.map(cat => cat.id);
        if (!availableCategoryIds.includes(this.selectedCategory)) {
          this.selectedCategory = null;
        }
      }
    },
    
    handleCategoryChange(event) {
      this.selectedCategory = event.target.value || null;
    },
    
    itemMatchesSearch(item) {
      const searchLower = this.searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        (item.template && item.template.toLowerCase().includes(searchLower)) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
        (item.platform && item.platform.toLowerCase().includes(searchLower)) ||
        (item.useCases && item.useCases.some(useCase => useCase.toLowerCase().includes(searchLower)));
    },
    
    getFilteredPromptsForCategory(categoryId) {
      if (this.selectedType === 'template') return [];
      
      return this.prompts.filter(prompt => {
        const matchesCategory = prompt.categoryId === categoryId;
        const matchesSearch = !this.searchQuery || this.itemMatchesSearch(prompt);
        return matchesCategory && matchesSearch;
      });
    },
    
    getFilteredTemplatesForCategory(categoryId) {
      if (this.selectedType === 'prompt') return [];
      
      return this.templates.filter(template => {
        const matchesCategory = template.categoryId === categoryId;
        const matchesSearch = !this.searchQuery || this.itemMatchesSearch(template);
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
    
    copyTemplateJson(template) {
      const jsonString = JSON.stringify(template.templateData, null, 2);
      navigator.clipboard.writeText(jsonString).then(() => {
        this.$store.dispatch('showNotification', {
          message: 'Template JSON copied to clipboard!',
          type: 'success'
        });
      }).catch(err => {
        this.$store.dispatch('showNotification', {
          message: 'Failed to copy template JSON.',
          type: 'error'
        });
      });
    },
    
    downloadTemplate(template) {
      const jsonString = JSON.stringify(template.templateData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${template.id}-template.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      this.$store.dispatch('showNotification', {
        message: `${template.title} template downloaded!`,
        type: 'success'
      });
    },
    
    saveItem(item) {
      if (!this.isItemInFavorites(item.id)) {
        this.$store.dispatch('addFavoritePrompt', item);
        this.$store.dispatch('showNotification', {
          message: `${item.type === 'template' ? 'Template' : 'Prompt'} added to favorites!`,
          type: 'success'
        });
      }
    },
    
    isItemInFavorites(itemId) {
      return this.favoritePrompts.some(p => p.id === itemId);
    },
    
    resetFilters() {
      this.selectedCategory = null;
      this.selectedType = null;
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

.type-filter {
  display: flex;
  align-items: center;
}

.filter-label {
  margin-right: 0.5rem;
}

.type-select {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
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

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.content-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.content-header {
  padding: 1rem;
  background-color: var(--primary);
  color: white;
}

.content-type-badge {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}

.content-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: white;
}

.content-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.content-tag {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
}

.content-body {
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

.content-description {
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

.content-actions {
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
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .filtering-controls {
    flex-direction: column;
  }
  
  .filter-section {
    width: 100%;
  }
}

/* Template-specific styles */
.template-card {
  border-left: 4px solid var(--accent);
}

.template-badge {
  background-color: var(--accent);
  color: var(--primary);
  font-weight: 600;
}

.prompt-badge {
  background-color: var(--secondary);
  color: white;
  font-weight: 600;
}

.template-meta {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.difficulty-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.difficulty-beginner {
  background-color: #d4edda;
  color: #155724;
}

.difficulty-intermediate {
  background-color: #fff3cd;
  color: #856404;
}

.difficulty-advanced {
  background-color: #f8d7da;
  color: #721c24;
}

.template-use-cases,
.template-requirements,
.template-setup {
  margin-top: 1rem;
}

.template-use-cases h4,
.template-requirements h4,
.template-setup h4 {
  margin-bottom: 0.5rem;
  color: var(--primary);
  font-size: 0.875rem;
  font-weight: 600;
}

.template-use-cases ul {
  padding-left: 1.5rem;
  margin: 0;
}

.template-use-cases li {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.4;
}

.requirements-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.requirement-tag {
  background-color: var(--background);
  color: var(--text);
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border);
}

.setup-text {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-left: 3px solid var(--secondary);
  white-space: pre-line;
}

/* Enhanced filtering controls */
.filtering-controls {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid var(--border);
}

.filter-label {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.875rem;
  white-space: nowrap;
}

.type-filter,
.category-dropdown {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.type-select,
.category-select {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.type-select:focus,
.category-select:focus {
  outline: none;
  border-color: var(--secondary);
  box-shadow: 0 0 0 2px rgba(52, 144, 220, 0.2);
}

/* Enhanced content cards */
.content-card {
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.content-card:hover {
  border-color: var(--secondary);
}

.content-header {
  position: relative;
  background: linear-gradient(135deg, var(--primary) 0%, #2c5f8a 100%);
}

.template-card .content-header {
  background: linear-gradient(135deg, var(--accent) 0%, #d4a226 100%);
}

.template-card .content-title,
.template-card .content-type-badge {
  color: var(--primary);
}

.template-card .content-tags .content-tag {
  background-color: rgba(10, 61, 98, 0.2);
  color: var(--primary);
}

/* Action buttons styling */
.content-actions {
  gap: 0.75rem;
  flex-wrap: wrap;
}

.content-actions .btn {
  flex: 1;
  min-width: 120px;
}

.btn-accent {
  background-color: var(--accent);
  color: var(--primary);
  border: 1px solid var(--accent);
}

.btn-accent:hover {
  background-color: #d4a226;
  border-color: #d4a226;
}

.btn-resource {
  background-color: #10b981;
  color: white;
  border: 1px solid #10b981;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  justify-content: center;
}

.btn-resource:hover {
  background-color: #059669;
  border-color: #059669;
  color: white;
  text-decoration: none;
}

.resource-icon {
  font-size: 0.875rem;
}

/* No results styling */
.no-results {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px dashed var(--border);
}

/* Responsive improvements */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .filtering-controls {
    padding: 1rem 0.5rem;
  }
  
  .filter-section {
    margin-bottom: 0.5rem;
  }
  
  .content-actions {
    flex-direction: column;
  }
  
  .content-actions .btn {
    width: 100%;
  }
  
  .template-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Learning Resources Section */
.learning-resources-section {
  margin: 3rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
  text-align: center;
  justify-content: center;
}

.section-icon {
  font-size: 2rem;
}

.section-description {
  text-align: center;
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.course-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid var(--border);
  position: relative;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.course-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.course-card:hover .course-image img {
  transform: scale(1.05);
}

.trial-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: var(--accent);
  color: var(--primary);
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 10;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.badge-icon {
  font-size: 0.875rem;
}

.course-badge {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.course-subtitle {
  color: #aaa;
  font-size: 0.9rem;
  font-style: italic;
  margin-top: 0.25rem;
  display: block;
}

.course-features {
  margin-top: 1rem;
}

.course-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.course-features li {
  padding: 0.5rem 0 0.5rem 1.5rem;
  position: relative;
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.4;
}

.course-features li::before {
  content: '⚡';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
}

.course-card .btn-primary {
  width: 100%;
  padding: 0.75rem 1rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  background: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.course-card .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 76, 129, 0.3);
}

@media (max-width: 768px) {
  .learning-resources-section {
    margin: 2rem 0;
    padding: 1.5rem;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .course-image {
    height: 180px;
  }
}
</style> 