import supertest from 'supertest'
import app from '../../app'
import { connect, disconnect, deleteMany } from '../../helpers/mongo-helper'

const api = supertest(app)

beforeAll(async () => {
  await connect()
})

beforeEach(async () => {
  deleteMany('books')
})

describe('On getting books', () => {
  it('should return books as json', async () => {
    await api
      .get('/obras')
      .expect(200)
      .expect('Content-Type', /json/)
    })
})

describe('On creating books', () => {
  it('should return 400 if publisher is not provided', async () => {
    await api
      .post('/obras')
      .send({ 
        title: 'test',
        image: 'image_url',
        authors: ['test'],
      })
      .expect(400)
  })

  it('should return 400 if image is not provided', async () => {
    await api
      .post('/obras')
      .send({ 
        title: 'test',
        publisher: 'Editora A',
        authors: ['test'],
      })
      .expect(400)
  })

  it('should return 400 if authors are not provided', async () => {
    await api
      .post('/obras')
      .send({ 
        title: 'test',
        publisher: 'Editora A',
        image: 'image_url'
      })
      .expect(400)
  })

  it('should return 400 if title is not provided', async () => {
    await api
      .post('/obras')
      .send({ 
        publisher: 'Editora A',
        image: 'image_url',
        authors: ['test'],
      })
      .expect(400)
  })

  it('should create a new Book and return 201 if all fields are provided', async () => {
    const booksBeforeCreation = await api.get('/obras')
        
    await api
      .post('/obras')
      .send({ 
        title: 'test',
        publisher: 'Editora A',
        image: 'image_url',
        authors: ['test']
      })
      .expect(201)
    const booksAfterCreation = await api.get('/obras')
    expect(booksAfterCreation.body.length).toBe(booksBeforeCreation.body.length + 1)    
  })
})

describe('On updating a book', () => {
  it('should return 400 if publisher is not provided', async () => {
    const createdBook = await api.post('/obras').send({ 
      title: 'test',
      publisher: 'Editora A',
      image: 'image_url',
      authors: ['test']
    })
    const _id = createdBook.body._id
    await api
      .put(`/obras/${_id}`)
      .send({ 
        title: 'test',
        image: 'image_url',
        authors: ['test']
      })
      .expect(400)
  })

  it('should return 400 if image is not provided', async () => {
    const createdBook = await api.post('/obras').send({ 
      title: 'test',
      publisher: 'Editora A',
      image: 'image_url',
      authors: ['test']
    })
    const _id = createdBook.body._id
    await api
      .put(`/obras/${_id}`)
      .send({ 
        title: 'test',
        publisher: 'Editora A',
        authors: ['test']
      })
      .expect(400)
    })

  it('should return 400 if authors are not provided', async () => {
    const createdBook = await api.post('/obras').send({ 
      title: 'test',
      publisher: 'Editora A',
      image: 'image_url',
      authors: ['test']
    })
    const _id = createdBook.body._id
    await api
      .put(`/obras/${_id}`)
      .send({ 
        title: 'test',
        publisher: 'Editora A',
        image: 'image_url'
      })
      .expect(400)
  })

  it('should return 400 if title is not provided', async () => {
    const createdBook = await api.post('/obras').send({ 
      title: 'test',
      publisher: 'Editora A',
      image: 'image_url',
      authors: ['test']
    })
    const _id = createdBook.body._id
    await api
      .put(`/obras/${_id}`)
      .send({ 
        publisher: 'Editora A',
        image: 'image_url',
        authors: ['test']
      })
      .expect(400)
  })

  it('should update a book and return 200 if all fields are provided', async () => {
    const createdBook = await api.post('/obras').send({ 
      title: 'test',
      publisher: 'Editora A',
      image: 'image_url',
      authors: ['test']
    })
    const _id = createdBook.body._id
    const booksBeforeUpdate = await api.get('/obras')
    await api
      .put(`/obras/${_id}`)
      .send({ 
        title: 'test',
        publisher: 'Editora A',
        image: 'image_url',
        authors: ['test']
      })
      .expect(200)
    const booksAfterUpdate = await api.get('/obras')
    expect(booksAfterUpdate.body.length).toBe(booksBeforeUpdate.body.length)
  })
})

describe('On deleting a book', () => {
  it('should return 404 if book does not exist', async () => {
    await api
      .delete('/obras/5e9b9b3c7b3d8c0a7b8f3c3f')
      .expect(404)
  })

  it('should delete a book and return 204 if book exists', async () => {
    const createdBook = await api.post('/obras').send({ 
      title: 'test',
      publisher: 'Editora A',
      image: 'image_url',
      authors: ['test']
    })
    const _id = createdBook.body._id
    const booksBeforeDelete = await api.get('/obras')
    await api
      .delete(`/obras/${_id}`)
      .expect(204)
    const booksAfterDelete = await api.get('/obras')
    expect(booksAfterDelete.body.length).toBe(booksBeforeDelete.body.length - 1)
  })
})

afterAll(async () => {
  await disconnect()
})