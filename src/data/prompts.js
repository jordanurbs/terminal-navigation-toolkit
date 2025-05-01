// Prompt Categories
export const promptCategories = [
  {
    id: 'copilot',
    icon: '💻',
    name: 'Cursor/Windsurf Rules',
    description: 'System prompts (rules) for your vibe coding co-captain.'
  },
  {
    id: 'features',
    icon: '💻',
    name: 'Features or Changes',
    description: 'Add new functionality or adjust infrastructure.'
  },
  {
    id: 'projectsetup',
    icon: '🏗️',
    name: 'Project Setup',
    description: 'Prompts for setting up new projects, initializing repositories, and configuring development environments.'
  },
  {
    id: 'debugging',
    icon: '🐞',
    name: 'Debugging',
    description: 'Prompts to help you identify and fix issues in your code with AI assistance.'
  },

  {
    id: 'documentation',
    icon: '📝',
    name: 'Documentation',
    description: 'Prompts for generating documentation, README files, and code comments.'
  }
];

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
    id: 'error-diagnosis',
    categoryId: 'debugging',
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
    categoryId: 'documentation',
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
    description: 'Train Cursor to use 2 modes: Planner or Executor. Use the planner to create a plan for your project, and the executor to execute the plan.',
    tips: [
      'Tweak it as necessary to fit your project.'
    ]
  },
  {
    id: 'ssr-migration',
    categoryId: 'features',
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
  }
];

// Helper function to get prompts by category
export const getPromptsByCategory = (categoryId) => {
  return prompts.filter(prompt => prompt.categoryId === categoryId);
}; 