import { NextApiRequest, NextApiResponse } from 'next'
import { people } from '../../../data'
import type { Person, ResponseError } from '../../../interfaces'

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Person | ResponseError>
) {
  const { id } = req.query
  const personId = Array.isArray(id) ? id[0] : id
  const person = people.find((p) => p.id === personId)

  // User with id exists
  return person
    ? res.status(200).json(person)
    : res.status(404).json({ message: `User with id: ${id} not found.` })
}
