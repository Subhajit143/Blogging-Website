import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Service } from "./pages/Service.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Error } from "./pages/Error.jsx";
import { Footer } from "./components/Footer.jsx";
import { Logout } from "./pages/Logout.jsx";
import { AdminLayout } from "./layout/Admin.Layout.jsx";
import { AdminUsers } from "./pages/Admin.users.jsx";
import { AdminContact } from "./pages/Admin.contact.jsx";
import { AdminUpdatedata } from "./pages/Admin.updateuser.jsx";
import { AuthProvider } from "../store/auth.jsx";

function App() {
  // const [username, setUsername] = useState(0)
  // const [email, setEmail] = useState(0)
  // const [phone, setPhone] = useState(0)
  // const [password, setPassword] = useState(0)
  // const submit=async(e)=>{
  //   e.preventDefault();
  //   try {
  //     const SubPost=await axios.post("http://localhost:5000/api/auth/postuser",{username,phone,email,password})
  //     console.log(SubPost.data);

  //   } catch (error) {
  //     if (error.res){
  //       console.log(`Error `,error.res.data)
  //       console.log("status",error.res.status );
  //       console.log("Header: " , error.header.header);
  //     }
  //     else if(error.req ){
  //         console.log(error.req);

  //     }
  //     else {
  //         console.log(error.message);

  //     }
  //     console.log(error);

  //   }
  // }

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id/edit" element={<AdminUpdatedata />} />
              <Route path="contact" element={<AdminContact />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
