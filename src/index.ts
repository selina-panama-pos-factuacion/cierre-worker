import { postRequest, PostRequestResult } from './utils/httpUtils'

// --- FACTURACION API ---
const baseUrl = 'https://lavu-facturacion-api-d8146475889b.herokuapp.com'
// const baseUrl = 'http://localhost:8080'

const login = async (locacion: string): Promise<PostRequestResult> => {
  const username = process.env[`${locacion}_FACTURACION_API_USER`]
  const password = process.env[`${locacion}_FACTURACION_API_PASS`]
  try {
    const result = await postRequest(`${baseUrl}/login`, undefined, {
      username,
      password,
    })
    return result
  } catch (error) {
    console.log(error)
    return { error: JSON.stringify(error) }
  }
}

async function enviarCierre(locacion: string) {
  const loginResult = await login(locacion)
  if (loginResult.error) {
    console.log(loginResult.error)
    return
  }
  const { token } = loginResult
  const result = await postRequest(`${baseUrl}/facturarCierreDeDia`, token)
  console.log(result)
}

// --- PROCESO DE CIERRES ---

enviarCierre('TLN')
enviarCierre('CASCO')
enviarCierre('BOCAS')
enviarCierre('BOQUETE')
enviarCierre('REDFROG')
enviarCierre('VENAO')
enviarCierre('VENAOTIPI')
