const Router = require('express')
const Route=Router()
const controller=require('./controller')



Route.post('/createUser',controller.createData)
Route.delete('/deleteUser/:id',controller.deleteData)
Route.get('/listUser',controller.listData)
Route.put('/updateUser/:id',controller.updateData)





module.exports=Route