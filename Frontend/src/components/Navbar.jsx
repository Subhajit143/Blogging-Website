 import { NavLink } from "react-router-dom"
 import { useAuth } from "../../store/auth"
 import { Outlet } from "react-router-dom"
 export const Navbar=()=>{
    const {isLoggedIn ,isAdmin} = useAuth()
    
    return(
        <>
        
        <header>
            <div className="container bg-slate-900 border flex text-violet-400  justify-between max-w-full px-16 py-4 text-lg">
                <div className="text-2xl">
                    <NavLink to="">Our Logo </NavLink>
                </div>

                <nav className="">
                    <ul className="flex gap-12">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to="/service">Services</NavLink>
                        </li>
                        {isLoggedIn ?(
                            <>
                        <li>
                            <NavLink to="/logout" >Logout</NavLink>
                        </li>
                         {  isAdmin || (  // Check if the user is an admin
                            <li>
                                <NavLink to="/admin">Admin Panel</NavLink>
                            </li>
                        )}                        
                        </>
                        ):( 
                        <>
                         <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Sign Up</NavLink>
                        </li>
                        </>
                       
                        )}
                        
                        
                    </ul>
                    <Outlet />
                </nav>
            </div>
            
        </header>
        
        
        </>
    )
}