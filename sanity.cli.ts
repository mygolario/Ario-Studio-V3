import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'v3ydinkq',
    dataset: 'production'
  },
  // Explicitly point to the studio hostname if needed, 
  // though usually 'sanity deploy' handles this via API/interactive prompt.
})
