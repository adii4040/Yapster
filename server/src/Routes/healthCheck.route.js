import {Router} from 'express'
import { healthCheck } from '../Controllers/healthCheck.controller.js'


const router = Router()

router.route('/').get( healthCheck )



export default router