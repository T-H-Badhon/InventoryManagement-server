import catchAsync from '../../utilities/catchAsync'
import response from '../../utilities/response'
import { categoryServices } from './category.services'

const addCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.addCategory(req.body)

  response(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: result,
  })
})

const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategory()

  response(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: result,
  })
})

const updateCategory = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await categoryServices.updateCategory(id, req.body)

  response(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: result,
  })
})

const deleteCategory = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await categoryServices.deleteCategory(id)

  response(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: result,
  })
})

export const categoryControllers = {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
}
