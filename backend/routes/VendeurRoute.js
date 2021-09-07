import express from 'express'
const router = express.Router()
import {addVendeur,getProductByNum,addCatgorie,getAllc,del,getvendeurs,delv,delo} from '../controllers/VendeurController.js'

router.post('/',addVendeur)
router.get('/gets',getAllc)
router.get('/getv',getvendeurs)
router.post('/get',getProductByNum)
router.post('/ad',addCatgorie)
router.post('/del',del)
router.post('/delv',delv)
router.post('/delo',delo)

export default router;