import { request } from '@test/request'

describe('indexController', () => {
  it('GET /v1/', async () => {
    const result = await request.get('/v1').expect(200)

    expect(result.body).toHaveProperty('version')
  })
})

describe('errorHandler', () => {
  it('Responds with 404', async () => {
    const { body } = await request.get('/unicorn/42').expect(404)

    expect(body).toBeDefined()
    expect(body.message).toBeString()
    // expect(body.code).toBe('E_NOT_FOUND')
  })
})
