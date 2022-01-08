import { MongoClient, Db } from 'mongodb'
import { MONGODB_URI } from '../config/env'

const defaultDbName = 'books'

const client = new MongoClient(MONGODB_URI)

export let db: Db

export const connect = async (dbName: string = defaultDbName): Promise<MongoClient> => {
  const conn = await client.connect()
  db = conn.db(dbName)
  return client
}

export const disconnect = async (): Promise<void> => {
  await client.close()
}

export const getCollection = async (collectionName: string): Promise<any> => {
  const database = client.db(defaultDbName)
  return database.collection(collectionName)
}

export const deleteMany = async (collectionName: string, filter: any = {}): Promise<any> => {
  const collection = await getCollection(collectionName)
  return collection.deleteMany(filter)
}