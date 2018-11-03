import * as Router from 'koa-router'

import { index } from '@app/controller/'

const router = new Router()

// Routes
router.get('/', index.status)

export const routes = router.routes()
