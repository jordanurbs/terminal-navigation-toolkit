<template>
    <div class="terminal-simulator">
      <div class="terminal-titlebar">
        <div class="titlebar-buttons">
          <div class="titlebar-btn close"></div>
          <div class="titlebar-btn minimize"></div>
          <div class="titlebar-btn maximize"></div>
        </div>
        <div class="titlebar-title">{{ title }}</div>
      </div>
      
      <div class="terminal-content" ref="terminalContent">
        <div v-for="(line, index) in terminalLines" :key="index" class="terminal-line">
          <template v-if="line.type === 'prompt'">
            <span class="terminal-prompt">
              <span class="terminal-user">{{ user }}</span>
              <span>@</span>
              <span class="terminal-host">{{ hostname }}</span>
              <span>:</span>
              <span class="terminal-path">{{ line.path }}</span>
              <span>$</span>
            </span>
            <span 
              :class="[
                'terminal-command', 
                { 'typing-animation': index === terminalLines.length - 1 && isTyping }
              ]"
            >{{ line.content }}</span>
          </template>
          
          <template v-else-if="line.type === 'output'">
            <span class="terminal-output">{{ line.content }}</span>
          </template>
          
          <template v-else-if="line.type === 'error'">
            <span class="terminal-error">{{ line.content }}</span>
          </template>
          
          <template v-else-if="line.type === 'success'">
            <span class="terminal-success">{{ line.content }}</span>
          </template>
          
          <template v-else-if="line.type === 'warning'">
            <span class="terminal-warning">{{ line.content }}</span>
          </template>
          
          <template v-else-if="line.type === 'highlight'">
            <span class="terminal-highlight">{{ line.content }}</span>
          </template>
          
          <template v-else-if="line.type === 'comment'">
            <span class="terminal-comment">{{ line.content }}</span>
          </template>
        </div>
        
        <div v-if="interactive" class="terminal-input-line">
          <span class="terminal-prompt">
            <span class="terminal-user">{{ user }}</span>
            <span>@</span>
            <span class="terminal-host">{{ hostname }}</span>
            <span>:</span>
            <span class="terminal-path">{{ currentPath }}</span>
            <span>$</span>
          </span>
          <input 
            type="text" 
            ref="commandInput"
            class="terminal-input"
            v-model="commandInput"
            @keydown.enter="executeCommand"
            @keydown.up="navigateHistory(-1)"
            @keydown.down="navigateHistory(1)"
            @keydown.tab.prevent="autocompleteCommand"
            :disabled="isRunning"
            :placeholder="isRunning ? 'Command running...' : ''"
          />
        </div>
      </div>
      
      <div v-if="interactive && commandSuggestions.length > 0" class="command-suggestions">
        <div 
          v-for="(suggestion, index) in commandSuggestions" 
          :key="index"
          class="suggestion-item"
          :class="{ active: currentSuggestionIndex === index }"
          @click="selectSuggestion(suggestion)"
        >
          <span class="suggestion-command">{{ suggestion.command }}</span>
          <span v-if="suggestion.description" class="suggestion-description">{{ suggestion.description }}</span>
        </div>
      </div>
      
      <div v-if="showFileSystem" class="file-explorer">
        <div class="directory-tree">
          <div 
            v-for="(item, index) in fileSystem" 
            :key="index"
            class="directory-item"
            :class="{ selected: selectedFile === item.path }"
            @click="selectFile(item.path)"
          >
            <span class="directory-icon" :class="item.type === 'folder' ? 'folder-icon' : 'file-icon'">
              {{ item.type === 'folder' ? '📁' : '📄' }}
            </span>
            <span>{{ item.name }}</span>
          </div>
        </div>
        
        <div v-if="selectedFileContent" class="file-preview">
          <pre>{{ selectedFileContent }}</pre>
        </div>
      </div>
      
      <div v-if="interactive" class="terminal-toolbar">
        <button @click="clearTerminal">Clear</button>
        <button @click="toggleHistory">History</button>
        <button @click="toggleHelp">Help</button>
        <button @click="toggleFileSystem">Files</button>
      </div>
      
      <div v-if="showHelp" class="help-panel">
        <div class="help-section">
          <div class="help-title">Available Commands</div>
          <div class="help-commands">
            <div v-for="(cmd, index) in availableCommands" :key="index" class="help-command">
              <span class="command-name">{{ cmd.command }}</span>
              <span class="command-desc">{{ cmd.description }}</span>
            </div>
          </div>
        </div>
        
        <div class="help-section">
          <div class="help-title">Keyboard Shortcuts</div>
          <div class="help-commands">
            <div class="help-command">
              <span class="command-name">↑ / ↓</span>
              <span class="command-desc">Navigate command history</span>
            </div>
            <div class="help-command">
              <span class="command-name">Tab</span>
              <span class="command-desc">Autocomplete command</span>
            </div>
            <div class="help-command">
              <span class="command-name">Ctrl+C</span>
              <span class="command-desc">Cancel current command</span>
            </div>
            <div class="help-command">
              <span class="command-name">Ctrl+L</span>
              <span class="command-desc">Clear terminal</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="showHistory" class="terminal-history">
        <div class="history-title">Command History</div>
        <div 
          v-for="(cmd, index) in commandHistory" 
          :key="index"
          class="history-item"
          @click="selectHistoryCommand(cmd)"
        >
          {{ cmd }}
        </div>
      </div>
      
      <div v-if="challengeMode" class="challenge-prompt">
        <div class="challenge-description">{{ challenge.description }}</div>
        <div class="challenge-goal">Goal: {{ challenge.goal }}</div>
        
        <div v-if="validationMessage" :class="['validation-message', validationStatus ? 'validation-success' : 'validation-error']">
          {{ validationMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TerminalSimulator',
    props: {
      title: {
        type: String,
        default: 'Terminal'
      },
      user: {
        type: String,
        default: 'user'
      },
      hostname: {
        type: String,
        default: 'captain'
      },
      initialPath: {
        type: String,
        default: '~'
      },
      initialLines: {
        type: Array,
        default: () => []
      },
      interactive: {
        type: Boolean,
        default: false
      },
      demoCommands: {
        type: Array,
        default: () => []
      },
      typingSpeed: {
        type: Number,
        default: 50
      },
      playCursorSound: {
        type: Boolean,
        default: false
      },
      challengeMode: {
        type: Boolean,
        default: false
      },
      challenge: {
        type: Object,
        default: () => ({
          description: '',
          goal: '',
          validation: () => true
        })
      }
    },
    data() {
      return {
        terminalLines: [...this.initialLines],
        currentPath: this.initialPath,
        isTyping: false,
        typeIndex: 0,
        commandInput: '',
        commandHistory: [],
        historyIndex: -1,
        isRunning: false,
        currentDemoIndex: 0,
        demoTimeout: null,
        availableCommands: [
          { command: 'help', description: 'Show available commands' },
          { command: 'clear', description: 'Clear terminal output' },
          { command: 'pwd', description: 'Print working directory' },
          { command: 'ls', description: 'List directory contents' },
          { command: 'cd <dir>', description: 'Change directory' },
          { command: 'mkdir <dir>', description: 'Create a directory' },
          { command: 'touch <file>', description: 'Create a file' },
          { command: 'cat <file>', description: 'Display file contents' },
          { command: 'rm <file>', description: 'Remove a file' },
          { command: 'echo <text>', description: 'Display text' },
          { command: 'whoami', description: 'Display current user' },
          { command: 'history', description: 'Show command history' }
        ],
        commandSuggestions: [],
        currentSuggestionIndex: -1,
        showHistory: false,
        showHelp: false,
        showFileSystem: false,
        fileSystem: [
          { name: 'Documents', path: '~/Documents', type: 'folder' },
          { name: 'Projects', path: '~/Projects', type: 'folder' },
          { name: 'readme.txt', path: '~/readme.txt', type: 'file' },
          { name: 'captains_log.txt', path: '~/captains_log.txt', type: 'file' }
        ],
        selectedFile: '',
        selectedFileContent: '',
        validationMessage: '',
        validationStatus: false
      };
    },
    mounted() {
      if (this.demoCommands.length > 0) {
        this.playDemo();
      }
      
      if (this.interactive) {
        this.$nextTick(() => {
          this.$refs.commandInput?.focus();
        });
        
        window.addEventListener('keydown', this.handleGlobalKeydown);
      }
      
      this.scrollToBottom();
    },
    beforeDestroy() {
      if (this.demoTimeout) {
        clearTimeout(this.demoTimeout);
      }
      
      window.removeEventListener('keydown', this.handleGlobalKeydown);
    },
    methods: {
      addLine(line) {
        this.terminalLines.push(line);
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      
      scrollToBottom() {
        if (this.$refs.terminalContent) {
          this.$refs.terminalContent.scrollTop = this.$refs.terminalContent.scrollHeight;
        }
      },
      
      typeCommand(command, callback) {
        this.isTyping = true;
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index < command.length) {
            this.terminalLines[this.terminalLines.length - 1].content = command.substring(0, index + 1);
            index++;
            
            if (this.playCursorSound && index % 3 === 0) {
              // Play cursor sound if available
              // Could implement a simple audio effect here
            }
          } else {
            clearInterval(typeInterval);
            this.isTyping = false;
            if (callback) callback();
          }
        }, this.typingSpeed);
      },
      
      executeCommand() {
        if (!this.commandInput.trim() || this.isRunning) return;
        
        const command = this.commandInput.trim();
        this.addLine({
          type: 'prompt',
          path: this.currentPath,
          content: command
        });
        
        // Add to history
        if (this.commandHistory.indexOf(command) === -1) {
          this.commandHistory.unshift(command);
          if (this.commandHistory.length > 20) {
            this.commandHistory.pop();
          }
        }
        
        this.historyIndex = -1;
        this.commandInput = '';
        this.commandSuggestions = [];
        this.isRunning = true;
        
        // Process command
        this.processCommand(command, () => {
          this.isRunning = false;
          this.$nextTick(() => {
            this.$refs.commandInput?.focus();
          });
          
          // Check challenge validation if in challenge mode
          if (this.challengeMode && typeof this.challenge.validation === 'function') {
            const result = this.challenge.validation(command, this.terminalLines);
            if (result === true || (typeof result === 'object' && result.success)) {
              this.validationStatus = true;
              this.validationMessage = typeof result === 'object' ? result.message : 'Challenge completed successfully!';
              this.$emit('challenge-completed');
            } else if (result === false || (typeof result === 'object' && !result.success)) {
              this.validationStatus = false;
              this.validationMessage = typeof result === 'object' ? result.message : 'Not quite right. Try again!';
            }
          }
        });
      },
      
      processCommand(command, callback) {
        // Basic command simulation
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        setTimeout(() => {
          switch(cmd) {
            case 'help':
              this.showCommandHelp();
              break;
              
            case 'clear':
              this.clearTerminal();
              break;
              
            case 'pwd':
              this.addLine({
                type: 'output',
                content: this.currentPath
              });
              break;
              
            case 'ls':
              this.listDirectory(args[0]);
              break;
              
            case 'cd':
              this.changeDirectory(args[0]);
              break;
              
            case 'mkdir':
              if (args[0]) {
                this.addLine({
                  type: 'output',
                  content: `Created directory: ${args[0]}`
                });
                
                // Simulate adding to file system
                this.fileSystem.push({
                  name: args[0],
                  path: `${this.currentPath}/${args[0]}`,
                  type: 'folder'
                });
              } else {
                this.addLine({
                  type: 'error',
                  content: 'mkdir: missing operand'
                });
              }
              break;
              
            case 'touch':
              if (args[0]) {
                this.addLine({
                  type: 'output',
                  content: `Created file: ${args[0]}`
                });
                
                // Simulate adding to file system
                this.fileSystem.push({
                  name: args[0],
                  path: `${this.currentPath}/${args[0]}`,
                  type: 'file'
                });
              } else {
                this.addLine({
                  type: 'error',
                  content: 'touch: missing file operand'
                });
              }
              break;
              
            case 'echo':
              if (args.length > 0) {
                const text = args.join(' ');
                this.addLine({
                  type: 'output',
                  content: text
                });
              } else {
                this.addLine({
                  type: 'output',
                  content: ''
                });
              }
              break;
              
            case 'cat':
              if (args[0]) {
                this.catFile(args[0]);
              } else {
                this.addLine({
                  type: 'error',
                  content: 'cat: missing file operand'
                });
              }
              break;
              
            case 'rm':
              if (args[0]) {
                this.addLine({
                  type: 'output',
                  content: `Removed: ${args[0]}`
                });
                
                // Simulate removing from file system
                const index = this.fileSystem.findIndex(file => file.name === args[0] && file.path.startsWith(this.currentPath));
                if (index !== -1) {
                  this.fileSystem.splice(index, 1);
                }
              } else {
                this.addLine({
                  type: 'error',
                  content: 'rm: missing operand'
                });
              }
              break;
              
            case 'whoami':
              this.addLine({
                type: 'output',
                content: this.user
              });
              break;
              
            case 'history':
              this.showHistory = true;
              break;
              
            default:
              this.addLine({
                type: 'success',
                content: `status: LFG!`
              });
          }
          
          if (callback) callback();
        }, 100); // Small delay to simulate processing
      },
      
      showCommandHelp() {
        this.addLine({
          type: 'output',
          content: 'Available commands:'
        });
        
        this.availableCommands.forEach(cmd => {
          this.addLine({
            type: 'output',
            content: `  ${cmd.command.padEnd(15)} - ${cmd.description}`
          });
        });
      },
      
      clearTerminal() {
        this.terminalLines = [];
        this.showHelp = false;
        this.showHistory = false;
        this.validationMessage = '';
      },
      
      listDirectory(path) {
        // Simulate listing files and directories
        const directoryContents = this.fileSystem
          .filter(item => {
            // Simple simulation - just check if the path starts with current path
            return item.path.startsWith(this.currentPath === '~' ? '~' : this.currentPath);
          })
          .map(item => ({ name: item.name, type: item.type }));
        
        if (directoryContents.length === 0) {
          this.addLine({
            type: 'output',
            content: '(empty directory)'
          });
        } else {
          // Group by type and sort alphabetically
          const folders = directoryContents
            .filter(item => item.type === 'folder')
            .map(item => item.name)
            .sort();
            
          const files = directoryContents
            .filter(item => item.type === 'file')
            .map(item => item.name)
            .sort();
          
          // Display folders first, then files
          let output = '';
          if (folders.length > 0) {
            output += folders.map(folder => `${folder}/`).join('  ') + '\n';
          }
          if (files.length > 0) {
            output += files.join('  ');
          }
          
          this.addLine({
            type: 'output',
            content: output
          });
        }
      },
      
      changeDirectory(path) {
        if (!path) {
          // cd without args goes to home
          this.currentPath = '~';
          return;
        }
        
        if (path === '..') {
          // Go up one level
          if (this.currentPath === '~') {
            // Already at home, can't go up
            return;
          }
          
          const parts = this.currentPath.split('/');
          parts.pop();
          this.currentPath = parts.join('/') || '~';
        } else if (path === '~' || path === '/') {
          // Go to home or root
          this.currentPath = path;
        } else if (path.startsWith('/')) {
          // Absolute path
          this.currentPath = path;
        } else {
          // Relative path
          this.currentPath = this.currentPath === '~' 
            ? `~/${path}` 
            : `${this.currentPath}/${path}`;
        }
      },
      
      catFile(filename) {
        // Find the file in our simulated file system
        const file = this.fileSystem.find(f => 
          f.name === filename && 
          f.path.startsWith(this.currentPath) && 
          f.type === 'file'
        );
        
        if (file) {
          // Generate some content based on the filename
          let content = '';
          if (filename === 'readme.txt') {
            content = 'Welcome to the Terminal Navigation Toolkit!\n\nThis interactive terminal simulator helps you practice command line skills in a safe environment.\n\nType "help" to see available commands.';
          } else if (filename === 'captains_log.txt') {
            content = 'Captain\'s Log, Terminal Date 2023.03.14\n\nToday I began my journey from AI passenger to AI captain.\nThe command line is becoming less intimidating with each command I learn.\n\nEnd of log entry.';
          } else {
            content = `Contents of ${filename}`;
          }
          
          this.addLine({
            type: 'output',
            content: content
          });
        } else {
          this.addLine({
            type: 'error',
            content: `cat: ${filename}: No such file or directory`
          });
        }
      },
      
      playDemo() {
        if (this.currentDemoIndex >= this.demoCommands.length) {
          this.currentDemoIndex = 0;
          this.$emit('demo-complete');
          return;
        }
        
        const demoCommand = this.demoCommands[this.currentDemoIndex];
        this.addLine({
          type: 'prompt',
          path: this.currentPath,
          content: ''
        });
        
        this.typeCommand(demoCommand, () => {
          this.processCommand(demoCommand, () => {
            this.currentDemoIndex++;
            this.demoTimeout = setTimeout(() => {
              this.playDemo();
            }, 1000);
          });
        });
      },
      
      navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        if (direction < 0) {
          // Up - go back in history
          if (this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
          }
        } else {
          // Down - go forward in history
          if (this.historyIndex > -1) {
            this.historyIndex--;
          }
        }
        
        if (this.historyIndex === -1) {
          this.commandInput = '';
        } else {
          this.commandInput = this.commandHistory[this.historyIndex];
        }
      },
      
      autocompleteCommand() {
        if (!this.commandInput) return;
        
        const input = this.commandInput.toLowerCase();
        const suggestions = this.availableCommands.filter(cmd => 
          cmd.command.startsWith(input)
        );
        
        if (suggestions.length === 1) {
          // If there's only one suggestion, autocomplete it
          this.commandInput = suggestions[0].command;
        } else if (suggestions.length > 1) {
          // Show suggestions
          this.commandSuggestions = suggestions;
          this.currentSuggestionIndex = 0;
        }
      },
      
      selectSuggestion(suggestion) {
        this.commandInput = suggestion.command;
        this.commandSuggestions = [];
        this.$refs.commandInput?.focus();
      },
      
      selectHistoryCommand(command) {
        this.commandInput = command;
        this.showHistory = false;
        this.$refs.commandInput?.focus();
      },
      
      handleGlobalKeydown(event) {
        // Check if terminal has focus
        if (document.activeElement !== this.$refs.commandInput) return;
        
        if (event.key === 'c' && event.ctrlKey) {
          // Ctrl+C - cancel current command
          if (this.isRunning) {
            this.isRunning = false;
            this.addLine({
              type: 'error',
              content: '^C'
            });
            this.commandInput = '';
          }
        } else if (event.key === 'l' && event.ctrlKey) {
          // Ctrl+L - clear terminal
          event.preventDefault();
          this.clearTerminal();
        }
      },
      
      toggleHistory() {
        this.showHistory = !this.showHistory;
        this.showHelp = false;
        this.showFileSystem = false;
      },
      
      toggleHelp() {
        this.showHelp = !this.showHelp;
        this.showHistory = false;
        this.showFileSystem = false;
      },
      
      toggleFileSystem() {
        this.showFileSystem = !this.showFileSystem;
        this.showHistory = false;
        this.showHelp = false;
      },
      
      selectFile(path) {
        this.selectedFile = path;
        const file = this.fileSystem.find(f => f.path === path);
        
        if (file && file.type === 'file') {
          // Generate content based on filename
          if (file.name === 'readme.txt') {
            this.selectedFileContent = 'Welcome to the Terminal Navigation Toolkit!\n\nThis interactive terminal simulator helps you practice command line skills in a safe environment.\n\nType "help" to see available commands.';
          } else if (file.name === 'captains_log.txt') {
            this.selectedFileContent = 'Captain\'s Log, Terminal Date 2023.03.14\n\nToday I began my journey from AI passenger to AI captain.\nThe command line is becoming less intimidating with each command I learn.\n\nEnd of log entry.';
          } else {
            this.selectedFileContent = `Contents of ${file.name}`;
          }
        } else {
          this.selectedFileContent = '';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  @import '../assets/styles/terminal-simulator.css';
  </style>