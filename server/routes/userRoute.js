const { Router } = require('express')

const userRoute = Router()

userRoute.get('/', getAllUsers)
userRoute.get('/:id', getUserById)
userRoute.post('/', createUser)
userRoute.delete('/:id', deleteUser)
userRoute.put('/:id', updateUser)

module.exports = userRoute;