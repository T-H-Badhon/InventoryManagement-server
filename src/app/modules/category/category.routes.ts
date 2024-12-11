import { Router } from 'express'
import { categoryControllers } from './category.controllers'

const router = Router()

router.post("/add",categoryControllers.addCategory)

router.get("/", categoryControllers.getAllCategory)

router.patch("/update/:id", categoryControllers.updateCategory)

router.delete("/delete/:id", categoryControllers.deleteCategory)



export const categoryRoutes = router