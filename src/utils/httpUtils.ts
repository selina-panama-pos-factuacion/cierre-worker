import * as https from 'https'

export interface PostRequestResult {
  [key: string]: string
}

export async function postRequest(
  url: string,
  token?: string,
  payload?: object,
): Promise<PostRequestResult> {
  return new Promise((resolve, reject) => {
    const postData = payload ? JSON.stringify(payload) : null
    const headers: { [key: string]: string } = {
      Accept: 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    if (postData) {
      headers['Content-Type'] = 'application/json'
      headers['Content-Length'] = Buffer.byteLength(postData).toString()
    }

    const options = {
      method: 'POST',
      headers,
    }

    const req = https.request(url, options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        try {
          const parsedData: PostRequestResult = JSON.parse(data)
          resolve(parsedData)
        } catch (err) {
          reject(new Error('Failed to parse response data.'))
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    if (postData) {
      req.write(postData)
    }

    req.end()
  })
}
