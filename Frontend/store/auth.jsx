import { createContext,useContext, useEffect, useState } from "react";


export const AuthContext= createContext();
// Log in funtionality and stored the Token into Local storage
export const AuthProvider= ({children})=>{
    const[token, setToken]= useState(localStorage.getItem("token"));
    const [user,setUser]=useState("");
    const [services,setService]=useState("");
    const authorizationToken= `Bearer ${token}`;

    
    const storeTokenInLs = (serverToken) =>{
        setToken(serverToken)
         return localStorage.setItem('token', serverToken);  
    };

  let isLoggedIn = !! token; // this line means is token is present it will be true otherwise isLoggedIn is false
    console.log("isLoggedIn =>",isLoggedIn);
  
    // const adminRole=user.isAdmin;
    // let isAdmin = !! adminRole
    const isAdmin = user?.isAdmin || false;
    console.log("isAdmin =>",isAdmin);
    

//tackeling Logout functionallity
const LogoutUser = ()=>{
    setToken("");
    return localStorage.removeItem("token");
}

//JWT authentication -to get the currently user data 
    const userAuthentication=async()=>{
            try {
                const response = await fetch("http://localhost:5001/api/auth/users",{
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                })
                if(response.ok){
                    const data= await response.json();
                    console.log("User Data:-- ",data.userData);
                    
                    setUser(data.userData);
                    
                }
               
            } catch (error) {
                console.log("Error getting user data");
                
            }
    }


    //To fetch the services data from the database

    const getService=async ()=>{
        try {
            const response = await fetch ("http://localhost:5001/api/data/service",{
                method: "GET",
            })
            if(response.ok){
                const data= await response.json();
                console.log(data.msg); // .msg is used to convert the datas into array format
                setService(data.msg);
            }
        } catch (error) {
            console.log("Error getting service: ",error);
            
        }
    }

    useEffect(()=>{
        getService();  // fetch services data when the component mounts
        userAuthentication();
    },[])


return( 
<AuthContext.Provider value={{ isLoggedIn, isAdmin, storeTokenInLs ,LogoutUser,user,services,authorizationToken, }} >
    {children}
</AuthContext.Provider>
)
}

export const useAuth=()=>{
   const authContextValue=  useContext(AuthContext);
   if(!authContextValue){
    console.log("useAuth used outside of the provider");
    
   }
   return authContextValue
}