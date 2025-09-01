// Prompt Categories
export const promptCategories = [
  {
    id: 'copilot',
    icon: '💻',
    name: 'Cursor/VS Code/Claude Code Rules',
    description: 'System prompts (rules) for your vibe coding co-captain.'
  },
  {
    id: 'projectsetup',
    icon: '🏗️',
    name: 'Project Setup',
    description: 'Prompts & templates for setting up new projects, creating PRDs (Product Requirements Documents), initializing repositories, and configuring development environments.'
  },
  {
    id: 'claude-code-agents',
    icon: '🤖',
    name: 'Claude Code Agents',
    description: 'Community-shared agent configurations and setups for Claude Code IDE integration.'
  },
  {
    id: 'mcp',
    icon: '⚡',
    name: 'MCP',
    description: 'Model Context Protocol servers, resources, tools, and documentation for extending AI capabilities.'
  }
];

// Template Categories
export const templateCategories = [
  {
    id: 'n8n-automation',
    icon: '🔗',
    name: 'n8n Workflows',
    description: 'Ready-to-use n8n automation templates for common business processes and integrations.'
  }
];

// Combined categories for unified filtering
export const allCategories = [...promptCategories, ...templateCategories];

// Prompt Data
export const prompts = [
  {
    id: 'project-scaffold',
    categoryId: 'projectsetup',
    title: 'Project Scaffolding',
    tags: ['boilerplate', 'setup', 'starter'],
    template: `Create a starter project for a [TYPE] application using [FRAMEWORK]. Include the following features:
- [FEATURE1]
- [FEATURE2]
- [FEATURE3]

Set up the basic project structure with appropriate directory organization, configuration files, and dependencies.`,
    description: 'Quickly set up a new project with your preferred framework and desired features.',
    example: {
      input: 'Create a starter project for a frontend application using React. Include the following features:\n- Authentication system\n- Dark/light theme toggle\n- API connection utilities',
      output: 'I\'ll create a React starter project with authentication, theme switching, and API utilities...'
    },
    tips: [
      'Be specific about your framework version requirements',
      'Include any specific library preferences you have',
      'Mention any specific design patterns you want to follow'
    ]
  },
  {
    id: 'gitignore-generator',
    categoryId: 'projectsetup',
    title: 'Comprehensive .gitignore Generator',
    tags: ['git', 'configuration'],
    template: `Generate a comprehensive .gitignore file for a [TECHNOLOGY/FRAMEWORK] project. Include common patterns for:
- Development environments
- Build artifacts
- IDE and editor files
- OS-specific files
- Dependency directories
- Any other considerations specific to [TECHNOLOGY/FRAMEWORK]`,
    description: 'Create a thorough .gitignore file tailored to your specific tech stack and development environment.',
    tips: [
      'Specify your operating system for more targeted exclusions',
      'Mention any specific IDE or editor you use',
      'Include any unusual file types your project might generate'
    ]
  },
  {
    id: 'directory-prd',
    categoryId: 'projectsetup',
    title: 'Directory Build - PRD Prompt',
    tags: ['astro', 'seo', 'directory', 'prd'],
    template: `Create a PRD for this build:

A [NUMBER OF RESOURCES] web directory interface using the Astro framework.

The site must use a Hybrid SSG/SSR approach, where directory listing pages, category/tag browse pages, about/contact/info pages, and the initial state of search results use SSG. 

For later versions (after the MVP), I will also want an administration backend linked directly to the database so I can modify or add new records direct from my browser. Any backend functionality like this (including user submissions, admin dashboard and content management, personalized content sections, or real-time search) should be SSR. 

Consider implementing client-side caching strategies and lazy-loading for interactive components.

The directory will be deployed on Netlify but I want to use minimal (if any) Netlify functions in regular usage of the app. 

SEO Considerations: 
Its code should be heavily Search Engine Optimized with a sitemap.xml and robots.txt. 

[INSERT SEO METADATA STRATEGY]

[IF USING A MAP: It will use Google Maps/OpenStreetMap embeds but I want to minimize API calls (so only load map if user clicks load button)]

[DATA ON SUPABASE/SERVICE: The resources data will use Supabase. Attached is a CSV export of the sample data format we will use.]

[DATA AS JSON: My resources data will stay in JSON files. Attached is a sample.]

For later versions, users to the site should also be able to request tweaks, modifications, or submit new listings. They should not need to login but they should provide a name and email [AND X ACCOUNT]

Attached is a screenshot of a front end design I like. Let's try to keep a design like that but be creative in enhancing its aesthetic appeal. It should be designed mobile-first.

Include a database schema in the PRD.`,
    description: 'Generate a comprehensive Product Requirements Document (PRD) for an Astro-based web directory with hybrid SSG/SSR rendering and strong SEO focus.',
    tips: [
      'Include details about the number and types of resources in your directory',
      'Specify your preferred SEO metadata strategy',
      'Attach any design references or data samples for more accurate results',
      'Indicate if you need map integration and which mapping service you prefer'
    ]
  },
  {
    id: 'error-diagnosis',
    categoryId: 'projectsetup',
    title: 'Error Diagnosis and Resolution',
    tags: ['bugs', 'errors', 'troubleshooting'],
    template: `I'm encountering the following error in my [LANGUAGE/FRAMEWORK] application:

\`\`\`
[PASTE ERROR MESSAGE/STACK TRACE HERE]
\`\`\`

Here's the relevant code:

\`\`\`
[PASTE RELEVANT CODE HERE]
\`\`\`

Please help me:
1. Understand what's causing the error
2. Identify potential solutions
3. Implement the most effective fix`,
    description: 'Get AI assistance to diagnose and fix errors in your code with detailed explanations.',
    example: {
      input: 'I\'m encountering the following error in my React application:\n\n`TypeError: Cannot read property \'map\' of undefined`\n\nHere\'s the relevant code...',
      output: 'This error occurs when you\'re trying to call the map() method on a variable that is undefined...'
    },
    tips: [
      'Include the complete error message and stack trace',
      'Show enough context around the problematic code',
      'Mention what you\'ve already tried to fix the issue'
    ]
  },
  {
    id: 'readme-creator',
    categoryId: 'projectsetup',
    title: 'Project README Generator',
    tags: ['documentation', 'README', 'markdown'],
    template: `Create a comprehensive README.md for my [TYPE] project called "[PROJECT_NAME]". The project:

- Solves: [PROBLEM_STATEMENT]
- Uses: [TECHNOLOGIES]
- Requires: [PREREQUISITES]
- Can be installed by: [INSTALLATION_STEPS]

Include sections for installation, usage examples, API documentation (if applicable), contributing guidelines, and license information.`,
    description: 'Generate a professional README file for your project with all essential sections.',
    tips: [
      'Include details about your project\'s unique features',
      'Mention any badges you\'d like to include',
      'Specify the license you\'re using'
    ]
  },
  {
    id: 'cursor-prompt',
    categoryId: 'copilot',
    title: 'Vibe Coding System Rule',
    tags: ['copilot', 'system'],
    template: `You are a multi-agent system coordinator with two roles: **Planner** and **Executor**. Your job is to help complete the user's request by managing both high-level planning and low-level task execution through the \`.cursor/scratchpad.md\` file.

---

##  **Mode Switching Rules**

- When a new user request is received:
  - If the user **explicitly specifies** Planner or Executor mode, proceed accordingly.
  - If the user shows a **terminal error**, assume **Executor** mode unless otherwise stated.
  - If mode is unclear, **ask the user** which mode to proceed in.

---

##  **Planner Role**

**Purpose:** Break down complex requests into a step-by-step, efficient plan.  
**Actions:**
- Write or update the following \`.cursor/scratchpad.md\` sections:
  - \`Background and Motivation\`
  - \`Key Challenges and Analysis\`
  - \`High-level Task Breakdown\` (with granular, testable steps)
- Keep tasks as **small**, **clear**, and **success-criteria-driven** as possible.
- Focus on the **simplest and most efficient** solutions—avoid overengineering.

---

##  **Executor Role**

**Purpose:** Carry out one planned task at a time from \`.cursor/scratchpad.md\`.  
**Actions:**
- Work through one item at a time from the \`Project Status Board\`.
- Update:
  - \`Project Status Board\` (marking tasks in progress or done)
  - \`Executor's Feedback or Assistance Requests\` (blockers, clarifications)
  - \`Lessons\` (to avoid repeating errors)
- Use **TDD** where possible: write tests before code.
- Upon task completion:
  - **Do not mark as fully complete** — notify the user and await confirmation.
  - Include evidence: passing test results, status notes, etc.

---

##  **Scratchpad Conventions**

- **Do not change section names**—they must remain standardized for continuity.
- **Planner-only Sections** (usually initialized early):
  - \`Background and Motivation\`
  - \`Key Challenges and Analysis\`
- **Shared Sections**:
  - \`High-level Task Breakdown\` (Planner creates, Executor follows)
  - \`Project Status Board\` (both update status)
  - \`Executor's Feedback or Assistance Requests\`
  - \`Lessons\`
- Only **append** or **mark outdated** prior content—**do not delete** it.
- Avoid editing \`.cursor/scratchpad.md\` without first **reading the file**.

---

##  **Workflow Summary**

1. Receive request → Ask for mode if not obvious.
2. In **Planner mode**:
   - Create/update sections listed above.
   - Document reasoning and success criteria.
3. In **Executor mode**:
   - Complete one task at a time using cursor tools.
   - Notify user of milestone completion.
   - Request user confirmation before proceeding.
4. **Cycle continues** until Planner concludes the project is complete.

---

##  **Cautionary Guidelines**

- Never use \`git -force\` without explicit user approval.
- Always run \`npm audit\` if vulnerabilities appear.
- Output debug-friendly error messages.
- Communicate **only when confident** in the technical approach. If unsure, say so and ask the user for confirmation or permission to investigate.
- Notify Planner (via \`Executor's Feedback\`) **before large or irreversible changes**.

---

###  User Specified Lessons (Always Apply)

- Include info useful for debugging in the program output.
- Read the file before you try to edit it.
- If vulnerabilities appear in the terminal, run \`npm audit\` before proceeding.
- Always ask before using \`git -force\`.`,
    description: 'Train Cursor/VS Code/Claude Code to use 2 modes: Planner or Executor. Use the planner to create a plan for your project, and the executor to execute the plan.',
    tips: [
      'Tweak it as necessary to fit your project.'
    ]
  },
  {
    id: 'debugger-agent',
    categoryId: 'copilot',
    title: 'Debugger Agent',
    tags: ['debugging', 'error-handling', 'troubleshooting'],
    template: `---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior. Use proactively when encountering any issues.
model: sonnet
---

You are an expert debugger specializing in root cause analysis.

When invoked:
1. Capture error message and stack trace
2. Identify reproduction steps
3. Isolate the failure location
4. Implement minimal fix
5. Verify solution works

Debugging process:
- Analyze error messages and logs
- Check recent code changes
- Form and test hypotheses
- Add strategic debug logging
- Inspect variable states

For each issue, provide:
- Root cause explanation
- Evidence supporting the diagnosis
- Specific code fix
- Testing approach
- Prevention recommendations

Focus on fixing the underlying issue, not just symptoms.`,
    description: 'Expert debugging agent for identifying and fixing errors, test failures, and unexpected behavior in your codebase.',
    tips: [
      'Use proactively when encountering any development issues',
      'Provides systematic debugging approach with root cause analysis',
      'Includes prevention recommendations to avoid similar issues'
    ]
  },
  {
    id: 'ssr-migration',
    categoryId: 'projectsetup',
    title: 'Transform from Client Side to Server Side Rendering',
    tags: ['javascript', 'seo'],
    template: `This is a React website for a [SERVICE], so I assume it renders client-side. But we need to change it to render server side for better SEO. We will be deploying on [NETLIFY,VERCEL,ETC] and using [SUPABASE,UPSTASH,ETC] for data. There are no images for the db yet.

In Planner mode, let's come up with a path forward for rendering all [NUMBER] of our website's pages on the server. The directory needs to have excellent SEO to be found by users. Consider:

1. What framework would be best to migrate to (Next.js, Remix, Gatsby, etc.)
2. How to structure our data fetching for optimal performance
3. What SEO elements we need to add to each page (meta tags, schemas, etc.)
4. How to implement dynamic routing for all directory entries
5. The best deployment strategy for Netlify
6. How to handle data updates from Supabase efficiently

I'm comfortable with "vibe coding" and learning as we go, but need a clear roadmap to follow. Please provide 2 step-by-step plans I can review before making a decision.`,
    description: 'Get a comprehensive plan for migrating a client-side React app to server-side rendering for improved SEO and performance.',
    tips: [
      'Be as detailed as possible with your current setup and requirements',
      'Specify your preferred hosting and database platforms',
      'Mention the number of pages/routes that need server-side rendering'
    ]
  },
  {
    id: 'official-claude-code-agents',
    categoryId: 'claude-code-agents',
    title: 'Official Claude Code Agents Repository',
    tags: ['agents', 'claude-code', 'official'],
    template: `**Official Claude Code Agents Repository**
https://github.com/anthropics/claude-code-agents

The official repository maintained by Anthropic containing verified agent configurations for Claude Code IDE integration.

**Key Features:**
- Official agent templates and configurations
- Well-documented setup instructions
- Regular updates and maintenance
- Community-tested configurations
- Best practices and guidelines

**Available Agent Types:**
- Frontend Development Agents
- Backend Architecture Agents
- Full-stack Development Agents
- DevOps & Deployment Agents
- Testing & QA Agents
- Documentation Agents
- Code Review Agents

**Getting Started:**
1. Browse the repository for agent types
2. Read the documentation for each agent
3. Follow the setup instructions
4. Customize for your specific needs
5. Share feedback with the community

**Best Practices:**
- Start with official agents for stability
- Review configurations before implementation
- Test in development environments first
- Contribute improvements back to the community`,
    description: 'Official Claude Code agent configurations maintained by Anthropic for reliable IDE integration.',
    tips: [
      'Always use the latest version for security and features',
      'Check the changelog for breaking changes',
      'Follow the official documentation for setup'
    ]
  },
  {
    id: 'awesome-claude-code-agents',
    categoryId: 'claude-code-agents',
    title: 'Awesome Claude Code Agents',
    tags: ['agents', 'awesome-list', 'community'],
    template: `**Awesome Claude Code Agents Collection**
https://github.com/hesreallyhim/awesome-claude-code-agents

A comprehensive, community-curated list of Claude Code agent configurations and resources.

**What You'll Find:**
- Curated agent configurations
- Setup guides and tutorials
- Performance benchmarks
- Community reviews and ratings
- Contributing guidelines

**Agent Categories:**
- **Development Agents** - Code generation and refactoring
- **DevOps Agents** - Deployment and infrastructure management
- **Testing Agents** - Automated testing and quality assurance
- **Documentation Agents** - Code documentation and README generation
- **Security Agents** - Code security analysis and vulnerability scanning
- **Performance Agents** - Code optimization and performance analysis

**Community Features:**
- Agent ratings and reviews
- Installation difficulty ratings
- Compatibility matrices
- Troubleshooting guides
- Regular updates and maintenance

**How to Contribute:**
1. Submit your agent configurations
2. Review and test existing agents
3. Improve documentation
4. Report issues and bugs
5. Suggest new agent categories`,
    description: 'Community-curated collection of Claude Code agents with reviews and ratings.',
    tips: [
      'Check community ratings before trying new agents',
      'Read compatibility notes for your IDE version',
      'Contribute your successful configurations'
    ]
  },
  {
    id: 'wshobson-agents',
    categoryId: 'claude-code-agents',
    title: 'Agent Collection by wshobson',
    tags: ['agents', 'collection', 'productivity'],
    template: `**Agent Collection by wshobson**
https://github.com/wshobson/agents

A personal collection of Claude Code agents focused on productivity and development workflow optimization.

**Featured Agents:**
- **Code Reviewer Agent** - Automated code review and suggestions
- **Documentation Generator** - Intelligent documentation creation
- **Test Writer Agent** - Automated test case generation
- **Refactoring Assistant** - Code improvement and optimization
- **API Documentation Agent** - REST API documentation generator

**Unique Features:**
- Real-world tested configurations
- Productivity-focused workflows
- Detailed setup documentation
- Performance optimization tips
- Integration with popular tools

**Use Cases:**
- Solo developer workflows
- Small team collaboration
- Code quality improvement
- Documentation automation
- Testing workflow enhancement

**Getting Started:**
1. Clone the repository
2. Choose agents that fit your workflow
3. Follow the individual setup guides
4. Customize for your project structure
5. Monitor performance and adjust

**Optimization Tips:**
- Start with one agent at a time
- Monitor resource usage
- Adjust configuration based on project size
- Regular updates for best performance`,
    description: 'Productivity-focused Claude Code agents tested in real-world development scenarios.',
    tips: [
      'Start with the code reviewer agent for immediate value',
      'Monitor system resources when running multiple agents',
      'Customize configurations based on your project structure'
    ]
  },
  {
    id: 'iannuttall-claude-agents',
    categoryId: 'claude-code-agents',
    title: 'Claude Agents by iannuttall',
    tags: ['agents', 'specialized', 'development'],
    template: `**Claude Agents by iannuttall**
https://github.com/iannuttall/claude-agents

Specialized Claude Code agents designed for specific development tasks and workflows.

**Specialized Agents:**
- **Database Schema Agent** - Database design and migration assistance
- **API Design Agent** - RESTful API planning and documentation
- **Security Audit Agent** - Code security analysis and recommendations
- **Performance Profiler Agent** - Code performance analysis and optimization
- **Deployment Assistant** - Automated deployment workflow support

**Key Strengths:**
- Task-specific optimizations
- Deep domain expertise
- Comprehensive configuration options
- Detailed usage examples
- Active maintenance and updates

**Technical Focus:**
- Backend development workflows
- Database management
- API development
- Security best practices
- Performance optimization

**Implementation Guide:**
1. Identify your specific use case
2. Review the agent documentation
3. Set up the development environment
4. Configure agent parameters
5. Test with sample projects
6. Deploy to production workflows

**Advanced Features:**
- Custom prompt templates
- Integration with external tools
- Automated workflow triggers
- Performance monitoring
- Error handling and recovery`,
    description: 'Specialized Claude Code agents for specific development tasks and technical workflows.',
    tips: [
      'Choose agents that match your technical stack',
      'Review the requirements before implementation',
      'Test with non-production data first'
    ]
  },
  {
    id: 'awesome-claude-subagents',
    categoryId: 'claude-code-agents',
    title: 'Awesome Claude Code Subagents',
    tags: ['subagents', 'modular', 'architecture'],
    template: `**Awesome Claude Code Subagents**
https://github.com/VoltAgent/awesome-claude-code-subagents

Modular subagent architectures for building complex Claude Code workflows.

**Subagent Architecture:**
- **Modular Design** - Composable agent components
- **Workflow Orchestration** - Multi-agent coordination
- **Task Specialization** - Focused, single-purpose agents
- **Inter-Agent Communication** - Seamless data flow
- **Scalable Architecture** - Easy to extend and modify

**Available Subagents:**
- **Code Analysis Subagent** - Syntax and structure analysis
- **Documentation Subagent** - Inline and external documentation
- **Testing Subagent** - Unit and integration test generation
- **Deployment Subagent** - CI/CD pipeline integration
- **Monitoring Subagent** - Performance and error tracking

**Architecture Benefits:**
- Reduced complexity per agent
- Better maintainability
- Easier debugging and testing
- Flexible workflow composition
- Resource optimization

**Implementation Patterns:**
- Pipeline architectures
- Event-driven workflows
- Microservice-style agents
- State management patterns
- Error propagation handling

**Getting Started:**
1. Understand the subagent architecture
2. Choose your workflow pattern
3. Select relevant subagents
4. Configure inter-agent communication
5. Test the complete workflow
6. Monitor and optimize performance`,
    description: 'Modular subagent architectures for building scalable Claude Code workflows.',
    tips: [
      'Start with simple pipelines before complex orchestrations',
      'Plan your data flow between subagents carefully',
      'Monitor resource usage across all subagents'
    ]
  },
  {
    id: 'contains-studio-agents',
    categoryId: 'claude-code-agents',
    title: 'Contains Studio Agent Collection',
    tags: ['agents', 'studio', 'professional'],
    template: `**Contains Studio Agent Collection**
https://github.com/contains-studio/agents

Professional-grade Claude Code agents designed for studio and team environments.

**Studio-Grade Features:**
- **Team Collaboration** - Multi-developer workflow support
- **Project Standards** - Consistent code style enforcement
- **Quality Gates** - Automated quality checks and approvals
- **Workflow Integration** - Seamless tool chain integration
- **Performance Monitoring** - Real-time agent performance tracking

**Professional Agents:**
- **Code Standards Agent** - Style guide enforcement
- **Review Coordinator** - Peer review workflow management
- **Release Manager** - Version control and deployment coordination
- **Quality Assurance Agent** - Comprehensive testing workflows
- **Documentation Manager** - Project documentation maintenance

**Team Workflows:**
- Onboarding new developers
- Code review processes
- Release management
- Quality assurance pipelines
- Documentation maintenance

**Enterprise Features:**
- Role-based access control
- Audit logging and compliance
- Integration with enterprise tools
- Scalable multi-project support
- Advanced reporting and analytics

**Deployment Options:**
- Cloud-based deployments
- On-premise installations
- Hybrid configurations
- Container orchestration
- Microservice architectures

**Support & Maintenance:**
- Professional support options
- Regular security updates
- Performance optimization
- Custom agent development
- Training and consultation`,
    description: 'Professional-grade Claude Code agents designed for studio and enterprise team environments.',
    tips: [
      'Consider enterprise support for production deployments',
      'Plan for team training and onboarding',
      'Evaluate security and compliance requirements'
    ]
  },
  {
    id: 'claude-ai-reddit-community',
    categoryId: 'claude-code-agents',
    title: 'r/ClaudeAI Agent Configurations',
    tags: ['community', 'reddit', 'discussions'],
    template: `**r/ClaudeAI Agent Configurations Community**
https://reddit.com/r/ClaudeAI

Active Reddit community sharing Claude Code agent configurations and experiences.

**Community Resources:**
- **Weekly Agent Showcase** - Community members share successful configurations
- **Troubleshooting Threads** - Get help with agent setup and issues
- **Configuration Exchange** - Trade and improve agent setups
- **Best Practices Discussions** - Learn from experienced users
- **Tool Integration Guides** - Connect agents with popular development tools

**Popular Discussion Topics:**
- Agent performance optimization
- Custom prompt engineering
- Workflow automation examples
- Integration with IDEs and editors
- Team collaboration strategies
- Security and privacy considerations

**Community Guidelines:**
- Share working configurations with documentation
- Help troubleshoot issues for other users
- Provide constructive feedback on agent setups
- Follow Reddit and subreddit rules
- Respect intellectual property and licensing

**How to Participate:**
1. Join the r/ClaudeAI subreddit
2. Read the community rules and guidelines
3. Search existing posts before asking questions
4. Share your successful agent configurations
5. Help other community members with issues
6. Participate in weekly discussions and showcases

**Community Benefits:**
- Real-world tested configurations
- Rapid troubleshooting support
- Diverse use case examples
- Regular updates and improvements
- Networking with other developers`,
    description: 'Active Reddit community for sharing Claude Code agent configurations and troubleshooting.',
    tips: [
      'Search existing posts before asking questions',
      'Include detailed setup information when sharing',
      'Follow community guidelines and be helpful'
    ]
  },
  {
    id: 'github-claude-agent-search',
    categoryId: 'claude-code-agents',
    title: 'GitHub Claude Agent Examples',
    tags: ['github', 'search', 'examples'],
    template: `**GitHub Claude Agent Examples Search**
https://github.com/search?q=claude-code-agent

Discover Claude Code agents across GitHub repositories with this targeted search query.

**Search Strategy:**
- **Repository Search** - Find dedicated agent repositories
- **Code Search** - Locate agent configurations in project files
- **Issue Search** - Find discussions and troubleshooting threads
- **Wiki Search** - Discover documentation and guides
- **Topic Search** - Browse repositories tagged with relevant topics

**Useful Search Refinements:**
\`\`\`
claude-code-agent language:json
claude-code-agent in:readme
claude-code-agent topic:ai-agents
claude-code-agent created:>2024-01-01
claude-code-agent stars:>10
\`\`\`

**What to Look For:**
- **Active Repositories** - Recent commits and maintenance
- **Good Documentation** - Clear setup and usage instructions
- **Community Engagement** - Issues, discussions, and contributions
- **Star Rating** - Community validation and popularity
- **License Compatibility** - Ensure legal usage in your projects

**Evaluation Criteria:**
- Code quality and organization
- Documentation completeness
- Community activity and support
- Update frequency and maintenance
- Compatibility with your tools

**Contributing Back:**
- Fork and improve existing agents
- Submit bug reports and feature requests
- Add documentation and examples
- Share your own agent creations
- Participate in discussions and reviews`,
    description: 'Search GitHub for Claude Code agent examples and configurations across repositories.',
    tips: [
      'Use specific search filters to find relevant agents',
      'Check repository activity before using agents',
      'Contribute improvements back to the community'
    ]
  },
  {
    id: 'discord-claude-community',
    categoryId: 'claude-code-agents',
    title: 'Discord Community Configs',
    tags: ['discord', 'community', 'real-time'],
    template: `**Claude Development Discord Community**
https://discord.gg/claude-dev

Real-time community support for Claude Code agents and configurations.

**Discord Channels:**
- **#agent-showcase** - Share your successful agent configurations
- **#troubleshooting** - Get real-time help with agent issues
- **#configuration-exchange** - Trade and improve agent setups
- **#announcements** - Latest updates and new agent releases
- **#general-discussion** - General Claude Code agent topics
- **#workflow-optimization** - Discuss productivity improvements

**Community Features:**
- **Voice Channels** - Screen sharing for complex troubleshooting
- **File Sharing** - Exchange configuration files securely
- **Bot Integration** - Automated alerts for new resources
- **Role System** - Connect with experts in specific areas
- **Event Notifications** - Community meetups and workshops

**Real-Time Benefits:**
- Immediate responses to urgent issues
- Screen sharing for complex problems
- Voice chat for detailed explanations
- File sharing for configurations
- Live coding sessions and demos

**Community Guidelines:**
- Be respectful and constructive
- Use appropriate channels for discussions
- Share working configurations when possible
- Help others when you can
- Follow Discord terms of service

**Getting the Most Value:**
1. Introduce yourself in #general-discussion
2. Set up relevant role notifications
3. Share your experience level and interests
4. Participate in community events
5. Contribute to discussions regularly
6. Help newcomers get started

**Expert Office Hours:**
- Weekly Q&A sessions with experienced users
- Specialized workshops on advanced topics
- Guest speakers from the development community
- Live troubleshooting sessions
- New feature demonstrations`,
    description: 'Real-time Discord community for Claude Code agent support and configuration sharing.',
    tips: [
      'Join relevant channels based on your interests',
      'Set up notifications for important channels',
      'Participate actively to build community connections'
    ]
  },
  {
    id: 'official-mcp-servers',
    categoryId: 'mcp',
    title: 'Official MCP Servers Repository',
    tags: ['mcp', 'servers', 'official'],
    template: `**Official Model Context Protocol Servers**
https://github.com/modelcontextprotocol/servers

The official repository maintained by the MCP team containing production-ready server implementations for common use cases.

**Available Servers:**
- **Filesystem Server** - Local file system access and management
- **Git Server** - Git repository operations and version control
- **GitHub Server** - GitHub API integration and repository management
- **Google Drive Server** - Google Drive file access and management
- **PostgreSQL Server** - PostgreSQL database operations
- **Slack Server** - Slack workspace integration
- **Memory Server** - In-memory key-value storage

**Key Features:**
- Well-documented and maintained
- Regular security updates
- Comprehensive test coverage
- TypeScript/JavaScript implementations
- Active community support

**Installation:**
\`\`\`bash
npm install @modelcontextprotocol/server-[name]
\`\`\`

**Configuration Example:**
\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    }
  }
}
\`\`\``,
    description: 'Official MCP server implementations maintained by the Model Context Protocol team.',
    tips: [
      'Start with official servers for the most stable experience',
      'Check the changelog for breaking changes before updating',
      'Review security considerations for each server type'
    ]
  },
  {
    id: 'awesome-mcp-servers-list',
    categoryId: 'mcp',
    title: 'Awesome MCP Servers',
    tags: ['mcp', 'servers', 'community', 'awesome-list'],
    template: `**Awesome MCP Servers - Community Collection**
https://github.com/awesome-mcp/awesome-mcp-servers

A curated list of community-created MCP servers extending AI capabilities across various domains.

**Featured Categories:**

**🗄️ Database Servers:**
- MySQL, MongoDB, Redis integrations
- Vector databases for AI applications
- Time-series databases

**🔧 Development Tools:**
- Docker container management
- Kubernetes orchestration
- CI/CD pipeline integration
- Code analysis tools

**☁️ Cloud Services:**
- AWS service integrations
- Google Cloud Platform tools
- Azure service connectors
- Cloudflare Workers

**📊 Analytics & Monitoring:**
- Prometheus metrics
- Grafana dashboards
- Log aggregation services
- APM tools

**🤝 Communication:**
- Discord bots
- Email services
- SMS gateways
- Webhook handlers

**Contributing:**
- Submit PRs with new servers
- Report issues and bugs
- Improve documentation
- Add examples and tutorials`,
    description: 'Comprehensive community-curated collection of MCP servers for every use case.',
    tips: [
      'Check the stars and last update date for server quality',
      'Read community reviews before implementing',
      'Consider contributing your own servers'
    ]
  },
  {
    id: 'mcp-server-registry',
    categoryId: 'mcp',
    title: 'MCP Server Registry',
    tags: ['mcp', 'registry', 'directory'],
    template: `**MCP Server Registry**
https://mcpregistry.com

The central registry for discovering, sharing, and managing Model Context Protocol servers.

**Registry Features:**
- **Search & Discovery** - Find servers by category, functionality, or keyword
- **Version Management** - Track server versions and compatibility
- **User Reviews** - Community ratings and feedback
- **Documentation Hub** - Centralized documentation for all registered servers
- **Security Audits** - Security status and vulnerability reports

**Server Categories:**
- Core Infrastructure
- Data Processing
- External APIs
- Automation Tools
- AI/ML Services
- DevOps & Deployment
- Monitoring & Analytics
- Communication Platforms

**For Server Authors:**
1. Register your server
2. Provide comprehensive documentation
3. Include usage examples
4. Specify version compatibility
5. Enable automated testing

**For Users:**
1. Browse by category or search
2. Check compatibility with your MCP version
3. Read reviews and ratings
4. Follow installation guides
5. Report issues to authors`,
    description: 'Central registry for discovering and managing MCP servers with community reviews.',
    tips: [
      'Use filters to find servers compatible with your MCP version',
      'Check the "verified" badge for quality assurance',
      'Subscribe to updates for servers you use'
    ]
  },
  {
    id: 'mcp-reddit-community',
    categoryId: 'mcp',
    title: 'MCP Reddit Community',
    tags: ['mcp', 'community', 'reddit', 'discussion'],
    template: `**Model Context Protocol Reddit Community**
https://reddit.com/r/ModelContextProtocol

Join the discussion about MCP servers, share experiences, and get help from the community.

**Community Resources:**

**📌 Pinned Posts:**
- Getting Started Guide
- FAQ and Common Issues
- Server Showcase Thread
- Weekly Discussion Topics

**🔥 Popular Topics:**
- Server recommendations
- Troubleshooting help
- Configuration examples
- Performance optimization
- Security best practices
- Integration tutorials

**💡 Community Contributions:**
- Custom server showcases
- Tutorial videos and guides
- Configuration templates
- Debugging tips
- Performance benchmarks

**🤝 Get Involved:**
- Share your server creations
- Help answer questions
- Post tutorials and guides
- Report bugs and issues
- Suggest improvements

**📅 Regular Events:**
- Weekly server spotlight
- Monthly challenges
- AMA with server developers
- Community hackathons`,
    description: 'Active Reddit community for MCP discussions, troubleshooting, and server showcases.',
    tips: [
      'Check the wiki for comprehensive guides',
      'Use proper flair when posting',
      'Search before asking common questions'
    ]
  },
  {
    id: 'n8n-mcp-integration',
    categoryId: 'mcp',
    title: 'n8n MCP Integration',
    tags: ['n8n', 'mcp', 'automation'],
    template: `**n8n Model Context Protocol Integration**
https://github.com/czlonkowski/n8n-mcp

This project enables n8n workflow automation platform to work with Model Context Protocol, allowing AI models to interact directly with n8n workflows and automations.

**Key Features:**
- Direct integration between MCP and n8n workflows
- Automated workflow execution from AI models
- Seamless data flow between AI and automation systems
- Enterprise-grade workflow management

**Use Cases:**
- AI-triggered business process automation
- Dynamic workflow creation based on AI analysis
- Automated data processing and transformation
- Integration with existing n8n automation infrastructure

**Getting Started:**
1. Install the n8n MCP server package
2. Configure your n8n instance connection
3. Set up authentication and permissions
4. Test with simple workflow triggers
5. Scale to complex automation scenarios

Perfect for teams already using n8n who want to add AI-powered automation capabilities.`,
    description: 'Integrate n8n workflow automation with Model Context Protocol for AI-powered business process automation.',
    tips: [
      'Ensure your n8n instance is accessible to the MCP server',
      'Start with simple workflows before implementing complex automations',
      'Monitor workflow execution for debugging and optimization'
    ]
  },
  {
    id: 'jina-ai-mcp',
    categoryId: 'mcp',
    title: 'Jina AI MCP Tools',
    tags: ['jina', 'ai', 'mcp', 'multimodal'],
    template: `**Jina AI Model Context Protocol Tools**
https://github.com/jina-ai/MCP

Jina AI's comprehensive MCP implementation providing advanced multimodal AI capabilities and neural search functionality through Model Context Protocol.

**Key Features:**
- Multimodal AI processing (text, images, audio, video)
- Neural search and similarity matching
- Advanced embedding generation
- Cross-modal understanding capabilities
- Enterprise-scale AI operations

**Capabilities:**
- Document and image analysis
- Semantic search across multiple data types
- Content generation and transformation
- Advanced AI reasoning and understanding
- Real-time multimodal processing

**Integration Benefits:**
- Enhanced AI model capabilities
- Multimodal data processing
- Advanced search and retrieval
- Content understanding and generation
- Scalable AI infrastructure

**Setup Process:**
1. Install Jina AI MCP package
2. Configure authentication with Jina AI services
3. Set up multimodal processing pipelines
4. Test with sample data across modalities
5. Deploy to production environment

Ideal for projects requiring advanced AI capabilities and multimodal data processing.`,
    description: 'Access Jina AI\'s multimodal AI capabilities through Model Context Protocol for advanced content processing.',
    tips: [
      'Review Jina AI documentation for API limits and pricing',
      'Test multimodal capabilities with your specific data types',
      'Consider data privacy requirements for cloud-based processing'
    ]
  },
  {
    id: 'awesome-mcp-servers',
    categoryId: 'mcp',
    title: 'Awesome MCP Servers Collection',
    tags: ['mcp', 'servers', 'awesome-list'],
    template: `**Awesome MCP Servers - Curated Collection**
https://github.com/punkpeye/awesome-mcp-servers

A comprehensive, community-curated list of Model Context Protocol servers, tools, and resources for extending AI capabilities.

**What You'll Find:**
- Production-ready MCP servers
- Development tools and utilities
- Integration examples and templates
- Documentation and guides
- Community contributions and reviews

**Server Categories:**
- **Database Servers** - MySQL, PostgreSQL, MongoDB integrations
- **API Wrappers** - REST, GraphQL, and third-party service connectors
- **File System Servers** - Local and cloud storage access
- **Development Tools** - Git, Docker, CI/CD integrations
- **Cloud Services** - AWS, GCP, Azure connectors
- **Automation Servers** - Workflow and task automation
- **Communication** - Slack, Discord, email integrations
- **Analytics** - Data processing and reporting tools

**Community Features:**
- Server ratings and reviews
- Installation and setup guides
- Troubleshooting and support
- Contribution guidelines
- Regular updates and maintenance

**How to Contribute:**
1. Submit your own MCP servers
2. Review and test existing servers
3. Improve documentation
4. Report issues and suggest improvements

This is the go-to resource for discovering and sharing MCP servers across the community.`,
    description: 'Browse the most comprehensive collection of Model Context Protocol servers curated by the community.',
    tips: [
      'Check server compatibility with your MCP client version',
      'Read user reviews and ratings before implementing servers',
      'Contribute your own servers to help grow the community'
    ]
  },
  {
    id: 'playbooks-mcp-directory',
    categoryId: 'mcp',
    title: 'Playbooks MCP Directory',
    tags: ['directory', 'servers', 'search'],
    template: `**Playbooks MCP Server Directory**
https://playbooks.com/mcp

The most comprehensive MCP server directory with over 6,000 servers to give AI agents superpowers. Search, filter, and discover MCP servers for Cursor, Claude, Windsurf, and more.

**Key Features:**
- **6,000+ Servers** - Largest collection of MCP servers available
- **Advanced Search** - Find servers by functionality, language, or popularity
- **Smart Filtering** - Filter by programming language, stars, downloads, and more
- **Detailed Information** - Server descriptions, usage stats, and documentation
- **Regular Updates** - Constantly updated with new servers and improvements

**Popular Categories:**
- **Browser Automation** - Puppeteer, Playwright, Browser-Use
- **Database Integration** - PostgreSQL, SQLite, Redis, MongoDB
- **Cloud Services** - AWS, Google Drive, GitHub, GitLab
- **Development Tools** - Git, Filesystem, Code Analysis
- **AI & ML Services** - Image generation, OCR, Knowledge graphs
- **Communication** - Slack, Discord, Email integration
- **Web & API** - Fetch, Brave Search, REST APIs

**Search & Discovery:**
- Sort by stars, downloads, newest, or alphabetical
- Filter by programming language (TypeScript, Python, Go, etc.)
- View server statistics and popularity metrics
- Access setup instructions and documentation
- Find compatible servers for your use case

**Featured Servers:**
- **Browser-Use** (68.8K stars) - AI browser automation
- **Time Server** (66.1K stars) - Timezone conversions
- **Fetch Server** (6.21M downloads) - Web content retrieval
- **Filesystem** (1.55M downloads) - File operations
- **GitHub Integration** (697.8K downloads) - Repository management

**Getting Started:**
1. Browse the directory by category or search
2. Review server descriptions and requirements
3. Check compatibility with your AI tool
4. Follow installation instructions
5. Configure and test in your environment

**Community Features:**
- Server ratings and usage statistics
- Documentation and setup guides
- Regular feature updates
- Integration tutorials
- Community contributions`,
    description: 'Comprehensive directory of 6,000+ MCP servers with advanced search and filtering capabilities.',
    tips: [
      'Use the search filters to find servers for your specific use case',
      'Check download counts and stars for server popularity',
      'Review server requirements before installation'
    ]
  },
  {
    id: 'zen-mcp-server',
    categoryId: 'mcp',
    title: 'Zen MCP Server',
    tags: ['mcp', 'ai-orchestration', 'multi-model', 'collaboration'],
    template: `**Zen MCP: Many Workflows. One Context.**
https://github.com/BeehiveInnovations/zen-mcp-server

AI orchestration for Claude Code - A Model Context Protocol server that gives your CLI access to multiple AI models for enhanced code analysis, problem-solving, and collaborative development.

**Key Features:**
- **Multi-Model Orchestration** - Claude coordinates with Gemini Pro, O3, GPT-5, and 50+ other models
- **Context Revival Magic** - Continue conversations seamlessly even after Claude's context resets
- **Guided Workflows** - Systematic investigation phases prevent rushed analysis
- **Extended Context Windows** - Break Claude's limits by delegating to models with larger contexts
- **True Conversation Continuity** - Full context flows across tools and models

**Core Tools:**
- **chat** - Brainstorm ideas, get second opinions, validate approaches
- **thinkdeep** - Extended reasoning, edge case analysis, alternative perspectives
- **planner** - Break down complex projects into structured, actionable plans
- **consensus** - Get expert opinions from multiple AI models
- **debug** - Systematic investigation and root cause analysis
- **codereview** - Professional reviews with severity levels
- **precommit** - Validate changes before committing

**Supported Models:**
- Gemini 2.5 Pro, Flash - Google's latest models
- O3, GPT-5 series - OpenAI's reasoning models
- Grok models - X.AI's conversational AI
- Local models via Ollama - Complete privacy
- 50+ models via OpenRouter - One API for all

**Quick Start:**
\`\`\`bash
git clone https://github.com/BeehiveInnovations/zen-mcp-server.git
cd zen-mcp-server
./run-server.sh
\`\`\`

**Example Workflows:**
- "Perform a codereview using gemini pro and o3, then create a fix plan"
- "Debug this race condition with max thinking mode, then validate with precommit"
- "Plan our microservices migration, get consensus from pro and o3"

Perfect for developers who want Claude to orchestrate multiple AI models for comprehensive code analysis and collaborative problem-solving.`,
    description: 'AI orchestration MCP server enabling Claude Code to coordinate with multiple AI models for enhanced development workflows.',
    tips: [
      'Start with core collaboration tools (chat, thinkdeep, planner)',
      'Use consensus tool to get multiple AI perspectives on complex decisions',
      'Enable additional tools based on your specific development needs'
    ]
  }
];

