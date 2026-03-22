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

export const getTasks = async (req,res , next) => {
    try {
        const {status} = req.query
        let filter = {}
        if(status){
            filter.status = status
        }
        let tasks
        if(req.user.role ==="admin"){
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            )
        }else{
            tasks = await Task.find({
                ...filter,
                assignedTo:req.user.id,

            }).populate("assignedTo" , "name email profileImageUrl")
        }

        tasks = await Promise.all(
            tasks.map(async(task) => {
                const completedCount = task.todoChecklist.filter((item) => item.completed).length
            
        
        return{...task._doc , completedCount:completedCount }
    })
)
//status summary count

        const allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : {assignedTo: req.user.id}
        )
        const pendingTasks = await Task.countDocuments({
            ...filter,
            status:"Pending" ,
        //if pending user is not admin then assgned to filter
        //if logged in user is a admin then nothing do
        ...(req.user.role !== "admin" && {assignedTo: req.user.id}),
        })
           const inProgressTasks = await Task.countDocuments({
            ...filter,
            status:"In Progress" ,
        ...(req.user.role !== "admin" && {assignedTo: req.user.id}),
        }) 
        const completedTasks = await Task.countDocuments({
            ...filter,
            status:"Completed" ,
        ...(req.user.role !== "admin" && {assignedTo: req.user.id}),
        }) 
     res.status(200).json({
        tasks,
        statusSummary: {
            all: allTasks,
            pendingTasks,
            completedTasks,
        }
     })
            
    } catch (error) {
        next(error)
    }
}
export const getTaskById = async(req,res,next) =>{
    try { 
        const task = await Task.findById(req.params.id).populate(
            "assignedTo" , "name email profileImageUrl"
        )

        if(!task){
            return next(errorHandler(404,"Task Not Found"))
        }
        res.status(200).json(task)
    } catch (error) {
        next(error)
        
    }
}