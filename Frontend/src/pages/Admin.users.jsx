import { useEffect, useState } from "react"
import { useAuth } from "../../store/auth.jsx"
import { toast } from "react-toastify"
import {Link} from "react-router-dom"

export const AdminUsers=()=>{
    const[users,setusers] = useState([])
    
    const {authorizationToken}=useAuth();
// get all users 
  const getAllUserData=async()=>{
    try {
        const response= await fetch('http://localhost:5001/api/admin/users',{
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        }
        )
        const data =await response.json();
        console.log(`users: ${data}`);
        setusers(data)
        
    } catch (error) {
        console.log("Admin user Error :",error);
        
    }
    }

    //Delete the user using delete button

    const deletUser= async (id)=>{
       try {
        const response= await fetch(`http://localhost:5001/api/admin/users/delete/${id}`,{
            method: "DELETE",
            headers: {
                Authorization: authorizationToken,
            },
        }
        )
        const data=await response.json();
        console.log((`Users After delete ${data}`));
        
        if (response.ok){
            getAllUserData();
            toast.info("User deleted successfully!");
        }
           
       } catch (error) {
        console.log(error);
        
       }
    }

    useEffect(()=>{
        getAllUserData() ;
         
    },[]);
    return (
        <>
    <section className="bg-slate-900 min-h-screen  max-w-full px-16 py-4">
        <div className="container">
            <h1 className="text-3xl font-bold p-3">Admin User Data</h1>
        </div>

        <div className="container">
            <table className=" bg-white border box-border border-zinc-700 shadow-xl border-r-2">
                <thead>
                    <tr className=" px-3 items-center box-border text-2xl text-indigo-500 mb-3 ">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody> 
                {users.map((curUser,index)=>{
                    return(
                       <tr key={index }>
                        <td className="text-lg p-3 text-center">{curUser.username}</td>
                        <td className="text-lg p-3 text-center">{curUser.email}</td>
                        <td className="text-lg p-3 text-center">{curUser.phone}</td>
                        <td className="text-lg p-3 text-center"><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                        <td className="text-lg p-3 text-center"><button className="bg-red-800 text-white p-1 rounded-lg" onClick={()=>deletUser(curUser._id)}> Delete </button></td>
                       </tr>
                    ) 
                })}
                </tbody>
            </table>
       
        </div>
    </section>
       
        </>
    )
}