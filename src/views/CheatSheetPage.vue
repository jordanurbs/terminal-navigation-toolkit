<template>
    <div class="cheatsheet-page">
      <div class="container">
        <h1 class="page-title">Interactive Command Line Cheat Sheet</h1>
        <p class="page-subtitle">Essential commands organized by use case. Come back to this page as you learn new commands!</p>
        
        <div class="filtering-controls">
          <div class="filter-section">
            <div class="category-dropdown">
              <select 
                class="category-select" 
                @change="handleCategoryChange($event)"
                :value="selectedCategories.length ? selectedCategories[0] : ''"
              >
                <option value="">Categories </option>
                <option 
                  v-for="category in commandCategories" 
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.icon }} {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="filter-section">
            <label class="filter-label">Filter by Difficulty:</label>
            <div class="filter-buttons">
              <button 
                class="filter-button" 
                :class="{ active: selectedDifficulty === 'all' }"
                @click="setDifficultyFilter('all')"
              >
                All
              </button>
              <button 
                class="filter-button" 
                :class="{ active: selectedDifficulty === 'beginner' }"
                @click="setDifficultyFilter('beginner')"
              >
                Beginner
              </button>
              <button 
                class="filter-button" 
                :class="{ active: selectedDifficulty === 'intermediate' }"
                @click="setDifficultyFilter('intermediate')"
              >
                Intermediate
              </button>
              <button 
                class="filter-button" 
                :class="{ active: selectedDifficulty === 'advanced' }"
                @click="setDifficultyFilter('advanced')"
              >
                Advanced
              </button>
            </div>
          </div>

          <div class="filter-section search-section">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search commands..." 
              class="search-input"
            >
          </div>
        </div>
        
        <div class="active-filters" v-if="selectedCategories.length > 0">
          <div class="filter-tags">
            <span 
              v-for="categoryId in selectedCategories" 
              :key="categoryId"
              class="filter-tag"
            >
              <span class="category-icon">{{ getCategoryIcon(categoryId) }}</span>
              {{ getCategoryName(categoryId) }}
              <button class="remove-tag" @click="removeCategory(categoryId)">×</button>
            </span>
          </div>
        </div>
        
        <div class="categories-container">
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
            <p class="business-applications">
              <strong>Business Applications:</strong> {{ category.businessApplications }}
            </p>
            
            <div class="commands-grid">
              <div 
                v-for="command in getFilteredCommandsForCategory(category.id)" 
                :key="command.id"
                class="command-card"
                :class="{ 'essential-command': isEssentialCommand(command.id) }"
              >
                <div class="command-header">
                  <span class="difficulty-badge" :class="command.difficulty">
                    {{ command.difficulty }}
                  </span>
                  <span class="os-badges">
                    <span v-for="os in getUniquePlatforms(command.osSupport)" :key="os" class="os-badge">
                      {{ getOSDisplayName(os) }}
                    </span>
                  </span>
                </div>
                
                <div class="command-content">
                  <pre class="command-code">{{ command.command }}</pre>
                  <p class="command-description">{{ command.description }}</p>
                  <p class="business-application">
                    <strong>Business Application:</strong> {{ command.businessApplication }}
                  </p>
                  
                  <div class="command-example">
                    <div class="example-input">
                      <span class="prompt">$</span> {{ command.example.input }}
                    </div>
                    <div class="example-output">{{ command.example.output }}</div>
                  </div>
                  
                  <div v-if="command.warning" class="command-warning">
                    <span class="warning-icon">⚠️</span>
                    <span class="warning-text">{{ command.warning }}</span>
                  </div>
                </div>
                
                <div class="command-actions">
                  <button 
                    class="btn btn-sm"
                    @click="markCommandAsCompleted(command.id)"
                    :class="{ 'btn-success': completedCommands.includes(command.id) }"
                  >
                    {{ completedCommands.includes(command.id) ? 'Mastered!' : 'Mark as Mastered' }}
                  </button>
                  <button class="btn btn-sm btn-secondary" @click="copyToClipboard(command.command)">
                    Copy Command
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="filteredCategories.length === 0 || allFilteredCommands.length === 0" class="no-results">
          <p>No commands match your current filters. Try adjusting your search criteria.</p>
          <button class="btn btn-primary" @click="resetFilters">Reset Filters</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { commands, commandCategories, essentialCommands, getCommandsByCategory } from '../data/commands'
  
  export default {
    name: 'CheatSheetPage',
    data() {
      return {
        commandCategories,
        commands,
        essentialCommands,
        selectedOS: 'all',
        selectedDifficulty: 'all',
        searchQuery: '',
        showEssentialsOnly: false,
        selectedCategories: [],
        isCategoryDropdownOpen: false,
        categoryColors: {
          navigation: '#4299e1',
          files: '#48bb78',
          content: '#ed8936',
          system: '#a0aec0',
          network: '#667eea',
          compression: '#d53f8c',
          'ai-dev': '#805ad5'
        }
      }
    },
    computed: {
      ...mapGetters(['completedCommands']),
      
      filteredCategories() {
        if (this.selectedCategories.length === 0) {
          return this.commandCategories;
        }
        return this.commandCategories.filter(category => 
          this.selectedCategories.includes(category.id)
        );
      },
      
      allFilteredCommands() {
        let filtered = [...this.commands]; // Create a new array to avoid mutating the original
        
        // Filter by OS
        if (this.selectedOS !== 'all') {
          filtered = filtered.filter(cmd => cmd.osSupport.some(os => os.includes(this.selectedOS)));
        }
        
        // Filter by difficulty
        if (this.selectedDifficulty !== 'all') {
          filtered = filtered.filter(cmd => cmd.difficulty === this.selectedDifficulty);
        }
        
        // Filter by search query
        if (this.searchQuery.trim() !== '') {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(cmd => 
            cmd.command.toLowerCase().includes(query) ||
            cmd.description.toLowerCase().includes(query) ||
            cmd.businessApplication.toLowerCase().includes(query)
          );
        }
        
        // Filter by essential commands only
        if (this.showEssentialsOnly) {
          filtered = filtered.filter(cmd => this.essentialCommands.includes(cmd.id));
        }
        
        // Filter by selected categories
        if (this.selectedCategories.length > 0) {
          filtered = filtered.filter(cmd => this.selectedCategories.includes(cmd.category));
        }
        
        return filtered;
      }
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
      handleClickOutside(event) {
        const dropdown = this.$el.querySelector('.category-filter-dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
          this.isCategoryDropdownOpen = false;
        }
      },
      
      getFilteredCommandsForCategory(categoryId) {
        return this.allFilteredCommands.filter(cmd => cmd.category === categoryId);
      },
      
      setOSFilter(os) {
        this.selectedOS = os;
      },
      
      setDifficultyFilter(difficulty) {
        this.selectedDifficulty = difficulty;
      },
      
      toggleCategoryDropdown() {
        this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
      },
      
      selectAllCategories() {
        this.selectedCategories = this.commandCategories.map(category => category.id);
      },
      
      clearAllCategories() {
        this.selectedCategories = [];
      },
      
      removeCategory(categoryId) {
        const index = this.selectedCategories.indexOf(categoryId);
        if (index !== -1) {
          this.selectedCategories.splice(index, 1);
        }
      },
      
      resetFilters() {
        this.selectedOS = 'all';
        this.selectedDifficulty = 'all';
        this.searchQuery = '';
        this.showEssentialsOnly = false;
        this.selectedCategories = [];
      },
      
      markCommandAsCompleted(commandId) {
        this.$store.commit('completeCommand', commandId);
      },
      
      isEssentialCommand(commandId) {
        return this.essentialCommands.includes(commandId);
      },
      
      copyToClipboard(text) {
        navigator.clipboard.writeText(text)
          .then(() => {
            console.log('Copied to clipboard');
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
          });
      },
      
      getCategoryColor(categoryId) {
        return this.categoryColors[categoryId] || '#cbd5e0';
      },
      
      getUniquePlatforms(osList) {
        const platforms = new Set();
        
        osList.forEach(os => {
          if (os.includes('mac')) platforms.add('mac');
          else if (os.includes('linux')) platforms.add('linux');
          else if (os.includes('windows')) platforms.add('windows');
        });
        
        return Array.from(platforms);
      },
      
      getOSDisplayName(os) {
        const displayNames = {
          'mac': 'macOS',
          'linux': 'Linux',
          'windows': 'Windows'
        };
        
        return displayNames[os] || os;
      },
      
      getCategoryIcon(categoryId) {
        const category = this.commandCategories.find(cat => cat.id === categoryId);
        return category ? category.icon : '❓';
      },
      
      getCategoryName(categoryId) {
        const category = this.commandCategories.find(cat => cat.id === categoryId);
        return category ? category.name : categoryId;
      },
      
      handleCategoryChange(event) {
        const selectedCategory = this.commandCategories.find(cat => cat.id === event.target.value);
        if (selectedCategory) {
          this.selectedCategories = [selectedCategory.id];
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .cheatsheet-page {
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
  
  .filtering-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background-color: #f8fafc;
    border-radius: 8px;
  }
  
  .filter-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .filter-label {
    font-size: 0.875rem;
    color: #4a5568;
    white-space: nowrap;
  }
  
  .filter-buttons {
    display: flex;
    gap: 0.25rem;
  }
  
  .filter-button {
    padding: 0.375rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background-color: white;
    color: #4a5568;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .filter-button:hover {
    background-color: #f7fafc;
    border-color: #cbd5e0;
  }
  
  .filter-button.active {
    background-color: #2d3748;
    border-color: #2d3748;
    color: white;
  }
  
  .category-dropdown {
    position: relative;
  }
  
  .category-select {
    padding: 0.375rem 2rem 0.375rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background-color: white;
    color: #4a5568;
    font-size: 0.875rem;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%234a5568' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
    min-width: 150px;
  }
  
  .category-select:hover {
    border-color: #cbd5e0;
  }
  
  .category-select:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
  
  .search-section {
    flex: 1;
    min-width: 200px;
    max-width: 400px;
    margin-left: auto;
  }
  
  .search-input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background-color: white;
    color: #4a5568;
    font-size: 0.875rem;
  }
  
  .search-input:hover {
    border-color: #cbd5e0;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
  
  .active-filters {
    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .filter-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.5rem;
    background-color: #edf2f7;
    border-radius: 4px;
    font-size: 0.875rem;
    color: #4a5568;
  }
  
  .remove-tag {
    padding: 0;
    background: none;
    border: none;
    color: #718096;
    cursor: pointer;
    font-size: 1.25rem;
    line-height: 1;
    margin-left: 0.25rem;
  }
  
  .remove-tag:hover {
    color: #e53e3e;
  }
  
  .categories-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  
  .category-section {
    padding-bottom: 2rem;
  }
  
  .category-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid var(--border);
  }
  
  .category-description {
    margin-bottom: 0.5rem;
    color: var(--text);
  }
  
  .business-applications {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    font-style: italic;
  }
  
  .commands-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }
  
  .command-card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    border-left: 4px solid var(--border);
  }
  
  .command-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .essential-command {
    border-left-color: var(--accent);
  }
  
  .command-header {
    padding: 0.75rem;
    background-color: #f7fafc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border);
  }
  
  .difficulty-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    font-weight: 600;
    text-transform: capitalize;
  }
  
  .beginner {
    background-color: #c6f6d5;
    color: #22543d;
  }
  
  .intermediate {
    background-color: #bee3f8;
    color: #2a4365;
  }
  
  .advanced {
    background-color: #fed7d7;
    color: #822727;
  }
  
  .os-badges {
    display: flex;
    gap: 0.5rem;
  }
  
  .os-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    background-color: #edf2f7;
    color: #4a5568;
  }
  
  .command-content {
    padding: 1rem;
    flex: 1;
  }
  
  .command-code {
    font-family: 'JetBrains Mono', monospace;
    background-color: #1a202c;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow-x: auto;
    font-size: 0.875rem;
  }
  
  .command-description {
    margin-bottom: 0.75rem;
  }
  
  .business-application {
    color: var(--text-light);
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
  
  .command-example {
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    overflow: hidden;
  }
  
  .example-input {
    padding: 0.75rem;
    border-bottom: 1px dashed #e2e8f0;
    display: flex;
  }
  
  .prompt {
    color: var(--accent);
    margin-right: 0.5rem;
  }
  
  .example-output {
    padding: 0.75rem;
    color: #4a5568;
    white-space: pre-wrap;
    word-break: break-word;
  }
  
  .command-warning {
    background-color: #fffbeb;
    border: 1px solid #fbd38d;
    border-radius: 4px;
    padding: 0.75rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #744210;
  }
  
  .warning-icon {
    font-size: 1rem;
  }
  
  .command-actions {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    background-color: #f7fafc;
    border-top: 1px solid var(--border);
  }
  
  .btn-sm {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }
  
  .btn-success {
    background-color: var(--success);
    border-color: var(--success);
  }
  
  .no-results {
    text-align: center;
    padding: 3rem 0;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .no-results p {
    margin-bottom: 1rem;
    color: var(--text-light);
  }
  
  @media (max-width: 768px) {
    .filtering-controls {
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
    }
    
    .filter-section {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .search-section {
      margin-left: 0;
      max-width: none;
    }
  }
  </style>