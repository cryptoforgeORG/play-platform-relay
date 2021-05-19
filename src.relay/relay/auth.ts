import * as crypto from 'crypto'
import { models } from './models'
import * as cryptoJS from 'crypto-js'
import { success, failure } from './utils/res'
import { setInMemoryMacaroon } from './utils/macaroon'
import { loadConfig } from './utils/config'
const fs = require('fs')

const config = loadConfig()

/*
"unlock": true,
"encrypted_macaroon_path": "/relay/.lnd/admin.macaroon.enc"
*/

export async function unlocker(req, res): Promise<boolean> {
  const { password } = req.body
  if (!password) {
    failure(res, 'no password')
    return false
  }

  const encMacPath = config.encrypted_macaroon_path
  if (!encMacPath) {
    failure(res, 'no macaroon path')
    return false
  }

  let hexMac: string

  try {

    var encMac = fs.readFileSync(config.encrypted_macaroon_path, "utf8");
    if (!encMac) {
      failure(res, 'no macaroon')
      return false
    }

    const decMac = decryptMacaroon(password, encMac)
    if (!decMac) {
      failure(res, 'failed to decrypt macaroon')
      return false
    }

    const isBase64 = b64regex.test(decMac)
    if (!isBase64) {
      failure(res, 'failed to decode macaroon')
      return false
    }

    hexMac = base64ToHex(decMac)

  } catch (e) {
    failure(res, e)
    return false
  }

  if (hexMac) {
    setInMemoryMacaroon(hexMac)
    success(res, 'success!')
    await sleep(100)
    return true
  } else {
    failure(res, 'failed to set macaroon in memory')
    return false
  }
}

export async function authModule(req, res, next) {
  if (
    req.path == '/app' ||
    req.path == '/' ||
    req.path == '/unlock' ||
    req.path == '/info' ||
    req.path == '/action' ||
    req.path == '/contacts/tokens' ||
    req.path == '/latest' ||
    req.path.startsWith('/static') ||
    req.path == '/contacts/set_dev' ||
    req.path == '/connect' ||
    req.path == '/utxos'
  ) {
    next()
    return
  }

  if (process.env.HOSTING_PROVIDER === 'true') {
    // const host = req.headers.origin
    // const referer = req.headers.referer
    if (req.path === '/invoices') {
      next()
      return
    }
  }

  const token = req.headers['x-user-token'] || req.cookies['x-user-token']

  if (token == null) {
    res.writeHead(401, 'Access invalid for user', { 'Content-Type': 'text/plain' });
    res.end('Invalid credentials');
  } else {
    const user = await models.Contact.findOne({ where: { isOwner: true } })
    const hashedToken = crypto.createHash('sha256').update(token).digest('base64');
    if (user.authToken == null || user.authToken != hashedToken) {
      res.writeHead(401, 'Access invalid for user', { 'Content-Type': 'text/plain' });
      res.end('Invalid credentials');
    } else {
      next();
    }
  }
}

function decryptMacaroon(password: string, macaroon: string) {
  try {
    const decrypted = cryptoJS.AES.decrypt(macaroon || '', password).toString(cryptoJS.enc.Base64)
    const decryptResult = atob(decrypted)
    return decryptResult
  } catch (e) {
    console.error('cipher mismatch, macaroon decryption failed')
    console.error(e)
    return ''
  }
}

export function base64ToHex(str) {
  const raw = atob(str)
  let result = ''
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16)
    result += (hex.length === 2 ? hex : '0' + hex)
  }
  return result.toUpperCase()
}

const atob = a => Buffer.from(a, 'base64').toString('binary')

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const b64regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
