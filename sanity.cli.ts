import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'v3ydinkq',
    dataset: 'production'
  },
  // Studio deployment configuration
  project: {
    basePath: '/studio'
  },
  // Auto-updates configuration (if supported by your plan/setup)
  // Note: 'deployment' is not a standard key in standard defineCliConfig types usually, 
  // but often used in older or specific setups. 
  // However, for standard V3, we usually rely on the cloud hosting.
  // If this is for a specific internal tool or plugin, we add it here.
  // Based on your request:
  deployment: {
    appId: 'zdixr81juxq9a3nqci9zzoxc',
    autoUpdates: true
  }
} as any) // Casting to any to allow custom 'deployment' key if types are strict
