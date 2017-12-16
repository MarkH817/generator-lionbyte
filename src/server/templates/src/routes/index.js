import {Router} from 'express'

const router = Router()
router.get('/', (req, res, next) => {
  res.send('Hi!')
})

router.get('/user/:name', (req, res, next) => {
  res.json({
    name: req.params.name
  })
})

export {router as index}
