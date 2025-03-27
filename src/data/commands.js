// Data for the Interactive Command Line Cheat Sheet
export const commandCategories = [
    {
      id: "navigation",
      name: "Navigation Commands",
      description: "Commands for moving around your file system",
      icon: "🧭",
      businessApplications: "Navigate project folders efficiently"
    },
    {
      id: "files",
      name: "File Operations",
      description: "Commands for creating, copying, and managing files",
      icon: "📄",
      businessApplications: "Organize and maintain project assets"
    },
    {
      id: "content",
      name: "Content Viewing & Editing",
      description: "Commands for displaying and modifying file contents",
      icon: "📝",
      businessApplications: "Quick edits and content reviews"
    },
    {
      id: "system",
      name: "System Information",
      description: "Commands for viewing system status and resources",
      icon: "💻",
      businessApplications: "Monitor system resources for optimal performance"
    },
    {
      id: "network",
      name: "Networking",
      description: "Commands for internet connectivity and remote servers",
      icon: "🌐",
      businessApplications: "Test connections and interact with web services"
    },
    {
      id: "compression",
      name: "Compression",
      description: "Commands for creating and extracting archives",
      icon: "🗜️",
      businessApplications: "Package files for delivery or backup"
    },
    {
      id: "git",
      name: "Git & Version Control",
      description: "Commands for tracking changes and collaborating",
      icon: "🔄",
      businessApplications: "Track changes and collaborate on projects"
    },
    {
      id: "ai-dev",
      name: "AI Development",
      description: "Commands for setting up and managing AI projects",
      icon: "🤖",
      businessApplications: "Build AI-powered tools and applications"
    }
  ];
  
  export const commands = [
    // Navigation Commands
    {
      id: "pwd",
      category: "navigation",
      command: "pwd",
      description: "Print Working Directory - Shows your current location",
      businessApplication: "Confirm you're in the right project folder before making changes",
      example: {
        input: "pwd",
        output: "/Users/jordan/client-projects/acme-website"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "ls",
      category: "navigation",
      command: "ls",
      description: "List - Shows files and folders in current location",
      businessApplication: "Quickly inventory project assets without opening Finder/Explorer",
      example: {
        input: "ls",
        output: "css  images  index.html  js  README.md"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "dir",
      category: "navigation",
      command: "dir",
      description: "Directory - Windows equivalent of ls",
      businessApplication: "Quickly inventory project assets without opening Explorer",
      example: {
        input: "dir",
        output: " Volume in drive C is Windows\n Volume Serial Number is 1234-5678\n\n Directory of C:\\Users\\jordan\\projects\n\n06/10/2023  10:30 AM    <DIR>          .\n06/10/2023  10:28 AM    <DIR>          ..\n06/10/2023  10:29 AM               321 README.md\n               1 File(s)            321 bytes\n               2 Dir(s)  789,012,345 bytes free"
      },
      osSupport: ["windows-cmd", "windows-powershell"],
      difficulty: "beginner"
    },
    {
      id: "cd",
      category: "navigation",
      command: "cd [folder]",
      description: "Change Directory - Moves you to specified folder",
      businessApplication: "Navigate between different project components efficiently",
      example: {
        input: "cd client-projects",
        output: "(changes to that directory)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "cd-parent",
      category: "navigation",
      command: "cd ..",
      description: "Move up one level in folder hierarchy",
      businessApplication: "Return to parent folder after completing work in subdirectory",
      example: {
        input: "cd ..",
        output: "(moves up one directory)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "find",
      category: "navigation",
      command: "find . -name \"*.txt\"",
      description: "Find all .txt files in current directory and subdirectories",
      businessApplication: "Quickly locate specific file types across complex project structures",
      example: {
        input: "find . -name \"*.jpg\"",
        output: "./images/header.jpg\n./images/products/product1.jpg"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    
    // File Operations
    {
      id: "touch",
      category: "files",
      command: "touch [filename]",
      description: "Create a new empty file",
      businessApplication: "Quickly set up placeholder files for your project structure",
      example: {
        input: "touch meeting-notes.md",
        output: "(creates empty file)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "mkdir",
      category: "files",
      command: "mkdir [foldername]",
      description: "Make Directory - Creates a new folder",
      businessApplication: "Organize project components without clicking through interfaces",
      example: {
        input: "mkdir client-assets",
        output: "(creates new directory)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "cp",
      category: "files",
      command: "cp [source] [destination]",
      description: "Copy - Duplicates a file or folder",
      businessApplication: "Create backups before making major changes",
      example: {
        input: "cp important-config.json important-config.backup.json",
        output: "(creates copy)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "mv",
      category: "files",
      command: "mv [source] [destination]",
      description: "Move/Rename - Moves or renames files/folders",
      businessApplication: "Reorganize projects or standardize file naming",
      example: {
        input: "mv old-name.txt new-name.txt",
        output: "(renames file)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "rm",
      category: "files",
      command: "rm [file]",
      description: "Remove - Deletes a file (caution: no recycle bin)",
      businessApplication: "Clean up temporary files to maintain organized workspace",
      example: {
        input: "rm temp-file.txt",
        output: "(deletes file)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner",
      warning: "Permanently deletes files with no undo"
    },
    {
      id: "rm-rf",
      category: "files",
      command: "rm -rf [folder]",
      description: "Remove folder and all contents (use with extreme caution)",
      businessApplication: "Clean up entire project folders when archiving old work",
      example: {
        input: "rm -rf old-project-backup",
        output: "(deletes folder and contents)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate",
      warning: "EXTREMELY DANGEROUS - permanently deletes directories and all contents"
    },
    
    // Content Viewing & Editing
    {
      id: "cat",
      category: "content",
      command: "cat [file]",
      description: "Concatenate - Display file contents",
      businessApplication: "Quickly review small configuration files or notes",
      example: {
        input: "cat config.json",
        output: "{ \"api_key\": \"123xyz\", \"endpoint\": \"https://api.example.com\" }"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "head",
      category: "content",
      command: "head -n 10 [file]",
      description: "Show first 10 lines of a file",
      businessApplication: "Preview the beginning of large data files before processing",
      example: {
        input: "head -n 5 customers.csv",
        output: "id,name,email\n1,John Smith,john@example.com\n2,Jane Doe,jane@example.com\n3,Bob Johnson,bob@example.com\n4,Alice Williams,alice@example.com"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "tail",
      category: "content",
      command: "tail -n 10 [file]",
      description: "Show last 10 lines of a file",
      businessApplication: "Check most recent entries in log files",
      example: {
        input: "tail -n 5 error.log",
        output: "[2023-03-12 14:32:11] Connection error: timeout\n[2023-03-12 14:35:22] Authentication failed\n[2023-03-12 14:40:15] Connection error: timeout\n[2023-03-12 14:45:08] File not found\n[2023-03-12 14:50:30] Access denied"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "grep",
      category: "content",
      command: "grep \"search term\" [file]",
      description: "Search for text pattern in files",
      businessApplication: "Find specific customer records or configuration settings",
      example: {
        input: "grep \"error\" app.log",
        output: "[2023-03-12 14:32:11] Connection error: timeout\n[2023-03-12 14:40:15] Connection error: timeout"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    {
      id: "echo-create",
      category: "content",
      command: "echo \"text\" > [file]",
      description: "Write text to file (overwrites existing)",
      businessApplication: "Create simple configuration files or quick notes",
      example: {
        input: "echo \"Meeting at 3pm\" > reminder.txt",
        output: "(creates/overwrites file with text)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "echo-append",
      category: "content",
      command: "echo \"text\" >> [file]",
      description: "Append text to file",
      businessApplication: "Add new entries to logs or notes without erasing existing content",
      example: {
        input: "echo \"New task: Update website\" >> todo.txt",
        output: "(adds text to end of file)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    
    // System Information
    {
      id: "df",
      category: "system",
      command: "df -h",
      description: "Disk Free - Show storage space usage",
      businessApplication: "Monitor available space before working with large files",
      example: {
        input: "df -h",
        output: "Filesystem    Size  Used  Avail  Use%  Mounted on\n/dev/sda1     237G   68G   158G   31%   /"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "top",
      category: "system",
      command: "top",
      description: "Show running processes and resource usage",
      businessApplication: "Identify resource-intensive applications slowing your system",
      example: {
        input: "top",
        output: "(interactive process viewer)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    {
      id: "ps",
      category: "system",
      command: "ps aux",
      description: "Process Status - List all running processes",
      businessApplication: "Find process IDs when you need to stop unresponsive applications",
      example: {
        input: "ps aux | grep chrome",
        output: "jordan    1234  3.4  2.3  Chrome"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    {
      id: "whoami",
      category: "system",
      command: "whoami",
      description: "Show current user",
      businessApplication: "Verify which user account is running commands",
      example: {
        input: "whoami",
        output: "jordan"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "history",
      category: "system",
      command: "history",
      description: "Show recently used commands",
      businessApplication: "Recall and reuse complex commands from earlier work",
      example: {
        input: "history",
        output: "1  cd projects\n2  mkdir new-project\n3  cd new-project\n4  touch index.html"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    
    // Networking
    {
      id: "ping",
      category: "network",
      command: "ping [website]",
      description: "Check connection to a server",
      businessApplication: "Verify your connection to important services",
      example: {
        input: "ping google.com",
        output: "64 bytes from 142.250.72.14: time=12.1 ms"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "curl",
      category: "network",
      command: "curl [url]",
      description: "Transfer data from/to a server",
      businessApplication: "Test APIs or download files directly",
      example: {
        input: "curl https://api.example.com/data",
        output: "{\"status\":\"success\",\"data\":{\"id\":123,\"name\":\"Product\"}}"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    {
      id: "wget",
      category: "network",
      command: "wget [url]",
      description: "Download files from the web",
      businessApplication: "Save resources directly from the internet",
      example: {
        input: "wget https://example.com/report.pdf",
        output: "(downloads file)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    {
      id: "ssh",
      category: "network",
      command: "ssh [user]@[server]",
      description: "Secure Shell - Connect to remote server",
      businessApplication: "Access your web server for maintenance or updates",
      example: {
        input: "ssh jordan@myserver.com",
        output: "(connects to remote server)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    {
      id: "scp",
      category: "network",
      command: "scp [file] [user]@[server]:[path]",
      description: "Secure Copy - Transfer files to server",
      businessApplication: "Upload website updates or backup files securely",
      example: {
        input: "scp website.zip jordan@myserver.com:/var/www/",
        output: "(transfers file)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "advanced"
    },
    
    // Compression
    {
      id: "zip",
      category: "compression",
      command: "zip -r [zipfile] [folder]",
      description: "Create a zip archive",
      businessApplication: "Package multiple files for clients or backup",
      example: {
        input: "zip -r project-delivery.zip client-project/",
        output: "(creates zip file)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    {
      id: "unzip",
      category: "compression",
      command: "unzip [zipfile]",
      description: "Extract zip archive",
      businessApplication: "Unpack received assets or downloaded templates",
      example: {
        input: "unzip received-assets.zip",
        output: "(extracts files)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "beginner"
    },
    {
      id: "tar-create",
      category: "compression",
      command: "tar -czvf [name].tar.gz [folder]",
      description: "Create compressed tar archive",
      businessApplication: "Create efficient backups of large projects",
      example: {
        input: "tar -czvf project-backup.tar.gz project/",
        output: "(creates archive)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    {
      id: "tar-extract",
      category: "compression",
      command: "tar -xzvf [archive]",
      description: "Extract tar archive",
      businessApplication: "Restore from backups or open downloaded resources",
      example: {
        input: "tar -xzvf project-backup.tar.gz",
        output: "(extracts files)"
      },
      osSupport: ["mac", "linux", "windows-git-bash"],
      difficulty: "intermediate"
    },
    
    // Git Commands
    {
      id: "git-init",
      category: "git",
      command: "git init",
      description: "Initialize a new Git repository",
      businessApplication: "Start tracking changes to your project",
      example: {
        input: "git init",
        output: "Initialized empty Git repository in /path/to/project/.git/"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "git-clone",
      category: "git",
      command: "git clone [url]",
      description: "Clone a repository from remote source",
      businessApplication: "Download existing project for local development",
      example: {
        input: "git clone https://github.com/username/project.git",
        output: "Cloning into 'project'...\nremote: Enumerating objects: 125, done.\nremote: Counting objects: 100% (125/125), done.\nremote: Compressing objects: 100% (80/80), done.\nUnpacking objects: 100% (125/125), done."
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "git-status",
      category: "git",
      command: "git status",
      description: "Show working tree status",
      businessApplication: "Check which files have been modified",
      example: {
        input: "git status",
        output: "On branch main\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n  (use \"git restore <file>...\" to discard changes in working directory)\n        modified:   index.html\n\nno changes added to commit (use \"git add\" and/or \"git commit -a\")"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "git-add",
      category: "git",
      command: "git add [file]",
      description: "Add file contents to the staging area",
      businessApplication: "Prepare changes for commit",
      example: {
        input: "git add index.html",
        output: "(stages the file for commit)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "git-commit",
      category: "git",
      command: "git commit -m \"[message]\"",
      description: "Record changes to the repository",
      businessApplication: "Create a snapshot of your project at a specific point",
      example: {
        input: "git commit -m \"Update header with new logo\"",
        output: "[main abc1234] Update header with new logo\n 1 file changed, 5 insertions(+), 2 deletions(-)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "git-push",
      category: "git",
      command: "git push [remote] [branch]",
      description: "Update remote refs along with objects",
      businessApplication: "Share your changes with team members",
      example: {
        input: "git push origin main",
        output: "Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (3/3), done.\nWriting objects: 100% (3/3), 323 bytes | 323.00 KiB/s, done.\nTotal 3 (delta 2), reused 0 (delta 0), pack-reused 0\nTo github.com:username/project.git\n   e7d9abd..8e5e403  main -> main"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "git-pull",
      category: "git",
      command: "git pull",
      description: "Fetch from and integrate with another repository or branch",
      businessApplication: "Get latest changes from team members",
      example: {
        input: "git pull",
        output: "Updating e7d9abd..8e5e403\nFast-forward\n readme.md | 5 +++--\n 1 file changed, 3 insertions(+), 2 deletions(-)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "git-branch",
      category: "git",
      command: "git branch [branch-name]",
      description: "Create a new branch",
      businessApplication: "Work on features without affecting the main codebase",
      example: {
        input: "git branch feature-login",
        output: "(creates new branch)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "git-checkout",
      category: "git",
      command: "git checkout [branch-name]",
      description: "Switch branches or restore working tree files",
      businessApplication: "Move between different versions of your project",
      example: {
        input: "git checkout feature-login",
        output: "Switched to branch 'feature-login'"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "git-merge",
      category: "git",
      command: "git merge [branch]",
      description: "Join two or more development histories together",
      businessApplication: "Combine completed features into the main project",
      example: {
        input: "git merge feature-login",
        output: "Updating e7d9abd..8e5e403\nFast-forward\n login.html | 45 +++++++++++++++++++++++++++++++++++++++++++++\n 1 file changed, 45 insertions(+)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "advanced"
    },
    {
      id: "git-reset-soft",
      category: "git",
      command: "git reset HEAD~1",
      description: "Undo the last commit while keeping the changes in your working directory",
      businessApplication: "Fix commit messages or split a commit into multiple smaller ones",
      example: {
        input: "git reset HEAD~1",
        output: "(undoes last commit, keeps changes)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "git-reset-hard",
      category: "git",
      command: "git reset --hard HEAD~1",
      description: "Completely remove the last commit and its changes",
      businessApplication: "Remove experimental changes that were accidentally committed",
      example: {
        input: "git reset --hard HEAD~1",
        output: "(removes last commit and changes)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "advanced",
      warning: "This permanently deletes the changes in the commit"
    },
    {
      id: "git-log",
      category: "git",
      command: "git log",
      description: "Show commit history with commit hashes",
      businessApplication: "Find specific commits to revert or examine project histor.\n\nHINT: Exit with 'q' after you're done.",
      example: {
        input: "git log",
        output: "commit abc123...\nAuthor: Dev Name\nDate: ...\n\n    Commit message"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "beginner"
    },
    {
      id: "git-checkout-commit",
      category: "git",
      command: "git checkout [commit-hash]",
      description: "View the state of your project at a specific commit",
      businessApplication: "Examine old versions of your project or find when a bug was introduced",
      example: {
        input: "git checkout abc123",
        output: "(switches to that commit state)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate",
      warning: "You'll be in 'detached HEAD' state. Use git checkout main to return to latest version"
    },
    {
      id: "git-revert-commit",
      category: "git",
      command: "git revert [commit-hash]",
      description: "Create a new commit that undoes the changes from a specific commit",
      businessApplication: "Safely undo changes while maintaining project history",
      example: {
        input: "git revert abc123",
        output: "(creates new commit undoing changes)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "git-stash",
      category: "git",
      command: "git stash",
      description: "Temporarily store uncommitted changes",
      businessApplication: "Save work in progress when you need to switch tasks",
      example: {
        input: "git stash",
        output: "Saved working directory and index state WIP on main: abc123"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "git-stash-pop",
      category: "git",
      command: "git stash pop",
      description: "Restore the most recently stashed changes",
      businessApplication: "Resume work on previously saved changes",
      example: {
        input: "git stash pop",
        output: "On branch main\nChanges not staged for commit: ..."
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    
    // AI Development Commands
    {
      id: "venv",
      category: "ai-dev",
      command: "python -m venv env",
      description: "Create a Python virtual environment",
      businessApplication: "Isolate AI project dependencies for reliable deployment",
      example: {
        input: "python -m venv ai-project-env",
        output: "(creates environment)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "activate-venv",
      category: "ai-dev",
      command: "source env/bin/activate",
      description: "Activate virtual environment",
      businessApplication: "Enter isolated environment before working on AI projects",
      example: {
        input: "source ai-project-env/bin/activate",
        output: "(ai-project-env) $"
      },
      osSupport: ["mac", "linux"],
      difficulty: "intermediate"
    },
    {
      id: "activate-venv-win",
      category: "ai-dev",
      command: "env\\Scripts\\activate",
      description: "Activate virtual environment (Windows)",
      businessApplication: "Enter isolated environment before working on AI projects",
      example: {
        input: "ai-project-env\\Scripts\\activate",
        output: "(ai-project-env) >"
      },
      osSupport: ["windows"],
      difficulty: "intermediate"
    },
    {
      id: "pip-install",
      category: "ai-dev",
      command: "pip install [package]",
      description: "Install Python package",
      businessApplication: "Add AI libraries like OpenAI, Langchain, or Hugging Face",
      example: {
        input: "pip install openai",
        output: "Successfully installed openai-0.28.0"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "npm-install",
      category: "ai-dev",
      command: "npm install [package]",
      description: "Install Node.js package",
      businessApplication: "Add JavaScript AI tools and frameworks",
      example: {
        input: "npm install @anthropic/sdk",
        output: "added 1 package, and audited 42 packages in 2s"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "jupyter",
      category: "ai-dev",
      command: "jupyter notebook",
      description: "Start Jupyter notebook server",
      businessApplication: "Create interactive AI development environments for data analysis",
      example: {
        input: "jupyter notebook",
        output: "(starts server in browser)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "advanced"
    },
    {
      id: "openai-key",
      category: "ai-dev",
      command: "export OPENAI_API_KEY=\"sk-...\"",
      description: "Set OpenAI API key as environment variable",
      businessApplication: "Authenticate with AI services securely",
      example: {
        input: "export OPENAI_API_KEY=\"sk-abcd1234\"",
        output: "(sets environment variable)"
      },
      osSupport: ["mac", "linux"],
      difficulty: "intermediate"
    },
    {
      id: "openai-key-win",
      category: "ai-dev",
      command: "set OPENAI_API_KEY=sk-...",
      description: "Set OpenAI API key as environment variable (Windows)",
      businessApplication: "Authenticate with AI services securely",
      example: {
        input: "set OPENAI_API_KEY=sk-abcd1234",
        output: "(sets environment variable)"
      },
      osSupport: ["windows"],
      difficulty: "intermediate"
    },
    {
      id: "python-api",
      category: "ai-dev",
      command: "python -m http.server",
      description: "Start a simple HTTP server",
      businessApplication: "Test AI web applications locally",
      example: {
        input: "python -m http.server 8000",
        output: "Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ..."
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "intermediate"
    },
    {
      id: "docker-run",
      category: "ai-dev",
      command: "docker run [image]",
      description: "Run a Docker container",
      businessApplication: "Deploy AI models in isolated environments",
      example: {
        input: "docker run -p 8501:8501 my-ai-app",
        output: "(starts containerized application)"
      },
      osSupport: ["mac", "linux", "windows"],
      difficulty: "advanced"
    }
  ];
  
  // Helper function to get commands by category
  export const getCommandsByCategory = (categoryId) => {
    return commands.filter(cmd => cmd.category === categoryId);
  };
  
  // Helper function to get commands by difficulty
  export const getCommandsByDifficulty = (difficultyLevel) => {
    return commands.filter(cmd => cmd.difficulty === difficultyLevel);
  };
  
  // Helper function to get commands by OS
  export const getCommandsByOS = (os) => {
    return commands.filter(cmd => cmd.osSupport.includes(os));
  };
  
  // Essential commands for absolute beginners
  export const essentialCommands = [
    "pwd", "ls", "cd", "cd-parent", "mkdir", "touch", "cat", "echo-create", 
    "whoami", "history", "git-init", "git-status", "git-add", "git-commit"
  ];