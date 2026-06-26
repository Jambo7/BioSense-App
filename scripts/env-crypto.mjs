#!/usr/bin/env node
/**
 * env-crypto — lock/unlock a local env file into a committable encrypted blob.
 *
 *   node scripts/env-crypto.mjs lock   [envFile]   # .env     -> .env.enc  (commit .env.enc)
 *   node scripts/env-crypto.mjs unlock [envFile]   # .env.enc -> .env
 *
 * The real env file stays local (gitignored); only the encrypted `.enc` blob is
 * committed. Decryption requires the shared passphrase, entered at the prompt
 * (or via the ENV_PASSPHRASE environment variable for non-interactive use).
 *
 * Crypto: AES-256-GCM with a scrypt-derived key and a random salt + IV per lock,
 * so the same passphrase produces a different (and authenticated) blob each time.
 */
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const MAGIC = 'BIOSENSE-ENV-1'

function deriveKey(passphrase, salt) {
  return scryptSync(passphrase, salt, 32)
}

function promptHidden(question) {
  return new Promise((resolve) => {
    const { stdin, stdout } = process
    stdout.write(question)
    const wasRaw = stdin.isRaw
    if (stdin.isTTY) stdin.setRawMode(true)
    stdin.resume()
    let input = ''
    const onData = (chunk) => {
      const s = chunk.toString('utf8')
      if (s === '\n' || s === '\r' || s === '\u0004') {
        if (stdin.isTTY) stdin.setRawMode(wasRaw)
        stdin.pause()
        stdin.removeListener('data', onData)
        stdout.write('\n')
        resolve(input)
      } else if (s === '\u0003') {
        stdout.write('\n')
        process.exit(1)
      } else if (s === '\u007f' || s === '\b') {
        input = input.slice(0, -1)
      } else {
        input += s
      }
    }
    stdin.on('data', onData)
  })
}

async function getPassphrase(confirm) {
  if (process.env.ENV_PASSPHRASE) return process.env.ENV_PASSPHRASE
  const pass = await promptHidden('Passphrase: ')
  if (!pass) {
    console.error('Passphrase required.')
    process.exit(1)
  }
  if (confirm) {
    const again = await promptHidden('Confirm passphrase: ')
    if (pass !== again) {
      console.error('Passphrases do not match.')
      process.exit(1)
    }
  }
  return pass
}

function lock(envFile, encFile, passphrase) {
  const plaintext = readFileSync(envFile)
  const salt = randomBytes(16)
  const iv = randomBytes(12)
  const key = deriveKey(passphrase, salt)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const enc = Buffer.concat([cipher.update(plaintext), cipher.final()])
  const tag = cipher.getAuthTag()
  const blob =
    [
      MAGIC,
      salt.toString('base64'),
      iv.toString('base64'),
      tag.toString('base64'),
      enc.toString('base64'),
    ].join('\n') + '\n'
  writeFileSync(encFile, blob)
  console.log(`Locked ${envFile} -> ${encFile}. Commit ${encFile} to share it.`)
}

function unlock(encFile, envFile, passphrase) {
  const lines = readFileSync(encFile, 'utf8').split('\n')
  if (lines[0] !== MAGIC) {
    console.error(`Unrecognised format in ${encFile}.`)
    process.exit(1)
  }
  const salt = Buffer.from(lines[1], 'base64')
  const iv = Buffer.from(lines[2], 'base64')
  const tag = Buffer.from(lines[3], 'base64')
  const enc = Buffer.from(lines[4], 'base64')
  const key = deriveKey(passphrase, salt)
  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  let dec
  try {
    dec = Buffer.concat([decipher.update(enc), decipher.final()])
  } catch {
    console.error('Decryption failed — wrong passphrase or corrupted file.')
    process.exit(1)
  }
  writeFileSync(envFile, dec)
  console.log(`Unlocked ${encFile} -> ${envFile}.`)
}

const [, , cmd, fileArg] = process.argv
const envFile = fileArg || '.env'
const encFile = `${envFile}.enc`

if (cmd === 'lock') {
  if (!existsSync(envFile)) {
    console.error(`${envFile} not found.`)
    process.exit(1)
  }
  lock(envFile, encFile, await getPassphrase(true))
} else if (cmd === 'unlock') {
  if (!existsSync(encFile)) {
    console.error(`${encFile} not found.`)
    process.exit(1)
  }
  unlock(encFile, envFile, await getPassphrase(false))
} else {
  console.log('Usage: node scripts/env-crypto.mjs <lock|unlock> [envFile]')
  process.exit(1)
}
