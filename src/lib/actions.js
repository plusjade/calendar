import Crypto from 'crypto'

export const token = () => Crypto.randomBytes(6).toString('hex')

