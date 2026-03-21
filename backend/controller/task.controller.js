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

export const getTask = async (req,res , next) => {
    try {
        const {status} = req.query
        let filter = {}
        if(status){
            filter.status = status
        }
        let tasks
        if(req.user.role ==="admin"){
            task = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            )
        }else{
            tasks = await Task.find({
                ...filter,
                assignedTo:req.user.id,

            }).populate("assignedTo" , "name email profileImageUrl")
        }

        task = await Promise.all(
            task.map(async(task) => {
                const completedCount = task.todoChecklist.filter((itm) => Item.completed).length
            })
        )
        return{...task._doc , completedCount:completedCount }

        //status summary count aryan developer

        const allTask = await Task.countDocuments(
            req.user.role === "admin" ? {} : {assignedTo: req.user.id}
        )
    } catch (error) {
        next(error)
    }
}