import Crypto from 'crypto'

export const token = (bytes = 4) => Crypto.randomBytes(bytes).toString('hex')

