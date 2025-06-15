import Nbar from "./Nbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./dashboard";
import Register from "./register";
import TaskBoard from "./TaskBoard";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import About from "./About";

function App() {
 
  return (
    <>
        <Router>
          <Nbar />
          <Routes>
            <Route path = "/" element ={<Signin />} />
            <Route path = "about" element ={<About />} />
            <Route path = "/dashboard" element ={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path = "/register" element ={<Register />} />
            {/* <Route path = "/tasks" element ={<ProtectedRoute> <TaskBoard /> </ProtectedRoute>} /> */}
          </Routes>
        </Router>
      
   </>
  );
}

export default App
