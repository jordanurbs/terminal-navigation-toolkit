/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  readonly VITE_API_URL: string
  readonly CAPTAINS_TOOLKIT_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 