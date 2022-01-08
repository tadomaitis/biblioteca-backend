import { Request } from 'express'

const requiredFields = ['title', 'publisher', 'image', 'authors']

export default function validateAllFieldsPresent(req: Request): boolean {
  const isValid = requiredFields.every(field => {
    return field in req.body
  })
  return isValid
}
