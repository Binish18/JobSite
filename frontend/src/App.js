import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Container} from "react-bootstrap"
import HomeScreen from "./Screens/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobScreen from "./Screens/JobScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ApplyScreen from "./Screens/ApplyScreen";
import ExperienceScreen from "./Screens/ExperienceScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import JobListScreen from "./Screens/JobListScreen";
import JobEditScreen from "./Screens/JobEditScreen";


const App = ()=> {
  return (
    <BrowserRouter>
    <Header/>
   
    <main className="py-3">
      <Container>
      <Routes>
      <Route path="/login"  exact element={<LoginScreen/>} />
     
      <Route path="/"  exact element={<HomeScreen/>} />
      <Route path="/search/:keyword" element={<HomeScreen/>} />
    <Route path="/job/:id"  exact element={<JobScreen/>} />
     <Route path='/admin/userList' exact element={<UserListScreen/>}/>
     <Route path='/admin/job/:id/edit' exact element={<JobEditScreen/>}/>

     <Route path='/admin/joblist' exact element={<JobListScreen/>}/>
     <Route path='/admin/user/:id/edit' exact element={<UserEditScreen/>}/>
    <Route path="/register"  exact element={<RegisterScreen/>} />
    <Route path="/profile"  exact element={<ProfileScreen/>} />
    <Route path="/login/apply"  exact element={<ApplyScreen/>} />
    <Route path="/optional"  exact element={<ExperienceScreen/>} />

    </Routes>
      </Container>
    
    </main>
   
   
    <Footer/>
   
    </BrowserRouter>
  );
}

export default App;
