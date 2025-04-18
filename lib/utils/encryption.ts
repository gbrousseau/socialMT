import crypto from 'crypto'

const ENCRYPTION_KEY = crypto.scryptSync(
  process.env.ENCRYPTION_KEY || 'your-fallback-encryption-key-min-32-chars!!',
  'salt',
  32
)
const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decrypt(text: string): string {
  const [ivHex, encryptedHex] = text.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const encrypted = Buffer.from(encryptedHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
  let decrypted = decipher.update(encrypted)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
} 