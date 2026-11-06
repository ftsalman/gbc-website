import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, pathToFileURL } from 'node:url'

const serverDir = fileURLToPath(new URL('./server/', import.meta.url))

// DEV ONLY: answers /api/meta/lead.php (production runs the real PHP file on the
// hosting) with the Express stand-in in server/, so forms work under `npm run dev`.
const contactApi = (env) => ({
  name: 'contact-api',
  async configureServer(server) {
    // Non-literal paths so Vite doesn't bundle server code into the config.
    const { createApp } = await import(pathToFileURL(serverDir + 'app.js').href)
    const { createMailer } = await import(pathToFileURL(serverDir + 'mail.js').href)

    let app
    try {
      const mailer = createMailer(env)
      app = createApp({
        sendEmail: mailer.sendEmail,
        mailFrom: env.MAIL_FROM,
        contactTo: env.CONTACT_TO,
      })
    } catch (error) {
      server.config.logger.error(`[contact-api] ${error.message}`)
      return
    }

    server.middlewares.use((req, res, next) =>
      req.url?.startsWith('/api/') ? app(req, res, next) : next(),
    )
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // '' prefix loads all .env vars (SMTP_*, MAIL_FROM…) — server-side only, never sent to the browser.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), contactApi(env)],
    assetsInclude: ['**/*.glb'],
  }
})
