import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://painel-de-funcionarios.vercel.app',
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents() {
    },
  },
})






