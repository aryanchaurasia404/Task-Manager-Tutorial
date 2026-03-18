import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import ManageTask from"./pages/admin/ManageTask"
import Manageusers from "./pages/admin/ManageUsers"
import CreateTask from "./pages/admin/CreateTask"
import PrivateRoute from "./routes/PrivateRoute"
import Dashboard from "./pages/admin/Dashboard"
import UserDashboard from "./pages/user/UserDashboard"
import MyTasks from "./pages/user/MyTasks"
import TaskDetails from "./pages/user/TaskDetails"


const App = () => {
  return (
  <div>
    <BrowserRouter>
  <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/sign-up" element={<SignUp />} />

  {/* Admin Routes */}
  <Route element={<PrivateRoute allowedRoles={["admin"]} />} >
  <Route path="/admin/dashboard" element={<Dashboard /> } />
   <Route path="/admin/tasks" element={<ManageTask /> } />
    <Route path="/admin/users" element={<Manageusers /> } />
     <Route path="/admin/create-task" element={<CreateTask/> } />
  </Route> 
  {/* User Routes */}
   <Route element={<PrivateRoute allowedRoles={["user"]}/>}/>
   <Route path="/user/dashboard" element={<UserDashboard />} />
   <Route path="/user/tasks" element={<MyTasks />} />
   <Route path="/user/task-details/:id" element={<TaskDetails/>} />

  </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App