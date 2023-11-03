import cron from 'node-cron'
import { postRequest, PostRequestResult } from './utils/httpUtils'

// --- FACTURACION API ---
const baseUrl = 'https://lavu-facturacion-api-d8146475889b.herokuapp.com'
// const baseUrl = 'http://localhost:8080'

const login = async (locacion: string): Promise<PostRequestResult> => {
  const username = process.env[`${locacion}_FACTURACION_API_USER`]
  const password = process.env[`${locacion}_FACTURACION_API_PASS`]
  const result = await postRequest(`${baseUrl}/login`, undefined, {
    username,
    password,
  })
  return result
}

export async function enviarCierre(locacion: string) {
  const { token } = await login(locacion)
  const result = await postRequest(`${baseUrl}/facturarCierreDeDia`, token)
  console.log(result)
}

// --- CRON JOB ---
cron.schedule('00 11 * * *', async () => {
  await enviarCierre('TLN')
  await enviarCierre('CASCO')
  await enviarCierre('BOCAS')
  await enviarCierre('BOQUETE')
  await enviarCierre('REDFROG')
})
