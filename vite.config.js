import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, pathToFileURL } from 'node:url'

const serverDir = fileURLToPath(new URL('./server/', import.meta.url))

// DEV: runs the lead API (server/) inside the Vite dev server, so `npm run dev`
// alone handles POST /api/lead. In production run server/ with `npm start`.
const contactApi = (env) => ({
  name: 'contact-api',
  async configureServer(server) {
    // Non-literal paths so Vite doesn't bundle server code into the config.
    const { createApp } = await import(pathToFileURL(serverDir + 'app.js').href)
    const { createMailer } = await import(pathToFileURL(serverDir + 'mail.js').href)
    const { createMetaTracker } = await import(pathToFileURL(serverDir + 'meta.js').href)

    let app
    try {
      const mailer = createMailer(env)
      app = createApp({
        sendEmail: mailer.sendEmail,
        mailFrom: env.MAIL_FROM,
        contactTo: env.CONTACT_TO,
        metaTracker: createMetaTracker(env),
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
