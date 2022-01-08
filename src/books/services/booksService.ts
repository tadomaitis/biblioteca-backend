import Book from '../models/booksModel'
import { getCollection } from '../../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

interface deleteBookAnswer {
  deletedCount: number
  aknowledged: boolean
}

export default class booksService {
  async index (): Promise<Book[]> {
    const collection = await getCollection('books')
    const books = await collection.find({}).toArray()
    return books
  }

  async create (book: Book): Promise<Book> {
    const collection = await getCollection('books')
    const newBook = await collection.insertOne(book)
    const insertedBook = await this.getBookById(newBook.insertedId.toString())
    return insertedBook
  }

  async getBookById (id: string): Promise<Book> {
    const collection = await getCollection('books')
    const book = await collection.findOne({ _id: new ObjectId(id) })
    return book
  }

  async update (id: string, book: Book): Promise<Book> {
    const books = await getCollection('books')
    await books.replaceOne({ _id: new ObjectId(id) }, book)
    const updatedBook = await this.getBookById(id)
    return updatedBook
  }

  async delete (id: string): Promise<deleteBookAnswer> {
    const collection = await getCollection('books')
    return await collection.deleteOne({ _id: new ObjectId(id) })
  }
}
