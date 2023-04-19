const express = require("express")
const router = express.Router()
const { authentication, authorization } = require("../middleware/auth")
const { createUser, getUser, userLogin, updateUser } = require("../controller/userController")

const { createTask, getTask, updateTask, deleteTask } = require("../controller/TodoController")


//user apis

router.post("/user", createUser)

router.post("/userLogin", userLogin)

router.get("/user/:id", authentication, authorization, getUser)

router.put("/user/:id", authentication, authorization, updateUser)


// task apis

router.post("/task/:userId", authentication, authorization, createTask)

router.get("/task/:userId", authentication, authorization, getTask)

router.put("/task/:userId/:id", authentication, authorization, updateTask)

router.delete("/task/:userId/:id", authentication, authorization, deleteTask)


module.exports = router