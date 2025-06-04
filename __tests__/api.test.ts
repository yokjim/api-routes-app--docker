import { createMocks } from 'node-mocks-http'
import indexHandler from '../pages/api/people/index'
import personHandler from '../pages/api/people/[id]'

describe('People API', () => {
  test('GET /api/people returns list of 10 items', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await indexHandler(req as any, res as any)
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(10)
  })

  test('GET /api/people/[id] with valid id returns 200', async () => {
    const { req, res } = createMocks({ method: 'GET', query: { id: '1' } })
    await personHandler(req as any, res as any)
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.id).toBe('1')
  })

  test('GET /api/people/[id] with invalid id returns 404', async () => {
    const { req, res } = createMocks({ method: 'GET', query: { id: '999' } })
    await personHandler(req as any, res as any)
    expect(res._getStatusCode()).toBe(404)
  })
})
