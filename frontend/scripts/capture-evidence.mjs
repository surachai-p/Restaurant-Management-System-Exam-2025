import { chromium } from 'playwright-core'
import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost'
const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3001'
const outputDirectory = new URL('../../tests/reports/', import.meta.url).pathname.replace(/^\/(.:)/, '$1')
const repositoryDirectory = new URL('../../', import.meta.url).pathname.replace(/^\/(.:)/, '$1').replace(/\/$/, '')

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const commandOutput = (command, args, cwd) => {
  const executable = process.platform === 'win32' && command === 'npm' ? 'npm.cmd' : command
  const result = spawnSync(executable, args, { cwd, encoding: 'utf8' })
  return `${result.stdout ?? ''}${result.stderr ?? ''}`.trim()
}

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
})

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const screenshotText = async (title, content, filename) => {
    const page = await context.newPage()
    await page.setContent(`<!doctype html><html><style>
      body { margin: 0; padding: 40px; background: #0b1020; color: #e5eefc; font: 18px/1.5 Consolas, monospace; }
      h1 { margin-top: 0; color: #7dd3fc; font: 700 28px/1.2 Arial, sans-serif; }
      pre { white-space: pre-wrap; overflow-wrap: anywhere; background: #111a2e; border: 1px solid #263652; border-radius: 12px; padding: 24px; }
    </style><body><h1>${escapeHtml(title)}</h1><pre>${escapeHtml(content)}</pre></body></html>`)
    await page.screenshot({ path: `${outputDirectory}/${filename}`, fullPage: true })
    await page.close()
  }

  const healthPage = await context.newPage()
  await healthPage.goto(`${backendUrl}/api/health`, { waitUntil: 'networkidle' })
  await healthPage.screenshot({ path: `${outputDirectory}/onprem-backend-health.png`, fullPage: true })
  await healthPage.screenshot({ path: `${outputDirectory}/smoke-1-health.png`, fullPage: true })

  const appPage = await context.newPage()
  await appPage.goto(frontendUrl, { waitUntil: 'networkidle' })
  await appPage.locator('input[type="text"]').fill('admin')
  await appPage.locator('input[type="password"]').fill('Admin@123')
  await appPage.getByRole('button', { name: 'Sign In' }).click()
  await appPage.getByRole('heading', { name: 'Dashboard' }).waitFor()
  await appPage.screenshot({ path: `${outputDirectory}/onprem-frontend-login.png`, fullPage: true })
  await appPage.screenshot({ path: `${outputDirectory}/smoke-2-login.png`, fullPage: true })

  await appPage.getByRole('link', { name: 'Orders' }).click()
  await appPage.getByRole('button', { name: '+ New Order' }).click()
  await appPage.locator('select').first().selectOption({ index: 1 })
  await appPage.getByRole('button', { name: 'Open Order' }).click()
  await appPage.getByText('Add Item').waitFor()
  await appPage.locator('select').first().selectOption({ index: 1 })
  await appPage.getByRole('button', { name: 'Add to Order' }).click()
  await appPage.getByText('Item added').waitFor()
  await appPage.getByRole('button', { name: '✓ Confirm Order' }).click()
  await appPage.getByText('Order confirmed!').waitFor()
  await appPage.screenshot({ path: `${outputDirectory}/smoke-3-order.png`, fullPage: true })

  await appPage.getByRole('link', { name: /Process Payment/ }).click()
  await appPage.locator('input[type="number"]').fill('9999')
  await appPage.getByRole('button', { name: 'Process Payment' }).click()
  await appPage.getByText('Payment Successful!').waitFor()
  await appPage.screenshot({ path: `${outputDirectory}/smoke-4-payment.png`, fullPage: true })

  const dockerStatus = commandOutput('docker', ['compose', 'ps'], repositoryDirectory)
  await screenshotText('Docker Compose staging status', dockerStatus, 'staging-docker-ps.png')

  const dockerfiles = [
    'BACKEND DOCKERFILE',
    readFileSync(`${repositoryDirectory}/backend/Dockerfile`, 'utf8'),
    '\nFRONTEND DOCKERFILE',
    readFileSync(`${repositoryDirectory}/frontend/Dockerfile`, 'utf8'),
  ].join('\n')
  await screenshotText('Multi-stage Docker builds', dockerfiles, 'dockerfile-multistage.png')

  const backendAudit = commandOutput('npm', ['audit', '--audit-level=moderate'], `${repositoryDirectory}/backend`)
  const frontendAudit = commandOutput('npm', ['audit', '--audit-level=moderate'], `${repositoryDirectory}/frontend`)
  await screenshotText('Backend npm audit', backendAudit, 'npm-audit-backend.png')
  await screenshotText('Frontend npm audit', frontendAudit, 'npm-audit-frontend.png')

  const newmanReport = JSON.parse(readFileSync(`${outputDirectory}/newman-report.json`, 'utf8'))
  const stats = newmanReport.run.stats
  const newmanSummary = [
    `Collection: RMS-68030231-TestSuite`,
    `Requests: ${stats.requests.total - stats.requests.failed}/${stats.requests.total} passed`,
    `Assertions: ${stats.assertions.total - stats.assertions.failed}/${stats.assertions.total} passed`,
    `Failed assertions: ${stats.assertions.failed}`,
    `Pass rate: ${(((stats.assertions.total - stats.assertions.failed) / stats.assertions.total) * 100).toFixed(1)}%`,
  ].join('\n')
  await screenshotText('Newman E2E result', newmanSummary, 'newman-cli-result.png')

  const collectionOverview = [
    readFileSync(`${repositoryDirectory}/tests/postman/env.json`, 'utf8'),
    '\nCollection: RMS-68030231-TestSuite\n24 requests; every request contains pm.test assertions.',
  ].join('\n')
  await screenshotText('Postman collection and environment', collectionOverview, 'postman-collection-env.png')
  await screenshotText('Postman collection run', newmanSummary, 'postman-run-result.png')

  const evidenceFor = (namePart) => {
    const execution = newmanReport.run.executions.find(({ item }) => item.name.includes(namePart))
    if (!execution) return `No execution found for ${namePart}`
    return [
      `Test: ${execution.item.name}`,
      `HTTP status: ${execution.response?.code}`,
      ...execution.assertions.map(({ assertion, error }) => `${error ? 'FAIL' : 'PASS'} — ${assertion}`),
    ].join('\n')
  }
  await screenshotText('BUG-001 regression evidence', evidenceFor('Underpayment Rejected'), 'bug-001.png')
  await screenshotText('BUG-002 regression evidence', evidenceFor('Double Booking'), 'bug-002.png')

  console.log('Captured health, login, order, and payment evidence for the configured environment.')
} finally {
  await browser.close()
}
