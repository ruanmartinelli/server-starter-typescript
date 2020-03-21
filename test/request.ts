import App from '@app/app'
import * as supertest from 'supertest'

const { app } = new App()

export const request = supertest(app.server)
