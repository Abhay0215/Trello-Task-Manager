import Nbar from "./Nbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from "./Signin";
import Dashboard from "./dashboard";
import Register from "./register";


function App() {
 
  return (
    <>
        <Router>
          <Nbar />
          <Routes>
            <Route path = "/" element ={<Signin />} />
            <Route path = "/dashboard" element ={<Dashboard />} />
            <Route path = "/register" element ={<Register />} />
          </Routes>
        </Router>
      
   </>
  );
}

export default App
