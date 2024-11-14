import { useState } from "react"
import loginImage from "../assets/log-in.png"
import { useNavigate } from "react-router-dom"
import { useAuth,  } from "../../store/auth"
import { toast } from "react-toastify"


export const  Login=()=>{

    const[iser,setIser]=useState({

        email:"",
        password:"",
    })
    const navigate = useNavigate();
    //calling context api Auth.jsx
   const { storeTokenInLs }=useAuth();
    
    const handleloginInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
    
        setIser({
         ...iser,
         [name]: value,
        })
     }


     const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/login',{
            method: 'POST',
                headers: {'Content-Type': 'application/json',
                },
                body: JSON.stringify(iser),
            })
            // console.log("Login form ",response);
            const res_data=await response.json(); 
            console.log("Res from server",res_data.extraDetails);// in the response we have (message,token,userID)

            if(response.ok){
                //stored the Token into the local storage
                // localStorage.setItem("token",res_data.token);
               storeTokenInLs(res_data.token);
                
                
                toast.success('login successful')
                setIser({
                    email: "",
                    password: "",
                })
                navigate('/')
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message)
                console.log("Invalid Credentials",response);
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    return(
        <>
            <section>
            <main>
                <div  className="bg-slate-900 min-h-screen text-white max-w-full px-16 py-4">

                    <div className=" container flex justify-center">


                        <div className="p-20">
                            <img src={loginImage} alt=""  className="w-96 h-96 transform scale-150"/>

                        </div>


                        <div className="" >
                        <h1 className="text-6xl font-bold p-10">Login</h1>
                        <form action="" onSubmit={handleSubmit} className="text-2xl p-7">
                            <div className="py-10">
                             <label htmlFor="email">Email</label>
                             <input value={iser.email} onChange={handleloginInput} type="email" name="email" required  autoComplete="off" placeholder="Enter your Email" className="rounded-sm text-black px-2 w-full" />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input value={iser.password} onChange={handleloginInput} type="password" name="password" required  autoComplete="off" placeholder="Enter your  password" className="rounded-sm text-black px-2 w-full" />
                            </div>


                            <button type="submit" className="bg-slate-600 p-2 rounded-md">Submit</button>

                           
                        </form>


                        
                        </div>




                    </div>


                </div>
            </main>
            </section>        
        </>
    )
}