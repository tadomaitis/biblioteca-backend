import dotenv from 'dotenv'
const dotenvResult = dotenv.config()
if (dotenvResult.error) {
  throw dotenvResult.error
}

const { PORT } = process.env

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

export {
  PORT,
  MONGODB_URI
}
