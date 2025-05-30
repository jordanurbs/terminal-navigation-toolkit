import { createRouter, createWebHistory } from 'vue-router'

// Import page components
import HomePage from './views/HomePage.vue'
import CheatSheetPage from './views/CheatSheetPage.vue'
import ChallengeCalendarPage from './views/ChallengeCalendarPage.vue'
import TroubleshootingPage from './views/TroubleshootingPage.vue'
import SetupScriptsPage from './views/SetupScriptsPage.vue'
import ProgressPage from './views/ProgressPage.vue'
import DependenciesPage from './views/DependenciesPage.vue'
import PromptsPage from './views/PromptsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/cheatsheet',
    name: 'CheatSheet',
    component: CheatSheetPage
  },
  {
    path: '/challenges',
    name: 'Challenges',
    component: ChallengeCalendarPage
  },
  {
    path: '/troubleshooting',
    name: 'Troubleshooting',
    component: TroubleshootingPage
  },
  {
    path: '/setup',
    name: 'SetupScripts',
    component: SetupScriptsPage
  },
  {
    path: '/progress',
    name: 'Progress',
    component: ProgressPage
  },
  {
    path: '/dependencies',
    name: 'Dependencies',
    component: DependenciesPage
  },
  {
    path: '/prompts',
    name: 'Prompts & Templates',
    component: PromptsPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top when navigating
    return { top: 0 }
  }
})

export default router