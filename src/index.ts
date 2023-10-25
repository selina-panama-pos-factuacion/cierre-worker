import cron from 'node-cron'
import { postRequest, PostRequestResult } from './utils/httpUtils'

// --- FACTURACION API ---
const username = process.env.FACTURACION_API_USER
const password = process.env.FACTURACION_API_PASS

const baseUrl = 'https://lavu-facturacion-api-d8146475889b.herokuapp.com'
const login = async (): Promise<PostRequestResult> => {
  const result = await postRequest(`${baseUrl}/login`, undefined, {
    username,
    password,
  })
  return result
}

export async function enviarCierre() {
  const { token } = await login()
  const result = await postRequest(`${baseUrl}/facturarCierreDeDia`, token)
  console.log(result)
}

// --- CRON JOB ---
cron.schedule('00 12 * * *', async () => {
  await enviarCierre()
})
