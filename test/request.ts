import App from '@app/app'
import * as supertest from 'supertest'

export const request = supertest(new App().app.listen())
