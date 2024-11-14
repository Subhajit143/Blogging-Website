import { NavLink, Outlet,Navigate } from "react-router-dom"
import { FaUserAstronaut } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaServicestack } from "react-icons/fa6";
import { RiHome6Fill } from "react-icons/ri";
import { useAuth } from "../../store/auth";
 

 export const AdminLayout =()=>{
    const {isAdmin}= useAuth();
    if (!isAdmin){ return <Navigate to="/" />}
    return (
        <>
        
        <header className="container bg-slate-900 border  text-violet-400  justify-between max-w-full px-16 py-4 text-lg">
            <div className="container ">
                <nav>
                    <ul className="flex gap-5">
                        <li>
                            <NavLink to="/admin/users">
                            <FaUserAstronaut /> Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/contact">
                            <BiSolidMessageDetail /> Contacts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/service">
                            <FaServicestack /> Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                            <RiHome6Fill /> Home
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </header>
       
        </>
    )
 }