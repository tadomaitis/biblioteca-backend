/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import booksController from './controllers/booksControllers'

const booksRouter = Router()

booksRouter.get('/', booksController.index)

booksRouter.post('/', booksController.create)

booksRouter.get('/:id', booksController.getBookById)

booksRouter.put('/:id', booksController.update)

booksRouter.delete('/:id', booksController.delete)

export default booksRouter