// Template Data
export const templates = [
  {
    id: 'n8n-rss-aggregator',
    categoryId: 'n8n-automation',
    type: 'template',
    title: 'RSS Posts Aggregator & AI Summarizer',
    description: 'Automatically aggregates RSS feeds, processes content with AI, and sends summaries to Telegram. Perfect for staying updated with multiple content sources.',
    platform: 'n8n',
    tags: ['rss', 'ai', 'telegram', 'content-aggregation', 'automation', 'jordanurbs-tutorial'],
    difficulty: 'intermediate',
    useCases: [
      'Content curation for newsletters',
      'Automated industry monitoring',
      'Research feed aggregation',
      'Social media content sourcing'
    ],
    requiredServices: [
      'OpenAI API key',
      'Telegram Bot Token',
      'RSS feed URLs',
      'n8n instance'
    ],
    setupInstructions: `1. Set up OpenAI API credentials in n8n
2. Create a Telegram bot and get the bot token
3. Configure your RSS feed URLs in the "Set RSS Feeds List" nodes
4. Update Telegram chat ID and credentials
5. Configure the schedule triggers for your desired frequency
6. Test the workflow with a single RSS feed first`,
    templateData: {
      "name": "RSS Posts Aggregator & AI Summarizer Template",
      "nodes": [
        {
          "parameters": {
            "fieldToSplitOut": "rss",
            "options": {}
          },
          "id": "4dc2c3b9-5df8-41ae-a33f-bc2e72ad0684",
          "name": "Split Out1",
          "type": "n8n-nodes-base.splitOut",
          "position": [
            2820,
            340
          ],
          "typeVersion": 1
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "80b9f942-5c80-477d-9321-5f79902ed1cf",
          "name": "Embeddings OpenAI1",
          "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
          "position": [
            3400,
            560
          ],
          "typeVersion": 1.2,
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIALS_ID",
              "name": "OpenAI Account"
            }
          }
        },
        {
          "parameters": {
            "jsonMode": "expressionData",
            "jsonData": "=# {{ $json.title }}\n{{ $json.content }}",
            "options": {
              "metadata": {
                "metadataValues": [
                  {
                    "name": "title",
                    "value": "={{ $json.title }}"
                  },
                  {
                    "name": "createDate",
                    "value": "={{ $now.toISO() }}"
                  },
                  {
                    "name": "publishDate",
                    "value": "={{ $json.date }}"
                  },
                  {
                    "name": "link",
                    "value": "={{ $json.link }}"
                  }
                ]
              }
            }
          },
          "id": "157257e6-149c-439f-b8bf-f94b05bcbc26",
          "name": "Default Data Loader1",
          "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
          "position": [
            3540,
            500
          ],
          "typeVersion": 1
        },
        {
          "parameters": {
            "chunkSize": 3000,
            "options": {}
          },
          "id": "26172a50-ee62-4ee9-bf02-ebd6d216d171",
          "name": "Recursive Character Text Splitter1",
          "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
          "position": [
            3600,
            640
          ],
          "typeVersion": 1
        },
        {
          "parameters": {
            "rule": {
              "interval": [
                {
                  "daysInterval": 2
                }
              ]
            }
          },
          "id": "e9d21298-8e18-4f3f-a6f8-e0ac3706a29b",
          "name": "Schedule Daily Articles",
          "type": "n8n-nodes-base.scheduleTrigger",
          "position": [
            2380,
            340
          ],
          "typeVersion": 1.2
        },
        {
          "parameters": {
            "content": "## 1. POSTS CATEGORY A",
            "height": 680,
            "width": 2740,
            "color": 4
          },
          "id": "fd3fa376-c92a-4e5b-88b7-687a037a4803",
          "name": "Sticky Note",
          "type": "n8n-nodes-base.stickyNote",
          "position": [
            2300,
            180
          ],
          "typeVersion": 1
        },
        {
          "parameters": {
            "assignments": {
              "assignments": [
                {
                  "id": "b8c00469-890b-4b5b-8e2e-2ad9ec2d0815",
                  "name": "rss",
                  "type": "array",
                  "value": "=[\"<YOUR_RSS_FEED_URL_1>\",\"<YOUR_RSS_FEED_URL_2>\",\"<YOUR_RSS_FEED_URL_3>\",\"<YOUR_RSS_FEED_URL_4>\",\"<YOUR_RSS_FEED_URL_5>\"]"
                }
              ]
            },
            "options": {}
          },
          "id": "d7e19217-cb49-4348-a296-6be76afa9e1a",
          "name": "Set RSS Feeds List 1",
          "type": "n8n-nodes-base.set",
          "position": [
            2600,
            340
          ],
          "typeVersion": 3.4
        },
        {
          "parameters": {
            "url": "={{ $json.rss }}",
            "options": {
              "ignoreSSL": false
            }
          },
          "id": "d5ede8cb-58db-4d6c-a0af-4ca79de5e7ec",
          "name": "Read RSS Feeds1",
          "type": "n8n-nodes-base.rssFeedRead",
          "position": [
            3040,
            340
          ],
          "typeVersion": 1.1
        },
        {
          "parameters": {
            "assignments": {
              "assignments": [
                {
                  "id": "e9f27ceb-c5f2-4997-8cb1-67576a7bb337",
                  "name": "title",
                  "type": "string",
                  "value": "={{ $json.title }}"
                },
                {
                  "id": "4c4f9417-40f2-4fb0-9976-d09f5984680f",
                  "name": "content",
                  "type": "string",
                  "value": "={{ $json['content:encodedSnippet'] ?? $json.contentSnippet}}"
                },
                {
                  "id": "e1986bac-054e-4240-ba50-536dbcd27337",
                  "name": "date",
                  "type": "string",
                  "value": "={{ $json.isoDate}}"
                },
                {
                  "id": "9566e23c-ac30-4d66-abbd-889f322688b7",
                  "name": "link",
                  "type": "string",
                  "value": "={{ $json.link }}"
                }
              ]
            },
            "options": {}
          },
          "id": "9ae034b6-b90a-4ba5-93d9-848c1bfb6556",
          "name": "Normalize Article Fields1",
          "type": "n8n-nodes-base.set",
          "position": [
            3260,
            340
          ],
          "typeVersion": 3.4
        },
        {
          "parameters": {
            "mode": "insert",
            "memoryKey": "posts_store_key",
            "clearStore": true
          },
          "id": "c0ea6dd4-082f-4631-8348-e63d22903c03",
          "name": "Store Articles in Memory1",
          "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory",
          "position": [
            3480,
            340
          ],
          "typeVersion": 1.1
        },
        {
          "parameters": {
            "model": {
              "__rl": true,
              "mode": "list",
              "value": "gpt-4o",
              "cachedResultName": "gpt-4o"
            },
            "options": {
              "maxTokens": 16000,
              "maxRetries": 2
            }
          },
          "id": "92715c33-f8b1-40b8-9ac6-50424bdca727",
          "name": "OpenAI Chat Model1",
          "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
          "position": [
            4020,
            640
          ],
          "typeVersion": 1.2,
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIALS_ID",
              "name": "OpenAI Account"
            }
          }
        },
        {
          "parameters": {
            "mode": "retrieve-as-tool",
            "toolName": "get_posts",
            "toolDescription": "Call this tool to get the latest posts.",
            "memoryKey": "posts_store_key",
            "topK": 20
          },
          "id": "339d993e-0842-4f1e-a3b3-c2291a330c4b",
          "name": "Get Posts Tool1",
          "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory",
          "position": [
            4200,
            620
          ],
          "typeVersion": 1.1
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "c2bc9101-4550-4e11-b1cc-97ce94b64bb0",
          "name": "Embeddings OpenAI2",
          "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
          "position": [
            4300,
            740
          ],
          "typeVersion": 1.2,
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIALS_ID",
              "name": "OpenAI Account"
            }
          }
        },
        {
          "parameters": {
            "chatId": "<YOUR_TELEGRAM_CHAT_ID>",
            "text": "={{ $json.message }}",
            "additionalFields": {
              "appendAttribution": false,
              "parse_mode": "HTML"
            }
          },
          "type": "n8n-nodes-base.telegram",
          "typeVersion": 1.2,
          "position": [
            4760,
            260
          ],
          "id": "f4fcc7ad-0d13-4e86-a280-76b3135f1757",
          "name": "Send to Telegram1",
          "webhookId": "YOUR_WEBHOOK_ID",
          "credentials": {
            "telegramApi": {
              "id": "YOUR_TELEGRAM_CREDENTIALS_ID",
              "name": "Telegram Bot"
            }
          }
        },
        {
          "parameters": {
            "promptType": "define",
            "text": "=Summarize the most relevant posts published in the past 7 days, with references. Today is {{ $now }}.",
            "options": {
              "systemMessage": "=You are an AI Content Analyst specializing in analyzing and summarizing posts from RSS feeds. Your role is to extract the most relevant and valuable information for your audience.\n\n**Your Mission:**\nAnalyze the latest posts from the provided feeds and create concise, actionable summaries focusing on:\n\n1. **Key Insights** - Main takeaways and important developments\n2. **Industry Trends** - Emerging patterns and market movements\n3. **Actionable Information** - Practical advice and strategies\n4. **Important Updates** - Significant posts and announcements\n5. **Analysis & Commentary** - Expert opinions and thoughtful analysis\n6. **Future Implications** - What these developments mean going forward\n\n**CRITICAL FILTERING RULES:**\n- IGNORE all product promotions, course sales, and service advertisements\n- SKIP mentions of specific paid programs, workshops, or services being sold\n- EXCLUDE references to sales language or promotional content\n- FOCUS ONLY on the core insights, strategies, and valuable information\n- Extract general principles rather than promotional content\n\n**Output Format:**\n- Lead with the most important insight or development of the week\n- Organize findings into clear, scannable sections\n- Include specific examples and actionable takeaways\n- Highlight time-sensitive information or opportunities\n- Provide context on why each insight matters\n- Keep summaries concise but comprehensive (aim for 2-3 sentences per key point)\n\n**Tone:** Professional, informative, and actionable. Write for readers who want to stay informed about important developments in their field of interest."
            }
          },
          "id": "f2e8d5e3-637d-46e0-902c-57d843251dbc",
          "name": "AI Summary Agent1",
          "type": "@n8n/n8n-nodes-langchain.agent",
          "position": [
            4020,
            440
          ],
          "typeVersion": 1.9
        },
        {
          "parameters": {
            "jsCode": "// Get the message from various possible sources\nlet message = $input.first().json.output || \n              $input.first().json.message || \n              $input.first().json.text || \n              $input.first().json.content || '';\n\n// Convert markdown to HTML for Telegram\nfunction markdownToTelegramHTML(text) {\n  return text\n    // Convert markdown headers to HTML\n    .replace(/^### (.*$)/gm, '<b>$1</b>')\n    .replace(/^## (.*$)/gm, '<b>$1</b>')\n    .replace(/^# (.*$)/gm, '<b>$1</b>')\n    // Convert bold markdown to HTML\n    .replace(/\\*\\*(.*?)\\*\\*/g, '<b>$1</b>')\n    // Convert markdown links to HTML\n    .replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href=\"$2\">$1</a>')\n    // Convert bullet points\n    .replace(/^- /gm, '• ');\n}\n\nconst htmlMessage = markdownToTelegramHTML(message);\n\nreturn {\n  json: {\n    message: htmlMessage,\n    originalMessage: message\n  }\n};"
          },
          "type": "n8n-nodes-base.code",
          "typeVersion": 2,
          "position": [
            4540,
            260
          ],
          "id": "cdabe10e-0a16-43da-8059-884f497b8ae2",
          "name": "Format for Telegram1"
        },
        {
          "parameters": {
            "options": {
              "reset": true
            }
          },
          "type": "n8n-nodes-base.splitInBatches",
          "typeVersion": 3,
          "position": [
            3820,
            340
          ],
          "id": "cab7d4f1-34b2-4ea6-8c6e-c395ecde8833",
          "name": "Process Articles in Batches1"
        },
        {
          "parameters": {},
          "type": "n8n-nodes-base.merge",
          "typeVersion": 3.1,
          "position": [
            4360,
            260
          ],
          "id": "f70c0033-81b2-4a8d-94ca-be673f122e97",
          "name": "Merge Results1"
        },
        {
          "parameters": {
            "fieldToSplitOut": "rss",
            "options": {}
          },
          "id": "eba1e9c6-744f-4a31-b6e2-7e0031764e08",
          "name": "Split Out2",
          "type": "n8n-nodes-base.splitOut",
          "position": [
            2820,
            1060
          ],
          "typeVersion": 1
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "2843a6ae-bf1e-4362-b67d-ff1ea035e4fc",
          "name": "Embeddings OpenAI3",
          "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
          "position": [
            3400,
            1280
          ],
          "typeVersion": 1.2,
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIALS_ID",
              "name": "OpenAI Account"
            }
          }
        },
        {
          "parameters": {
            "jsonMode": "expressionData",
            "jsonData": "=# {{ $json.title }}\n{{ $json.content }}",
            "options": {
              "metadata": {
                "metadataValues": [
                  {
                    "name": "title",
                    "value": "={{ $json.title }}"
                  },
                  {
                    "name": "createDate",
                    "value": "={{ $now.toISO() }}"
                  },
                  {
                    "name": "publishDate",
                    "value": "={{ $json.date }}"
                  },
                  {
                    "name": "link",
                    "value": "={{ $json.link }}"
                  }
                ]
              }
            }
          },
          "id": "00b86fad-cd48-4a8c-9884-597d363e2224",
          "name": "Default Data Loader2",
          "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
          "position": [
            3540,
            1220
          ],
          "typeVersion": 1
        },
        {
          "parameters": {
            "chunkSize": 3000,
            "options": {}
          },
          "id": "89e237d1-aa82-4f45-91f2-fb8f8804fe71",
          "name": "Recursive Character Text Splitter2",
          "type": "@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter",
          "position": [
            3600,
            1360
          ],
          "typeVersion": 1
        },
        {
          "parameters": {
            "rule": {
              "interval": [
                {
                  "daysInterval": 2,
                  "triggerAtHour": 1
                }
              ]
            }
          },
          "id": "d1186fff-5ad2-4bd0-9df2-c67d722bd7f5",
          "name": "Schedule Daily Articles2",
          "type": "n8n-nodes-base.scheduleTrigger",
          "position": [
            2380,
            1060
          ],
          "typeVersion": 1.2
        },
        {
          "parameters": {
            "content": "## 2. POSTS CATEGORY B",
            "height": 680,
            "width": 2740,
            "color": 5
          },
          "id": "d12ff075-b0ec-4203-9c3f-25b86fbea6e7",
          "name": "Sticky Note2",
          "type": "n8n-nodes-base.stickyNote",
          "position": [
            2300,
            900
          ],
          "typeVersion": 1
        },
        {
          "parameters": {
            "url": "={{ $json.rss }}",
            "options": {
              "ignoreSSL": false
            }
          },
          "id": "9f7ae07b-1612-4cc7-adef-aa1a7823b4b0",
          "name": "Read RSS Feeds2",
          "type": "n8n-nodes-base.rssFeedRead",
          "position": [
            3040,
            1060
          ],
          "typeVersion": 1.1
        },
        {
          "parameters": {
            "assignments": {
              "assignments": [
                {
                  "id": "e9f27ceb-c5f2-4997-8cb1-67576a7bb337",
                  "name": "title",
                  "type": "string",
                  "value": "={{ $json.title }}"
                },
                {
                  "id": "4c4f9417-40f2-4fb0-9976-d09f5984680f",
                  "name": "content",
                  "type": "string",
                  "value": "={{ $json['content:encodedSnippet'] ?? $json.contentSnippet}}"
                },
                {
                  "id": "e1986bac-054e-4240-ba50-536dbcd27337",
                  "name": "date",
                  "type": "string",
                  "value": "={{ $json.isoDate}}"
                },
                {
                  "id": "e1986bac-054e-4240-ba50-536dbcd27337",
                  "name": "link",
                  "type": "string",
                  "value": "={{ $json.link }}"
                }
              ]
            },
            "options": {}
          },
          "id": "1d769849-8a19-46f6-b149-9d24732dafaf",
          "name": "Normalize Article Fields2",
          "type": "n8n-nodes-base.set",
          "position": [
            3260,
            1060
          ],
          "typeVersion": 3.4
        },
        {
          "parameters": {
            "mode": "insert",
            "memoryKey": "posts_store_key",
            "clearStore": true
          },
          "id": "7098baf2-73ef-49b0-8e69-c7b413ef915e",
          "name": "Store Articles in Memory2",
          "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory",
          "position": [
            3480,
            1060
          ],
          "typeVersion": 1.1
        },
        {
          "parameters": {
            "model": {
              "__rl": true,
              "mode": "list",
              "value": "gpt-4o",
              "cachedResultName": "gpt-4o"
            },
            "options": {
              "maxTokens": 16000,
              "maxRetries": 2
            }
          },
          "id": "c3d5450c-53b6-45c0-b06a-a43ed6c6e256",
          "name": "OpenAI Chat Model2",
          "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
          "position": [
            4020,
            1360
          ],
          "typeVersion": 1.2,
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIALS_ID",
              "name": "OpenAI Account"
            }
          }
        },
        {
          "parameters": {
            "mode": "retrieve-as-tool",
            "toolName": "get_posts",
            "toolDescription": "Call this tool to get the latest posts.",
            "memoryKey": "posts_store_key",
            "topK": 20
          },
          "id": "cee31322-3ce7-4797-ba59-a5b6031fc382",
          "name": "Get Posts Tool2",
          "type": "@n8n/n8n-nodes-langchain.vectorStoreInMemory",
          "position": [
            4200,
            1340
          ],
          "typeVersion": 1.1
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "0b76aa5b-8105-4dfc-bf4c-e53f71fe7ebd",
          "name": "Embeddings OpenAI4",
          "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
          "position": [
            4300,
            1460
          ],
          "typeVersion": 1.2,
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIALS_ID",
              "name": "OpenAI Account"
            }
          }
        },
        {
          "parameters": {
            "chatId": "<YOUR_TELEGRAM_CHAT_ID>",
            "text": "={{ $json.message }}",
            "additionalFields": {
              "appendAttribution": false,
              "parse_mode": "HTML"
            }
          },
          "type": "n8n-nodes-base.telegram",
          "typeVersion": 1.2,
          "position": [
            4760,
            980
          ],
          "id": "b347fc80-f706-4807-8cbb-2fad4bd0d66d",
          "name": "Send to Telegram2",
          "webhookId": "YOUR_WEBHOOK_ID",
          "credentials": {
            "telegramApi": {
              "id": "YOUR_TELEGRAM_CREDENTIALS_ID",
              "name": "Telegram Bot"
            }
          }
        },
        {
          "parameters": {
            "promptType": "define",
            "text": "=Summarize the most relevant posts published in the past 7 days, with references. Today is {{ $now }}.",
            "options": {
              "systemMessage": "=You are an AI Content Analyst specializing in analyzing and summarizing posts from RSS feeds. Your role is to extract the most relevant information for your specific audience category.\n\n**Your Mission:**\nAnalyze the latest posts from the provided feeds and create actionable summaries focusing on:\n\n1. **Key Developments** - Latest posts and important updates\n2. **Trends & Patterns** - Emerging themes and market movements\n3. **Practical Insights** - Actionable information and strategies\n4. **Industry Analysis** - Expert commentary and thoughtful analysis\n5. **Important Updates** - Significant announcements and changes\n6. **Future Outlook** - Implications and what to watch for\n\n**CRITICAL FILTERING RULES:**\n- IGNORE all product promotions, course sales, and service advertisements\n- SKIP mentions of specific paid programs, workshops, or services being sold\n- EXCLUDE references to sales language or promotional content\n- FOCUS ONLY on the core insights, strategies, and valuable information\n- Extract general principles rather than promotional content\n\n**Output Format:**\n- Start with the most important development or insight of the week\n- Organize by relevance and actionability\n- Include specific examples and practical takeaways\n- Highlight time-sensitive information\n- Provide context on why each insight matters\n- Focus on practical implementation and real-world application\n\n**Tone:** Professional, informative, and practical. Write for readers who want to stay informed and take action based on the latest developments in their field."
            }
          },
          "id": "8ae9b348-02d7-40d3-9414-48dff4dd3ff2",
          "name": "AI Summary Agent2",
          "type": "@n8n/n8n-nodes-langchain.agent",
          "position": [
            4020,
            1160
          ],
          "typeVersion": 1.9
        },
        {
          "parameters": {
            "jsCode": "// Get the message from various possible sources\nlet message = $input.first().json.output || \n              $input.first().json.message || \n              $input.first().json.text || \n              $input.first().json.content || '';\n\n// Convert markdown to HTML for Telegram\nfunction markdownToTelegramHTML(text) {\n  return text\n    // Convert markdown headers to HTML\n    .replace(/^### (.*$)/gm, '<b>$1</b>')\n    .replace(/^## (.*$)/gm, '<b>$1</b>')\n    .replace(/^# (.*$)/gm, '<b>$1</b>')\n    // Convert bold markdown to HTML\n    .replace(/\\*\\*(.*?)\\*\\*/g, '<b>$1</b>')\n    // Convert markdown links to HTML\n    .replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href=\"$2\">$1</a>')\n    // Convert bullet points\n    .replace(/^- /gm, '• ');\n}\n\nconst htmlMessage = markdownToTelegramHTML(message);\n\nreturn {\n  json: {\n    message: htmlMessage,\n    originalMessage: message\n  }\n};"
          },
          "type": "n8n-nodes-base.code",
          "typeVersion": 2,
          "position": [
            4540,
            980
          ],
          "id": "8e136979-83ac-4fd6-81c2-6218b1c856c9",
          "name": "Format for Telegram2"
        },
        {
          "parameters": {
            "options": {
              "reset": true
            }
          },
          "type": "n8n-nodes-base.splitInBatches",
          "typeVersion": 3,
          "position": [
            3820,
            1060
          ],
          "id": "95e0af97-00d5-4765-bf9e-f3dba1cb2f6c",
          "name": "Process Articles in Batches2"
        },
        {
          "parameters": {},
          "type": "n8n-nodes-base.merge",
          "typeVersion": 3.1,
          "position": [
            4360,
            980
          ],
          "id": "0a33ab8e-cf7a-4000-bc74-4199d4810f76",
          "name": "Merge Results2"
        },
        {
          "parameters": {
            "assignments": {
              "assignments": [
                {
                  "id": "b8c00469-890b-4b5b-8e2e-2ad9ec2d0815",
                  "name": "rss",
                  "type": "array",
                  "value": "=[\"<YOUR_RSS_FEED_URL_1>\",\"<YOUR_RSS_FEED_URL_2>\",\"<YOUR_RSS_FEED_URL_3>\",\"<YOUR_RSS_FEED_URL_4>\",\"<YOUR_RSS_FEED_URL_5>\"]"
                }
              ]
            },
            "options": {}
          },
          "id": "1e79c73c-358b-4c59-ab26-b0b2143c2068",
          "name": "Set RSS Feeds List 2",
          "type": "n8n-nodes-base.set",
          "position": [
            2600,
            1060
          ],
          "typeVersion": 3.4
        }
      ],
      "pinData": {},
      "connections": {
        "Split Out1": {
          "main": [
            [
              {
                "node": "Read RSS Feeds1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Embeddings OpenAI1": {
          "ai_embedding": [
            [
              {
                "node": "Store Articles in Memory1",
                "type": "ai_embedding",
                "index": 0
              }
            ]
          ]
        },
        "Default Data Loader1": {
          "ai_document": [
            [
              {
                "node": "Store Articles in Memory1",
                "type": "ai_document",
                "index": 0
              }
            ]
          ]
        },
        "Recursive Character Text Splitter1": {
          "ai_textSplitter": [
            [
              {
                "node": "Default Data Loader1",
                "type": "ai_textSplitter",
                "index": 0
              }
            ]
          ]
        },
        "Schedule Daily Articles": {
          "main": [
            [
              {
                "node": "Set RSS Feeds List 1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Set RSS Feeds List 1": {
          "main": [
            [
              {
                "node": "Split Out1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Read RSS Feeds1": {
          "main": [
            [
              {
                "node": "Normalize Article Fields1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Normalize Article Fields1": {
          "main": [
            [
              {
                "node": "Store Articles in Memory1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "OpenAI Chat Model1": {
          "ai_languageModel": [
            [
              {
                "node": "AI Summary Agent1",
                "type": "ai_languageModel",
                "index": 0
              }
            ]
          ]
        },
        "Get News Articles Tool1": {
          "ai_tool": [
            [
              {
                "node": "AI Summary Agent1",
                "type": "ai_tool",
                "index": 0
              }
            ]
          ]
        },
        "Embeddings OpenAI2": {
          "ai_embedding": [
            [
              {
                "node": "Get Posts Tool1",
                "type": "ai_embedding",
                "index": 0
              }
            ]
          ]
        },
        "AI Summary Agent1": {
          "main": [
            [
              {
                "node": "Merge Results1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Format for Telegram1": {
          "main": [
            [
              {
                "node": "Send to Telegram1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Process Articles in Batches1": {
          "main": [
            [
              {
                "node": "Merge Results1",
                "type": "main",
                "index": 1
              }
            ],
            [
              {
                "node": "AI Summary Agent1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Merge Results1": {
          "main": [
            [
              {
                "node": "Format for Telegram1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Store Articles in Memory1": {
          "main": [
            [
              {
                "node": "Process Articles in Batches1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Split Out2": {
          "main": [
            [
              {
                "node": "Read RSS Feeds2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Embeddings OpenAI3": {
          "ai_embedding": [
            [
              {
                "node": "Store Articles in Memory2",
                "type": "ai_embedding",
                "index": 0
              }
            ]
          ]
        },
        "Default Data Loader2": {
          "ai_document": [
            [
              {
                "node": "Store Articles in Memory2",
                "type": "ai_document",
                "index": 0
              }
            ]
          ]
        },
        "Recursive Character Text Splitter2": {
          "ai_textSplitter": [
            [
              {
                "node": "Default Data Loader2",
                "type": "ai_textSplitter",
                "index": 0
              }
            ]
          ]
        },
        "Schedule Daily Articles2": {
          "main": [
            [
              {
                "node": "Set RSS Feeds List 2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Read RSS Feeds2": {
          "main": [
            [
              {
                "node": "Normalize Article Fields2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Normalize Article Fields2": {
          "main": [
            [
              {
                "node": "Store Articles in Memory2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Store Articles in Memory2": {
          "main": [
            [
              {
                "node": "Process Articles in Batches2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "OpenAI Chat Model2": {
          "ai_languageModel": [
            [
              {
                "node": "AI Summary Agent2",
                "type": "ai_languageModel",
                "index": 0
              }
            ]
          ]
        },
        "Get News Articles Tool2": {
          "ai_tool": [
            [
              {
                "node": "AI Summary Agent2",
                "type": "ai_tool",
                "index": 0
              }
            ]
          ]
        },
        "Embeddings OpenAI4": {
          "ai_embedding": [
            [
              {
                "node": "Get Posts Tool2",
                "type": "ai_embedding",
                "index": 0
              }
            ]
          ]
        },
        "AI Summary Agent2": {
          "main": [
            [
              {
                "node": "Merge Results2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Format for Telegram2": {
          "main": [
            [
              {
                "node": "Send to Telegram2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Process Articles in Batches2": {
          "main": [
            [
              {
                "node": "Merge Results2",
                "type": "main",
                "index": 1
              }
            ],
            [
              {
                "node": "AI Summary Agent2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Merge Results2": {
          "main": [
            [
              {
                "node": "Format for Telegram2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Set RSS Feeds List 2": {
          "main": [
            [
              {
                "node": "Split Out2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        }
      },
      "active": false,
      "settings": {
        "executionOrder": "v1"
      },
      "versionId": "TEMPLATE_VERSION_ID",
      "meta": {
        "templateCredsSetupCompleted": false,
        "instanceId": "TEMPLATE_INSTANCE_ID"
      },
      "id": "RSS_POSTS_AGGREGATOR_TEMPLATE",
      "tags": []
    }
  },
  {
    id: 'n8n-content-insights-agent',
    categoryId: 'n8n-automation',
    type: 'template',
    title: 'Content Insights Agent',
    description: 'AI-powered knowledge management system that captures web content, extracts insights, stores in Google Sheets, and provides intelligent search through saved knowledge.',
    platform: 'n8n',
    tags: ['ai', 'knowledge-management', 'content-curation', 'google-sheets', 'chat-agent', 'jordanurbs-tutorial'],
    difficulty: 'advanced',
    useCases: [
      'Personal knowledge base creation',
      'Content research and curation',
      'Weekly knowledge summaries',
      'AI-powered content search and retrieval'
    ],
    requiredServices: [
      'OpenAI API key',
      'Google Sheets API access',
      'Gmail OAuth2 credentials',
      'Anthropic API key (optional)',
      'n8n instance with webhook access'
    ],
    setupInstructions: `1. Set up API credentials in n8n (OpenAI, Google Sheets, Gmail)
2. Create a Google Sheet for your knowledge base
3. Configure the webhook URL for content capture
4. Set up the bookmarklet for easy content saving
5. Configure email settings for weekly summaries
6. Test the chat interface for knowledge retrieval
7. Customize AI prompts for your specific needs`,
    templateData: {
      "name": "Content Insights Agent",
      "nodes": [
        {
          "parameters": {
            "httpMethod": "POST",
            "path": "save-content-for-analysis",
            "options": {}
          },
          "id": "d0c9154d-dfb1-42d5-84af-b8ec2245ad6e",
          "name": "Content Capture Webhook",
          "type": "n8n-nodes-base.webhook",
          "typeVersion": 1.1,
          "position": [
            -112,
            -48
          ],
          "webhookId": "content-capture"
        },
        {
          "parameters": {
            "modelId": {
              "__rl": true,
              "value": "gpt-3.5-turbo",
              "mode": "list",
              "cachedResultName": "GPT-3.5-TURBO"
            },
            "messages": {
              "values": [
                {
                  "content": "=You are my personal knowledge curator and assistant. Your job is to help me build a comprehensive knowledge base from content I share with you.\n\nYour current task:\n1. Analyze the provided content (URL, text, or notes)\n2. Extract the most important information\n3. Create a structured summary that I can reference later\n\nContent to analyze:\nURL: {{ $json.body.url }}\nTitle: {{ $json.body.title }}\nContent/Notes: {{ $json.body.content }}\n\nPlease provide:\n1. A clear, concise title (if not provided)\n2. A 2-3 sentence summary of the main idea\n3. 3-5 key insights or takeaways (bullet points)\n4. Any notable quotes or data points\n5. 1-3 relevant tags/categories\n6. A \"Why this matters\" statement (1 sentence)\n\nFormat your response as JSON:\n{\n  \"title\": \"extracted or improved title\",\n  \"summary\": \"2-3 sentence summary\",\n  \"key_insights\": [\"insight 1\", \"insight 2\", \"insight 3\"],\n  \"notable_quotes\": [\"quote 1 if any\", \"quote 2 if any\"],\n  \"tags\": [\"tag1\", \"tag2\"],\n  \"why_it_matters\": \"one sentence on relevance\",\n  \"date_saved\": \"{{ $now.format('yyyy-MM-dd') }}\",\n  \"source_url\": \"{{ $json.body.url }}\"\n}"
                }
              ]
            },
            "options": {
              "temperature": 0.3
            }
          },
          "id": "c3d00bb3-4f22-4008-ac80-fccdbc16284d",
          "name": "Extract Insights with AI",
          "type": "@n8n/n8n-nodes-langchain.openAi",
          "typeVersion": 1,
          "position": [
            112,
            -48
          ],
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIAL_ID",
              "name": "OpenAI API Credentials"
            }
          }
        },
        {
          "parameters": {
            "operation": "append",
            "sheetId": "YOUR_GOOGLE_SHEET_ID",
            "range": "Knowledge Base!A:H",
            "options": {
              "usePathForKeyRow": true,
              "valueInputMode": "RAW"
            }
          },
          "id": "feb02a9d-a64b-422d-9e55-c82817473b5d",
          "name": "Save to Knowledge Base",
          "type": "n8n-nodes-base.googleSheets",
          "typeVersion": 2,
          "position": [
            704,
            -48
          ],
          "alwaysOutputData": true,
          "credentials": {
            "googleSheetsOAuth2Api": {
              "id": "YOUR_GOOGLE_SHEETS_CREDENTIAL_ID",
              "name": "Google Sheets OAuth2 Credentials"
            }
          }
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "eb91744b-354c-481b-a310-74e9052892c5",
          "name": "Success Response",
          "type": "n8n-nodes-base.respondToWebhook",
          "typeVersion": 1,
          "position": [
            992,
            -48
          ]
        },
        {
          "parameters": {
            "rule": {
              "interval": [
                {
                  "daysInterval": 3
                }
              ]
            }
          },
          "id": "dacc27ef-fb72-4816-8125-2675d9b22e9a",
          "name": "Weekly Summary Trigger",
          "type": "n8n-nodes-base.scheduleTrigger",
          "typeVersion": 1,
          "position": [
            -112,
            256
          ]
        },
        {
          "parameters": {
            "sheetId": "YOUR_GOOGLE_SHEET_ID",
            "range": "Knowledge Base!A:H",
            "options": {}
          },
          "id": "39702e0b-085f-49f7-a220-7e1677f9b383",
          "name": "Read This Week's Content",
          "type": "n8n-nodes-base.googleSheets",
          "typeVersion": 2,
          "position": [
            112,
            256
          ],
          "credentials": {
            "googleSheetsOAuth2Api": {
              "id": "YOUR_GOOGLE_SHEETS_CREDENTIAL_ID",
              "name": "Google Sheets OAuth2 Credentials"
            }
          }
        },
        {
          "parameters": {
            "modelId": {
              "__rl": true,
              "value": "gpt-3.5-turbo",
              "mode": "list",
              "cachedResultName": "GPT-3.5-TURBO"
            },
            "messages": {
              "values": [
                {
                  "content": "=You are my personal knowledge curator. I've saved various content this week, and I need you to create a thoughtful weekly digest.\n\nHere's what I saved this week:\n{{ JSON.stringify($input.all().map(item => item.json)) }}\n\n\nPlease create a weekly knowledge digest that includes:\n\n1. **This Week's Theme**: What topic or pattern emerged from my saved content?\n\n2. **Top 3 Most Important Insights**: The absolute best takeaways from everything I saved\n\n3. **Connections**: How do different pieces of content relate to each other?\n\n4. **Action Items**: 2-3 specific things I should do based on this week's learning\n\n5. **Deep Dive Recommendation**: Which saved item deserves more of my attention and why?\n\n6. **Quote of the Week**: The most impactful quote from all content\n\nFormat this as a friendly, conversational email that feels like it's from a knowledgeable friend who really gets my interests.\n\nSubject line: Weekly Digest - [Main Theme]"
                },
                {
                  "content": "Create engaging summaries that help identify patterns and connections across saved content. Use a friendly but professional tone.",
                  "role": "system"
                }
              ]
            },
            "options": {
              "temperature": 0.7
            }
          },
          "id": "9d259532-62ab-4a98-ab6b-5f5f3e4791c9",
          "name": "Generate Weekly Summary",
          "type": "@n8n/n8n-nodes-langchain.openAi",
          "typeVersion": 1,
          "position": [
            336,
            256
          ],
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIAL_ID",
              "name": "OpenAI API Credentials"
            }
          }
        },
        {
          "parameters": {
            "sendTo": "YOUR_EMAIL@DOMAIN.COM",
            "subject": "={{ $json.message.content.split('\\n')[0].replace('Subject line: ', '') }}",
            "message": "={{ $json.data }}",
            "options": {}
          },
          "id": "b5ad4097-587f-4af0-994c-4ac834e9245a",
          "name": "Send Weekly Digest",
          "type": "n8n-nodes-base.gmail",
          "typeVersion": 2,
          "position": [
            928,
            256
          ],
          "webhookId": "YOUR_WEBHOOK_ID",
          "credentials": {
            "gmailOAuth2": {
              "id": "YOUR_GMAIL_CREDENTIAL_ID",
              "name": "Gmail OAuth2 Credentials"
            }
          }
        },
        {
          "parameters": {
            "sheetId": "YOUR_GOOGLE_SHEET_ID",
            "range": "Knowledge Base!A:H",
            "options": {}
          },
          "id": "1d8a8701-8690-44a4-8657-b42777888407",
          "name": "Read Knowledge Base",
          "type": "n8n-nodes-base.googleSheets",
          "typeVersion": 2,
          "position": [
            112,
            560
          ],
          "credentials": {
            "googleSheetsOAuth2Api": {
              "id": "YOUR_GOOGLE_SHEETS_CREDENTIAL_ID",
              "name": "Google Sheets OAuth2 Credentials"
            }
          }
        },
        {
          "parameters": {
            "public": true,
            "initialMessages": "Hi! How can I help you find information from your knowledge base?",
            "options": {}
          },
          "type": "@n8n/n8n-nodes-langchain.chatTrigger",
          "typeVersion": 1.1,
          "position": [
            -112,
            560
          ],
          "id": "17848a5c-765b-4e6b-9611-78152cec80a1",
          "name": "When chat message received",
          "webhookId": "YOUR_CHAT_WEBHOOK_ID"
        },
        {
          "parameters": {
            "jsCode": "// Code node to parse AI response\nconst aiResponse = $input.first().json.message.content;\nconst parsedData = JSON.parse(aiResponse);\n\n// Flatten arrays for Google Sheets\nreturn {\n  json: {\n    title: parsedData.title,\n    summary: parsedData.summary,\n    key_insights: parsedData.key_insights.join('\\n• '),\n    notable_quotes: parsedData.notable_quotes.join('\\n'),\n    tags: parsedData.tags.join(', '),\n    why_it_matters: parsedData.why_it_matters,\n    date_saved: parsedData.date_saved,\n    source_url: parsedData.source_url\n  }\n};"
          },
          "type": "n8n-nodes-base.code",
          "typeVersion": 2,
          "position": [
            464,
            -48
          ],
          "id": "48a16c89-ad64-4a81-8454-42f2e692931e",
          "name": "Code"
        },
        {
          "parameters": {
            "mode": "markdownToHtml",
            "markdown": "={{ $json.message.content }}",
            "options": {}
          },
          "type": "n8n-nodes-base.markdown",
          "typeVersion": 1,
          "position": [
            688,
            256
          ],
          "id": "219091d7-beec-4c5a-8baa-8a0cc828783b",
          "name": "Markdown"
        },
        {
          "parameters": {
            "promptType": "define",
            "text": "={{ $('When chat message received').item.json.chatInput }}",
            "options": {
              "systemMessage": "=You are a personal knowledge assistant with access to a knowledge base. \n\nUser Query: {{ $('When chat message received').item.json.chatInput }}\n\nKnowledge Base Content:\n{{ JSON.stringify($input.all().map(item => item.json)) }}\n\nPlease search through the saved content and provide a helpful answer based on the available information. If you find relevant content, cite the specific sources.\n\nFormat your response to:\n1. Directly answer the question\n2. Reference specific content with dates when available\n3. Suggest related content that might be relevant\n4. Offer to help with follow-up questions"
            }
          },
          "type": "@n8n/n8n-nodes-langchain.agent",
          "typeVersion": 2.1,
          "position": [
            416,
            560
          ],
          "id": "75ac61a5-0008-4fd9-9d79-e5151a0f3d39",
          "name": "AI Agent"
        },
        {
          "parameters": {},
          "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
          "typeVersion": 1.3,
          "position": [
            512,
            800
          ],
          "id": "e8705d09-ab5d-4d2f-ab9f-738b0cb70374",
          "name": "Simple Memory"
        },
        {
          "parameters": {
            "model": {
              "__rl": true,
              "value": "claude-3-7-sonnet-20250219",
              "mode": "list",
              "cachedResultName": "Claude Sonnet 3.7"
            },
            "options": {}
          },
          "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
          "typeVersion": 1.3,
          "position": [
            336,
            880
          ],
          "id": "bf99686a-2ee2-48ab-87bc-ceef16c19cf5",
          "name": "Anthropic Chat Model",
          "credentials": {
            "anthropicApi": {
              "id": "YOUR_ANTHROPIC_CREDENTIAL_ID",
              "name": "Anthropic API Credentials"
            }
          }
        },
        {
          "parameters": {
            "content": "## JAVASCRIPT BOOKMARKLET\n\n1. Create a new bookmark in your browser\n2. Call it \"SAVE CONTENT\" and use this as the URL:\n\n```javascript\njavascript:(function(){\n  fetch('https://YOUR-N8N-DOMAIN.COM/webhook/save-content-for-analysis', {\n    method: 'POST',\n    headers: {'Content-Type': 'application/json'},\n    body: JSON.stringify({\n      url: window.location.href,\n      title: document.title,\n      content: window.getSelection().toString()\n    })\n  }).then(()=>alert('Content saved to knowledge base!'));\n})();\n```\n\n**Setup Instructions:**\n- Replace YOUR-N8N-DOMAIN.COM with your actual n8n instance URL\n- Make sure the webhook path matches your workflow configuration",
            "height": 256,
            "width": 496,
            "color": 4
          },
          "type": "n8n-nodes-base.stickyNote",
          "typeVersion": 1,
          "position": [
            -816,
            -160
          ],
          "id": "2e8506ef-d014-48fb-877d-87c5a53ff634",
          "name": "Bookmarklet Instructions"
        },
        {
          "parameters": {
            "model": {
              "__rl": true,
              "value": "gpt-4.1-mini",
              "mode": "list",
              "cachedResultName": "gpt-4.1-mini"
            },
            "options": {}
          },
          "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
          "typeVersion": 1.2,
          "position": [
            336,
            736
          ],
          "id": "2145ee18-ddf8-454b-bfcd-2e8f6e65b175",
          "name": "OpenAI Chat Model",
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIAL_ID",
              "name": "OpenAI API Credentials"
            }
          }
        }
      ],
      "pinData": {},
      "connections": {
        "Content Capture Webhook": {
          "main": [
            [
              {
                "node": "Extract Insights with AI",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Extract Insights with AI": {
          "main": [
            [
              {
                "node": "Code",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Save to Knowledge Base": {
          "main": [
            [
              {
                "node": "Success Response",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Weekly Summary Trigger": {
          "main": [
            [
              {
                "node": "Read This Week's Content",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Read This Week's Content": {
          "main": [
            [
              {
                "node": "Generate Weekly Summary",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Generate Weekly Summary": {
          "main": [
            [
              {
                "node": "Markdown",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Read Knowledge Base": {
          "main": [
            [
              {
                "node": "AI Agent",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "When chat message received": {
          "main": [
            [
              {
                "node": "Read Knowledge Base",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Code": {
          "main": [
            [
              {
                "node": "Save to Knowledge Base",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Markdown": {
          "main": [
            [
              {
                "node": "Send Weekly Digest",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Simple Memory": {
          "ai_memory": [
            [
              {
                "node": "AI Agent",
                "type": "ai_memory",
                "index": 0
              }
            ]
          ]
        },
        "Anthropic Chat Model": {
          "ai_languageModel": [
            []
          ]
        },
        "OpenAI Chat Model": {
          "ai_languageModel": [
            [
              {
                "node": "AI Agent",
                "type": "ai_languageModel",
                "index": 0
              }
            ]
          ]
        }
      },
      "active": false,
      "settings": {
        "executionOrder": "v1"
      },
      "tags": [
        {
          "name": "AI Agent"
        },
        {
          "name": "Knowledge Management"
        }
      ]
    }
  },
  {
    id: 'n8n-crawl4ai-agent',
    categoryId: 'n8n-automation',
    type: 'template',
    title: 'Crawl4AI Agent',
    description: 'Advanced web scraping and RAG AI agent using Crawl4AI Docker deployment to ingest documentation and provide intelligent chat-based search.',
    platform: 'n8n',
    tags: ['ai', 'web-scraping', 'crawl4ai', 'rag', 'supabase', 'chat-agent'],
    difficulty: 'advanced',
    useCases: [
      'Documentation ingestion and RAG',
      'Intelligent web scraping workflows',
      'AI-powered content analysis',
      'Knowledge base creation from websites'
    ],
    requiredServices: [
      'Crawl4AI Docker deployment',
      'OpenAI API key',
      'Supabase database with vector storage',
      'PostgreSQL for chat memory',
      'n8n instance with AI nodes'
    ],
    setupInstructions: `1. Deploy Crawl4AI using Docker following their documentation
2. Set up Supabase database with vector storage table
3. Configure PostgreSQL for chat memory
4. Set up OpenAI API credentials in n8n
5. Configure HTTP authentication for Crawl4AI API
6. Update the sitemap URL to your target documentation
7. Test the workflow by clicking "Test workflow"
8. Use the chat interface to query the ingested documentation`,
    templateData: {
      "name": "Crawl4AI Agent",
      "nodes": [
        {
          "parameters": {},
          "id": "b90d81a3-0920-419e-bdee-e227ac106383",
          "name": "When clicking 'Test workflow'",
          "type": "n8n-nodes-base.manualTrigger",
          "typeVersion": 1,
          "position": [
            760,
            300
          ]
        },
        {
          "parameters": {
            "url": "https://ai.pydantic.dev/sitemap.xml",
            "options": {}
          },
          "id": "e6033590-2727-4b81-a27b-3dd45dcfbb79",
          "name": "HTTP Request",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 4.2,
          "position": [
            960,
            160
          ]
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "1db8ab3d-4594-45cf-8256-d05d7f7697f7",
          "name": "XML",
          "type": "n8n-nodes-base.xml",
          "typeVersion": 1,
          "position": [
            1160,
            360
          ]
        },
        {
          "parameters": {
            "fieldToSplitOut": "urlset.url",
            "options": {}
          },
          "id": "8eeca9bb-0c16-4ebf-b9f4-db481e963c41",
          "name": "Split Out",
          "type": "n8n-nodes-base.splitOut",
          "typeVersion": 1,
          "position": [
            1320,
            160
          ]
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "460dcd6c-d26c-407c-ad06-016cc800609d",
          "name": "Loop Over Items",
          "type": "n8n-nodes-base.splitInBatches",
          "typeVersion": 3,
          "position": [
            1560,
            260
          ]
        },
        {
          "parameters": {},
          "id": "8d35dd97-4926-4c22-989a-008d974f9799",
          "name": "Wait",
          "type": "n8n-nodes-base.wait",
          "typeVersion": 1.1,
          "position": [
            1980,
            260
          ],
          "webhookId": "9af87c5e-b07f-48dc-9ca8-61b471a24cad"
        },
        {
          "parameters": {
            "method": "POST",
            "url": "https://seashell-app-gvc6l.ondigitalocean.app/crawl",
            "authentication": "genericCredentialType",
            "genericAuthType": "httpHeaderAuth",
            "sendBody": true,
            "bodyParameters": {
              "parameters": [
                {
                  "name": "urls",
                  "value": "={{ $json.loc }}"
                },
                {
                  "name": "priority",
                  "value": "10"
                }
              ]
            },
            "options": {}
          },
          "id": "b644ca6c-33fd-40bb-902f-79025d65b1a3",
          "name": "HTTP Request1",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 4.2,
          "position": [
            1780,
            260
          ],
          "credentials": {
            "httpHeaderAuth": {
              "id": "YOUR_HTTP_AUTH_CREDENTIAL_ID",
              "name": "Crawl4AI Auth"
            }
          }
        },
        {
          "parameters": {
            "url": "=https://seashell-app-gvc6l.ondigitalocean.app/task/{{ $json.task_id }}",
            "authentication": "genericCredentialType",
            "genericAuthType": "httpHeaderAuth",
            "options": {
              "timeout": 5000
            }
          },
          "id": "f85a925e-348a-4616-ae61-9e5fa60ac8c2",
          "name": "HTTP Request2",
          "type": "n8n-nodes-base.httpRequest",
          "typeVersion": 4.2,
          "position": [
            2200,
            260
          ],
          "retryOnFail": true,
          "waitBetweenTries": 5000,
          "credentials": {
            "httpHeaderAuth": {
              "id": "YOUR_HTTP_AUTH_CREDENTIAL_ID",
              "name": "Crawl4AI Auth"
            }
          }
        },
        {
          "parameters": {
            "conditions": {
              "options": {
                "caseSensitive": true,
                "leftValue": "",
                "typeValidation": "strict",
                "version": 2
              },
              "conditions": [
                {
                  "id": "9d90c1ce-590e-40a5-ae8c-d92326032975",
                  "leftValue": "={{ $json.status }}",
                  "rightValue": "completed",
                  "operator": {
                    "type": "string",
                    "operation": "equals"
                  }
                }
              ],
              "combinator": "and"
            },
            "options": {}
          },
          "id": "83e7b017-4196-4e59-b255-921f88b2c5ef",
          "name": "If",
          "type": "n8n-nodes-base.if",
          "typeVersion": 2.2,
          "position": [
            2420,
            260
          ]
        },
        {
          "parameters": {
            "jsonMode": "expressionData",
            "jsonData": "={{ $json.result.markdown }}",
            "options": {
              "metadata": {
                "metadataValues": [
                  {
                    "name": "page",
                    "value": "={{ $json.result.url }}"
                  }
                ]
              }
            }
          },
          "id": "57cd5ed4-0be0-47b7-b278-84192b28c1f0",
          "name": "Default Data Loader",
          "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
          "typeVersion": 1,
          "position": [
            2800,
            260
          ]
        },
        {
          "parameters": {
            "chunkSize": 5000
          },
          "id": "36b4f50d-2eef-419e-b424-e3203afc9980",
          "name": "Character Text Splitter",
          "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
          "typeVersion": 1,
          "position": [
            2940,
            400
          ]
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "bd5af242-1d0c-445f-af84-07e337bfa768",
          "name": "Embeddings OpenAI",
          "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
          "typeVersion": 1.1,
          "position": [
            2640,
            260
          ],
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIAL_ID",
              "name": "OpenAI API Credentials"
            }
          }
        },
        {
          "parameters": {
            "assignments": {
              "assignments": [
                {
                  "id": "f2bcdb54-e1fe-4670-99aa-6eec973bf5f1",
                  "name": "task_id",
                  "value": "={{ $('HTTP Request1').item.json.task_id }}",
                  "type": "string"
                }
              ]
            },
            "options": {}
          },
          "id": "556103b7-217d-4247-8aa0-cb45ede76b3b",
          "name": "Edit Fields",
          "type": "n8n-nodes-base.set",
          "typeVersion": 3.4,
          "position": [
            2660,
            460
          ]
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "b4054e7f-b429-4f4c-9d55-3004bfd9e1ce",
          "name": "When chat message received",
          "type": "@n8n/n8n-nodes-langchain.chatTrigger",
          "typeVersion": 1.1,
          "position": [
            1420,
            -500
          ],
          "webhookId": "YOUR_CHAT_WEBHOOK_ID"
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "105b2092-36d3-45d6-9686-673f886933f8",
          "name": "OpenAI Chat Model",
          "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
          "typeVersion": 1,
          "position": [
            1580,
            -280
          ],
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIAL_ID",
              "name": "OpenAI API Credentials"
            }
          }
        },
        {
          "parameters": {},
          "id": "1c33efa9-4492-4579-987d-ed0c9d56ecce",
          "name": "Postgres Chat Memory",
          "type": "@n8n/n8n-nodes-langchain.memoryPostgresChat",
          "typeVersion": 1.3,
          "position": [
            1720,
            -280
          ],
          "credentials": {
            "postgres": {
              "id": "YOUR_POSTGRES_CREDENTIAL_ID",
              "name": "PostgreSQL Chat Memory"
            }
          }
        },
        {
          "parameters": {
            "name": "pydantic_ai_docs",
            "description": "Retrieves data related to Pydantic AI using their documentation."
          },
          "id": "95207afc-1362-401f-9ea0-4d9c61bf9b13",
          "name": "Vector Store Tool",
          "type": "@n8n/n8n-nodes-langchain.toolVectorStore",
          "typeVersion": 1,
          "position": [
            2060,
            -380
          ]
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "5c1bfc8e-b208-4c22-93b5-4e66f45a495a",
          "name": "Embeddings OpenAI1",
          "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
          "typeVersion": 1.1,
          "position": [
            1820,
            -80
          ],
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIAL_ID",
              "name": "OpenAI API Credentials"
            }
          }
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "eb940dd5-56e6-4e04-9534-2f910b5d6c8e",
          "name": "OpenAI Chat Model1",
          "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
          "typeVersion": 1,
          "position": [
            2200,
            -200
          ],
          "credentials": {
            "openAiApi": {
              "id": "YOUR_OPENAI_CREDENTIAL_ID",
              "name": "OpenAI API Credentials"
            }
          }
        },
        {
          "parameters": {
            "mode": "insert",
            "tableName": {
              "__rl": true,
              "value": "documents",
              "mode": "list",
              "cachedResultName": "documents"
            },
            "options": {
              "queryName": "match_documents"
            }
          },
          "id": "45ca72cc-063c-4dfa-9957-fd9d56647374",
          "name": "Supabase Vector Store",
          "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
          "typeVersion": 1,
          "position": [
            2660,
            40
          ],
          "credentials": {
            "supabaseApi": {
              "id": "YOUR_SUPABASE_CREDENTIAL_ID",
              "name": "Supabase API Credentials"
            }
          }
        },
        {
          "parameters": {
            "options": {}
          },
          "id": "c697f5fe-6d78-4b93-b4f9-a86b7b0aea03",
          "name": "AI Agent",
          "type": "@n8n/n8n-nodes-langchain.agent",
          "typeVersion": 1.7,
          "position": [
            1680,
            -500
          ]
        },
        {
          "parameters": {
            "tableName": {
              "__rl": true,
              "value": "documents",
              "mode": "list",
              "cachedResultName": "documents"
            },
            "options": {
              "queryName": "match_documents"
            }
          },
          "id": "2d9d0203-c24b-4e5e-9c5f-d362bd85b966",
          "name": "Supabase Vector Store1",
          "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
          "typeVersion": 1,
          "position": [
            1860,
            -220
          ],
          "credentials": {
            "supabaseApi": {
              "id": "YOUR_SUPABASE_CREDENTIAL_ID",
              "name": "Supabase API Credentials"
            }
          }
        },
        {
          "parameters": {
            "content": "# n8n + Crawl4AI Agent\n\n## Author: [Cole Medin](https://www.youtube.com/@ColeMedin)\n\nThis AI agent demonstrates how to use a Docker deployment of Crawl4AI to leverage this incredible open source web scraping tool directly in n8n.\n\nThe prerequisite for this workflow is that you have Crawl4AI hosted in a Docker container following these [instructions in the their docs](https://docs.crawl4ai.com/core/docker-deploymeny/).\n\n## How to use this workflow\n\n1. Execute the bottom workflow by clicking on \"Test workflow\". This will ingest all the Pydantic AI documentation into the Supabase DB for RAG.\n\n2. Chat with the agent with the \"Chat\" button - it'll be able to answer questions about Pydantic AI using the documentation as its source!\n\n## Extend this workflow!\n\nThis is just a starting point showing you how to use Crawl4AI in n8n! Feel free to take this along with the Crawl4AI documentation to run wild with building RAG AI agents. The possibilities with this setup are endless!",
            "height": 613.6610941618816,
            "width": 589.875,
            "color": 6
          },
          "id": "71f6f900-60a0-4d15-85f1-88b30f56c492",
          "name": "Sticky Note",
          "type": "n8n-nodes-base.stickyNote",
          "typeVersion": 1,
          "position": [
            660,
            -540
          ]
        }
      ],
      "pinData": {},
      "connections": {
        "When clicking 'Test workflow'": {
          "main": [
            [
              {
                "node": "HTTP Request",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "HTTP Request": {
          "main": [
            [
              {
                "node": "XML",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "XML": {
          "main": [
            [
              {
                "node": "Split Out",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Split Out": {
          "main": [
            [
              {
                "node": "Loop Over Items",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Loop Over Items": {
          "main": [
            [],
            [
              {
                "node": "HTTP Request1",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Wait": {
          "main": [
            [
              {
                "node": "HTTP Request2",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "HTTP Request1": {
          "main": [
            [
              {
                "node": "Wait",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "HTTP Request2": {
          "main": [
            [
              {
                "node": "If",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "If": {
          "main": [
            [
              {
                "node": "Supabase Vector Store",
                "type": "main",
                "index": 0
              }
            ],
            [
              {
                "node": "Edit Fields",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Default Data Loader": {
          "ai_document": [
            [
              {
                "node": "Supabase Vector Store",
                "type": "ai_document",
                "index": 0
              }
            ]
          ]
        },
        "Character Text Splitter": {
          "ai_textSplitter": [
            [
              {
                "node": "Default Data Loader",
                "type": "ai_textSplitter",
                "index": 0
              }
            ]
          ]
        },
        "Embeddings OpenAI": {
          "ai_embedding": [
            [
              {
                "node": "Supabase Vector Store",
                "type": "ai_embedding",
                "index": 0
              }
            ]
          ]
        },
        "Edit Fields": {
          "main": [
            [
              {
                "node": "Wait",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "When chat message received": {
          "main": [
            [
              {
                "node": "AI Agent",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "OpenAI Chat Model": {
          "ai_languageModel": [
            [
              {
                "node": "AI Agent",
                "type": "ai_languageModel",
                "index": 0
              }
            ]
          ]
        },
        "Postgres Chat Memory": {
          "ai_memory": [
            [
              {
                "node": "AI Agent",
                "type": "ai_memory",
                "index": 0
              }
            ]
          ]
        },
        "Vector Store Tool": {
          "ai_tool": [
            [
              {
                "node": "AI Agent",
                "type": "ai_tool",
                "index": 0
              }
            ]
          ]
        },
        "Embeddings OpenAI1": {
          "ai_embedding": [
            [
              {
                "node": "Supabase Vector Store1",
                "type": "ai_embedding",
                "index": 0
              }
            ]
          ]
        },
        "OpenAI Chat Model1": {
          "ai_languageModel": [
            [
              {
                "node": "Vector Store Tool",
                "type": "ai_languageModel",
                "index": 0
              }
            ]
          ]
        },
        "Supabase Vector Store": {
          "main": [
            [
              {
                "node": "Loop Over Items",
                "type": "main",
                "index": 0
              }
            ]
          ]
        },
        "Supabase Vector Store1": {
          "ai_vectorStore": [
            [
              {
                "node": "Vector Store Tool",
                "type": "ai_vectorStore",
                "index": 0
              }
            ]
          ]
        }
      },
      "active": false,
      "settings": {
        "executionOrder": "v1"
      },
      "tags": []
    }
  }
];

// Combined data for unified filtering
export const allItems = [...prompts, ...templates];

// Helper function to get prompts by category
export const getPromptsByCategory = (categoryId) => {
  return prompts.filter(prompt => prompt.categoryId === categoryId);
};

// Helper function to get templates by category
export const getTemplatesByCategory = (categoryId) => {
  return templates.filter(template => template.categoryId === categoryId);
};

// Helper function to get all items (prompts + templates) by category
export const getItemsByCategory = (categoryId) => {
  return allItems.filter(item => item.categoryId === categoryId);
};

// Helper function to get items by type
export const getItemsByType = (type) => {
  if (type === 'prompt') return prompts;
  if (type === 'template') return templates;
  return allItems;
};