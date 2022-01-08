import express from 'express'
import cors from 'cors'
import BooksRouter from './books/BooksRouter'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/obras', BooksRouter)

export default app
