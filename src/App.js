import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">


      
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
        <>
        <Nav/>
        <Profile />
        </>
        } />
       
       
        <Route path="/" element={ <>
        <Nav/>
        <Home />
        </>} />

      </Routes>
    </div>
  );
}

export default App;
