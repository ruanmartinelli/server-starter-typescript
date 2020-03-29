import { request } from '@test/request'

describe('indexController', () => {
  it('GET /v1/', async () => {
    const { data, status } = await request.get('/v1')

    expect(status).toBe(200)
    expect(data).toHaveProperty('version')
  })
})

describe('errorHandler', () => {
  it('Responds with 404', async () => {
    const { data, status } = await request.get('/unicorn/42')

    expect(status).toBe(404)
    expect(data).toBeDefined()
    expect(data.message).toBeString()
    expect(data.code).toBe('E_NOT_FOUND')
  })
})
