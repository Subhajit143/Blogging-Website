import about_2 from "../assets/about_2.png"
import { useAuth } from "../../store/auth"

export const About=()=>{
    const {user}=useAuth();
    return ( 
    <>
    <section>

   <div className="bg-slate-900 min-h-screen text-white max-w-full px-16 py-4">
    <div className="container flex justify-center">

        <div className="m-20">
            <img src={about_2} alt="" className="w-96 h-75 transform scale-150"/>
        </div>


        <div>
            <div className="text-2xl"><h1>Welcome {user ? user.username : `to our website`}</h1></div>
            <div className="text-4xl font-semibold">Why choose us ? </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, eaque a. Fugiat sequi unde veritatis aperiam! Hic culpa, iste dolorem amet tempore ipsa est, exercitationem maxime odit earum praesentium ea? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum amet exercitationem ratione maxime molestiae. Quod nesciunt, perferendis expedita nihil ducimus temporibus? Doloribus aut voluptatibus soluta deleniti molestiae animi culpa quis.</p>
            <div className="py-7 gap-2">
                <button className="mx-3 p-2 bg-indigo-600">Connect now</button>
                <button className="mx-3 p-2 border border-indigo-600">learn More</button>
            </div>
        </div>


    </div>
   </div>

    </section>
    
    </>
    )
 }