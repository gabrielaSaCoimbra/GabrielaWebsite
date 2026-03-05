import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '3imu19ps',
    dataset: 'production',
  },
  studioHost: 'gabrielacoimbra',
  deployment: {autoUpdates: true},
})
