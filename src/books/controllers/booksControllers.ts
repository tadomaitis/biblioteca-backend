import { Request, Response, NextFunction } from 'express'
import BooksService from '../services/booksService'
import Book from '../models/booksModel'
import validateAllFieldsPresent from '../../helpers/validate-fields'

const booksService = new BooksService()

const booksController = {
  async index (_req: Request, res: Response): Promise<void> {
    const books: Book[] = await booksService.index()
    res.status(200).send(books)
  },

  async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    const allFieldsPresent = validateAllFieldsPresent(req)
    if (!allFieldsPresent) {
      res.status(400).send({ error: 'Missing fields' })
      return
    }
    const { title, publisher, image, authors } = req.body
    const book = {
      title,
      publisher,
      image,
      authors
    }
    const newBook: Book = await booksService.create(book)
    res.status(201).send(newBook)
  },

  async getBookById (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const book: Book = await booksService.getBookById(id)
    res.status(200).send(book)
  },

  async update (req: Request, res: Response): Promise<void> {
    const allFieldsPresent = validateAllFieldsPresent(req)
    if (!allFieldsPresent) {
      res.status(400).send({ error: 'Missing fields' })
      return
    }
    const { id } = req.params
    const { title, publisher, image, authors } = req.body
    const book = {
      title,
      publisher,
      image,
      authors
    }
    const updatedBook: Book = await booksService.update(id, book)
    res.status(200).send(updatedBook)
  },

  async delete (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const result = await booksService.delete(id)
    if (result.deletedCount === 0){
      res.status(404).send({ error: 'Book not found' })
      return
    }
    res.status(204).end()
  }
}

export default booksController
