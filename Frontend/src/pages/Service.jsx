import { useAuth } from "../../store/auth.jsx"
import servicesimg from "../assets/services.png"
import { useState } from "react"



export const Service=()=>{
    
    const {services}=useAuth();

    return(
    <>
    <section className="bg-slate-900 min-h-screen text-white max-w-full px-16 py-4">
        <div className="container">
            <h1 className="text-4xl font-semibold">Services</h1>
        </div>

        <div className="container grid grid-cols-3 p-2  gap-4">
            {services.map((curElement,index)=>{
                    const {provider,price,service,description} = curElement;
                    return(
                    <div className="card border border-violet-600 p-4" key={index}>
                    <div>
                        <img src={servicesimg} alt="our services " className="w-52" />
                    </div>
    
                    <div>
                        <div className="grid grid-cols-2">
                            <p>{provider}</p>
                            <p>{price} $</p>
                        </div>
                        <h2 className="text-2xl font-semibold">{service}</h2>
                        <p>{description}</p>
                    </div>
                </div>

                    )
                })}
    </div>
    </section>
    </>
    )
 }