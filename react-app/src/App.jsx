import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import Profile from "./pages/profile/profile";

//for having different pages in the app (router)
import{Route,Routes} from "react-router-dom";


function App() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Home/>}/> 
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Profile" element={<Profile/>}/>

      </Routes>

    </div>
  );
}

export default App;
