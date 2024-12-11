import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Category } from "./category.model";
import { TCategory } from "./category.types";



const addCategory = async (payload:TCategory)=>{

    const category = await Category.create(payload)

    if (!category?._id){
        throw new AppError(httpStatus.FAILED_DEPENDENCY, "Category not created!")
    }

    return category
}


const getAllCategory = async()=>{
    const categories = await Category.aggregate([
        {
          $lookup: {
            from: "products", // The collection name for the Product model (lowercase and pluralized by default)
            localField: "_id", // Field in the Category schema to match
            foreignField: "category", // Field in the Product schema to match
            as: "products", // The name of the array where the matched products will be stored
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            products: 1, // Include the array of products
          },
        },
      ]);

      console.log(categories)

      return categories
}


const updateCategory = async (id:string,payload:Partial<TCategory>)=>{

    const newCategory = await Category.findOneAndUpdate({_id:id},payload,{new:true})

    if (!newCategory?._id){
        throw new AppError(httpStatus.FAILED_DEPENDENCY, "Category not updated!")
    }

    return newCategory
}

const deleteCategory = async (id:string) => {
    const deletedCategory = await Category.deleteOne({_id:id})

    if (!deletedCategory?.deletedCount){
        throw new AppError(httpStatus.FAILED_DEPENDENCY, "Category not deleted!")
    }

    return deletedCategory
}

export const categoryServices= {
    addCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
}