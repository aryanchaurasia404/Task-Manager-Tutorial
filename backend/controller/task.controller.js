import { errorHandler } from "../utils/error.js"
import Task from '../models/task.model.js'
export const createTask = async(req , res , next) => {
    try {
        const{title ,
             description ,
             priority , 
             dueDate,
             assignedTo ,
             attachment,
              todoChecklist,
            } = req.body

            if(!Array.isArray(assignedTo)){
                return next(errorHandler(400 ,"assignedTo must be an array of user IDs"))
            }
const task = await Task.create({
            title ,
             description ,
             priority , 
             dueDate,
             assignedTo ,
             attachment,
              todoChecklist,
              createsBy:req.user.id,
})

res.status(201).json({message: "Task Created Successfully ", task})
    } catch (error) {
        next(error)
    }
}