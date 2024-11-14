import { useEffect, useState } from "react"
import { useAuth } from "../../store/auth.jsx"
import { toast } from "react-toastify"

export const AdminContact=()=>{
    const[users,setusers] = useState([])
    const {authorizationToken}=useAuth();

  const getAllContactData=async()=>{
    try {
        const response= await fetch('http://localhost:5001/api/admin/contact',{
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


    const contactDelete= async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/admin/contact/delete/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
                
            }
            )
            if(response.ok){
                const data= await response.json();
                console.log(`Contact deleted: ${data}`);
                getAllContactData()
                toast.info("Contact deleted succesfully ")
            }
        } catch (error) {
            console.log("Admin Contact Error :",error);
            
        }
    }



    useEffect(()=>{
        getAllContactData()    
    },[]);
    return (
        <>
    <section className="">
        <div className="container">
            <h1 className=" text-3xl font-bold p-6">Admin Contact Data</h1>
        </div>

        <div className="container">
            <table className=" bg-white border box-border border-zinc-700 shadow-xl border-r-2">
                <thead>
                    <tr className=" px-3 items-center box-border text-2xl text-indigo-500 mb-3 ">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Messages</th>
                        <th>Update</th>
                        <th className="px-9">Delete</th>
                    </tr>
                </thead>

                <tbody> 
                {users.map((curUser,index)=>{
                    return(
                       <tr key={index } className="  text-lg p-3 text-center">

                        <td className="text-lg p-3 text-center">{curUser.username}</td>
                        <td className="text-lg p-3 text-center">{curUser.email}</td>
                        <td className="text-lg p-3 text-center">{curUser.message}</td>
                        <td className="text-lg px-3 text-center border ">Edit</td>
                        <td className="text-lg p-3 text-center border "><button className="bg-red-800 text-white p-1 rounded-lg" onClick={()=>contactDelete(curUser._id)}>Delete </button></td>
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