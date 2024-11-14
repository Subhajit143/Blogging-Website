import { useState } from "react"
import registrationImage from "../assets/registration_1.png"
import {useNavigate} from "react-router-dom"
import { useAuth } from "../../store/auth"
import { toast } from "react-toastify"

export const Register=()=>{

    const [user,setUser] =useState({
        username: "",
        phone: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate()  ;
    //calling context Api
    const { storeTokenInLs }=useAuth()
    //this section is for always updating on every changeor moment
    const handleInput=(e)=>{
       let name=e.target.name;
       let value=e.target.value;
   
       setUser({
        ...user,
        [name]: value,
       })
    }

    //handeling the form submission
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        console.log(user);
        //connect with the DATAbase server
        try {

            const response = await fetch('http://localhost:5001/api/auth/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            const res_data=await response.json(); 
            console.log("Res from server",res_data.extraDetails);// in the response we have (message,token,userID)

            if(response.ok){
               
                //stored the Token into the local storage
                // localStorage.setItem("token",res_data.token);
                storeTokenInLs(res_data.token);
                
                toast.success("Registration Successfull")
                setUser({
                    username: "",
                    phone: "",
                    email: "",
                    password: "",
                })
                navigate("/");
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message);// in the response we)
            }
            // console.log("Response: ",response);
            


        } catch (error) {
            console.log("Registration Error ",error);
            
        }

      
        
    }
    return (
    <>

       <section >
        <main>
            <div className="bg-slate-900 min-h-screen text-white max-w-full px-16 py-4 ">
                <div className="container  flex justify-center ">
                    <div>
                        <img src={registrationImage} alt="" className="w-1/2" />
                    </div>

                    <div className="">
                        <h1 className="text-4xl font-bold">Registration Form</h1>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="username">Username</label>
                                <input value={user.username} onChange={handleInput} type="text" name="username" placeholder="username" required  autoComplete="off" className="rounded-sm text-black px-2"/>

                            </div>
                            <div>
                                <label htmlFor="phone">Contact Number</label>
                                <input value={user.phone} onChange={handleInput} type="number" name="phone" placeholder="Your Contact Number" required  autoComplete="off" className="rounded-sm text-black px-2"/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input value={user.email} onChange={handleInput} type="email" name="email" placeholder=" Enter You Email" required  autoComplete="off" className="rounded-sm text-black px-2"/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input value={user.password} onChange={handleInput} type="password" name="password" placeholder="Enter the Password" required  autoComplete="off" className="rounded-sm text-black px-2" />
                            </div>
                            <button type="submit" className="bg-slate-600 p-2 rounded-md">Register Now</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </main>
       </section>
    </>
        )
        
 }