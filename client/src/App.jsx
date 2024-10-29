import axios from "axios";
import {UserContextProvider } from "./UserContext";
import Routes from "./Routes";


function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND || 'http://localhost:4000';
  //set cookie from our api 
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
  )
}

export default App
